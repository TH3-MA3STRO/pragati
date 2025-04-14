// lib/authOptions.ts
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions, DefaultSession } from "next-auth";
import Mentor from "@/models/mentor";
import Mentee from "@/models/mentee";
import { connectDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
declare module "next-auth" {
  interface Session {
    user: {
      role?: string;
      setup?: boolean;
      email?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    setup?: boolean;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        if (!credentials) {
          throw new Error("Credentials are required");
        }

        const user =
          (await Mentor.findOne({ email: credentials.email })) ||
          (await Mentee.findOne({ email: credentials.email }));

        if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user._id.toString(),
          email: user.email,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      try {
        await connectDB();
        const email = user?.email || token.email;

        if (email) {
          const mentor = await Mentor.findOne({ email });
          const mentee = await Mentee.findOne({ email });

          if (mentor) {
            token.role = "mentor";
            token.setup = mentor.setupComplete;
          } else if (mentee) {
            token.role = "mentee";
            token.setup = mentee.setupComplete;
          }
        }

        console.log("JWT Callback - Token:", token); // Debugging
        return token;
      } catch (error) {
        console.error("Error in JWT callback:", error);
        return token;
      }
    },

    async session({ session, token }) {
      try {
        if (token) {
          session.user.role = token.role as string;
          session.user.setup = token.setup as boolean;
        }

        console.log("Session Callback - Session:", session); // Debugging
        return session;
      } catch (error) {
        console.error("Error in Session callback:", error);
        return session;
      }
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET || (() => {
    throw new Error("NEXTAUTH_SECRET is not defined in the environment variables");
  })(),
};
