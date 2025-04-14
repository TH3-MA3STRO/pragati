"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState("");


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("https://formspree.io/f/mrbpdgzv", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: new FormData(e.target as HTMLFormElement),
    });

    const result = await res.json();

    if (result.ok) {
      setStatus("Thanks! Your message has been sent.");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus("Oops! Something went wrong.");
    }
  };

  return (
    <div className="px-24 p-4 bg-[#ffe5d9] min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Contact Us</h1>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Get in Touch</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <Button
              type="submit"
              className="bg-[#f4acb7] text-white hover:bg-[#ffcad4]"
            >
              Send Message
            </Button>
            {status && <p>{status}</p>}
          </form>
        </CardContent>
      </Card>

      <Card className="bg-white mt-6">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Email: support@stemmentorship.vit.ac.in</p>
          <p>Phone: +91 7004437636 </p>
          <p>Address: VIT Chennai</p>
        </CardContent>
      </Card>
    </div>
  );
}

