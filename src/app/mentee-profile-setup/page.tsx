"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MenteeProfileSetup() {
  const [tags, setTags] = useState<string[]>([])
  const [bio, setBio] = useState<string>("")
  const [preferredTimes, setPreferredTimes] = useState<string>("")
  const [expectations, setExpectations] = useState<string>("")
  const [linkedin, setLinkedin] = useState<string>("")
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleInterestChange = (area: string) => {
    setTags((prev) => (prev.includes(area) ? prev.filter((item) => item !== area) : [...prev, area]))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bio,
          tags,
          preferredTimes,
          expectations,
          linkedin
        }),
      });

      if (response.ok) {
        router.push("/dashboard"); // Redirect to dashboard on success
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to complete profile setup");
      }
    } catch (error) {
      alert("An error occurred. Please try again."+error);
    }
  };

  useEffect(() => {
    if (status === "loading") return; // Wait for session to load
    if (!session || session.user.role !== "mentee") {
      router.push("/404"); // Redirect if not a mentee
    }
  }, [session, status, router]);

  return (
    <div className="min-h-screen bg-[#ffe5d9] p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Mentee Profile Setup</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself, your interests, and your goals..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div>
            <Label>Preferred Mentorship Areas</Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Computer Science",
                "Mathematics",
                "Physics",
                "Chemistry",
                "Biology",
                "Engineering",
              ].map((area) => (
                <div key={area} className="flex items-center space-x-2">
                  <Checkbox
                    id={area}
                    checked={tags.includes(area)}
                    onCheckedChange={() => handleInterestChange(area)}
                  />
                  <label
                    htmlFor={area}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {area}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="preferred-times">Preferred Meeting Times</Label>
            <Select onValueChange={(value) => setPreferredTimes(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select preferred times" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekday-evenings">
                  Weekday Evenings
                </SelectItem>
                <SelectItem value="weekday-mornings">
                  Weekday Mornings
                </SelectItem>
                <SelectItem value="weekends">Weekends</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="linkedin">LinkedIn Profile</Label>
            <Input
              id="linkedin"
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="https://www.linkedin.com/in/yourprofile"
            />
          </div>
          <div>
            <Label htmlFor="expectations">Expectations from Mentor</Label>
            <Textarea
              id="expectations"
              placeholder="What do you hope to gain from this mentorship?"
              value={expectations}
              onChange={(e) => setExpectations(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#f4acb7] text-[#fff] hover:bg-[#ffcad4]"
          >
            Complete Profile Setup
          </Button>
        </form>
      </div>
    </div>
  );
}

