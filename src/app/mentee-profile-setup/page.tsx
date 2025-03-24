"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MenteeProfileSetup() {
  const [interests, setInterests] = useState([])

  const handleInterestChange = (area) => {
    setInterests((prev) => (prev.includes(area) ? prev.filter((item) => item !== area) : [...prev, area]))
  }

  return (
    <div className="min-h-screen bg-[#ffe5d9] p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Mentee Profile Setup</h1>
        <form className="space-y-6">
          <div>
            <Label htmlFor="profile-picture">Profile Picture</Label>
            <Input id="profile-picture" type="file" accept="image/*" />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" placeholder="Tell us about yourself, your interests, and your goals..." />
          </div>
          <div>
            <Label>Preferred Mentorship Areas</Label>
            <div className="grid grid-cols-2 gap-2">
              {["Computer Science", "Mathematics", "Physics", "Chemistry", "Biology", "Engineering"].map((area) => (
                <div key={area} className="flex items-center space-x-2">
                  <Checkbox
                    id={area}
                    checked={interests.includes(area)}
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
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select preferred times" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekday-evenings">Weekday Evenings</SelectItem>
                <SelectItem value="weekday-mornings">Weekday Mornings</SelectItem>
                <SelectItem value="weekends">Weekends</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="expectations">Expectations from Mentor</Label>
            <Textarea id="expectations" placeholder="What do you hope to gain from this mentorship?" />
          </div>
          <Button type="submit" className="w-full bg-[#f4acb7] text-[#9d8189] hover:bg-[#ffcad4]">
            Complete Profile Setup
          </Button>
        </form>
      </div>
    </div>
  )
}

