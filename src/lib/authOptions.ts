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
    } & DefaultSession["user"];
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

        const user = await Mentor.findOne({ email: credentials.email }) ||
          await Mentee.findOne({ email: credentials.email });

        if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
          throw new Error("Invalid credentials");
        }

        return user;
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
    async session({ session, user }) {
      if (!session?.user?.email) return session;
      console.log(user)
      await connectDB();
      const mentor = await Mentor.findOne({ email: session.user.email });
      const mentee = await Mentee.findOne({ email: session.user.email });

      if (mentor) session.user.role = "mentor"; // Assign role to user
      if (mentee) session.user.role = "mentee";

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
