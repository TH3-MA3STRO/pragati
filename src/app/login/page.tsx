"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useState } from "react";
import { signIn } from "next-auth/react"; // NextAuth function for signing in
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes for email/password
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle email/password form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setLoading(true); // Show loading state

    // Simple client-side validation
    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    // Send login request to NextAuth API via signIn method
    const res = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false, // Prevent automatic redirect (we'll handle it manually)
    });

    setLoading(false); // Hide loading state

    if (res?.error) {
      setError(res.error); // Show error message if login failed
    } else {
      // Redirect to the dashboard depending on the user role
      router.push("/dashboard");
    }
  };
  return (
    <div className="min-h-screen bg-[#ffe5d9] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <input
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              id="email"
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              value={formData.password}
              id="password"
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <Button
            disabled={loading}
            className="w-full bg-[#f4acb7] text-white hover:bg-[#ffcad4]"
          >
            {loading ? "Logging in..." : "Log in"}
          </Button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="mt-4 text-center">
          <Link
            href="/forgot-password"
            className="text-sm text-[#9d8189] hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">Or log in with:</p>
          <div className="mt-2 space-x-2">
            <Button variant="outline" onClick={() => signIn("google")}>
              Google
            </Button>
            <Button onClick={() => signIn("linkedin")} variant="outline">LinkedIn</Button>
          </div>
        </div>
        <p className="mt-4 text-sm text-center text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/signup" className="text-[#9d8189] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

