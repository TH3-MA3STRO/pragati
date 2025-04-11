"use client";

import { useState } from "react";
import { signIn } from "next-auth/react"; // NextAuth function for signing in
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes for email/password
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle email/password form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <div className="login-container">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Email/Password Login */}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="input-field"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="input-field"
        />
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Login with Google */}
      <div className="auth-options">
        <button
          className="auth-btn google-btn"
          onClick={() => signIn("google")}
        >
          Login with Google
        </button>

        {/* Login with LinkedIn */}
        <button
          className="auth-btn linkedin-btn"
          onClick={() => signIn("linkedin")}
        >
          Login with LinkedIn
        </button>
      </div>

      {/* Link to Signup */}
      <div className="auth-options">
        <button
          className="auth-btn"
          onClick={() => router.push("/auth/signup")}
        >
          Don't have an account? Sign Up
        </button>
      </div>
    </div>
  );
}
