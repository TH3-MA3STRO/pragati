"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Login() {
  return (
    <div className="min-h-screen bg-[#ffe5d9] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>
        <form className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <Button className="w-full bg-[#f4acb7] text-white hover:bg-[#ffcad4]">Log In</Button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/forgot-password" className="text-sm text-[#9d8189] hover:underline">
            Forgot Password?
          </Link>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">Or log in with:</p>
          <div className="mt-2 space-x-2">
            <Button variant="outline">Google</Button>
            <Button variant="outline">LinkedIn</Button>
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
  )
}

