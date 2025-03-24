"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function SignUp() {
  const [role, setRole] = useState("mentee")

  return (
    <div className="min-h-screen bg-[#ffe5d9] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create an Account</h1>
        <form className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" type="text" placeholder="John Doe" required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <RadioGroup defaultValue="mentee" onValueChange={setRole}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mentee" id="mentee" />
              <Label htmlFor="mentee">I want to find a mentor</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mentor" id="mentor" />
              <Label htmlFor="mentor">I want to become a mentor</Label>
            </div>
          </RadioGroup>
          <Button className="w-full bg-[#f4acb7] text-white hover:bg-[#ffcad4]">Sign Up</Button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">Or sign up with:</p>
          <div className="mt-2 space-x-2">
            <Button variant="outline">Google</Button>
            <Button variant="outline">LinkedIn</Button>
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
  )
}

