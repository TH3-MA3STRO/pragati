"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default function MentorProfileSetup() {
  const [expertise, setExpertise] = useState<string[]>([]); // Explicitly typed as an array of strings

  const handleExpertiseChange = (area: string) => {
    setExpertise((prev) =>
      prev.includes(area)
        ? prev.filter((item) => item !== area)
        : [...prev, area]
    );
  };

  return (
    <div className="min-h-screen bg-[#ffe5d9] p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Mentor Profile Setup</h1>
        <form className="space-y-6">
          <div>
            <Label htmlFor="profile-picture">Profile Picture</Label>
            <Input id="profile-picture" type="file" accept="image/*" />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself and your experience..."
            />
          </div>
          <div>
            <Label>Areas of Expertise</Label>
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
                    checked={expertise.includes(area)}
                    onCheckedChange={() => handleExpertiseChange(area)}
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
            <Label htmlFor="availability">Availability</Label>
            <p className="text-sm text-muted-foreground mb-2">
              We will sync this with your Google Calendar
            </p>
            <Button variant="outline">Connect Google Calendar</Button>
          </div>
          <div>
            <Label htmlFor="linkedin">LinkedIn Profile</Label>
            <Input
              id="linkedin"
              type="url"
              placeholder="https://www.linkedin.com/in/yourprofile"
            />
          </div>
          <div>
            <Label htmlFor="website">Personal Website (Optional)</Label>
            <Input
              id="website"
              type="url"
              placeholder="https://www.yourwebsite.com"
            />
          </div>
          <div>
            <Label htmlFor="verification">Verification Documents</Label>
            <Input id="verification" type="file" multiple />
            <p className="text-sm text-muted-foreground mt-1">
              Upload documents to verify your expertise (e.g., degrees,
              certifications)
            </p>
          </div>
          <Button
            type="submit"
            className="w-full bg-[#f4acb7] text-[#9d8189] hover:bg-[#ffcad4]"
          >
            Complete Profile Setup
          </Button>
        </form>
      </div>
    </div>
  );
}
