"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react";

export default function SignUp() {
  const [role, setRole] = useState("")
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, role }));
  }, [role]);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#ffe5d9] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create an Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              onChange={handleChange}
              type="text"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              onChange={handleChange}
              type="password"
              name="password"
              required
            />
          </div>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value="mentor"
              checked={role === "mentor"}
              onChange={(e) => setRole(e.target.value)}
            />
            Mentor
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value="mentee"
              checked={role === "mentee"}
              onChange={(e) => setRole(e.target.value)}
            />
            Mentee
          </label>
          <Button className="w-full bg-[#f4acb7] text-white hover:bg-[#ffcad4]">
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">Or sign up with:</p>
          <div className="mt-2 space-x-2">
            <Button onClick={() => signIn("google")} variant="outline">
              Google
            </Button>
            <Button onClick={() => signIn("linkedin")} variant="outline">
              LinkedIn
            </Button>
          </div>
        </div>
        <p className="mt-4 text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-[#9d8189] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

