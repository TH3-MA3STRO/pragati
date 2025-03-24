"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

// Mock data for mentors
const mentors = [
  { id: 1, name: "Dr. Jane Smith", expertise: "Computer Science", rating: 4.8 },
  { id: 2, name: "Prof. John Doe", expertise: "Physics", rating: 4.9 },
  // Add more mock mentors...
]

export default function MentorListing() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="px-24 mx-auto p-4 bg-[#ffe5d9] min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Find a Mentor</h1>

      <div className="mb-6 flex space-x-4">
        <Input
          placeholder="Search mentors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by field" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cs">Computer Science</SelectItem>
            <SelectItem value="physics">Physics</SelectItem>
            <SelectItem value="math">Mathematics</SelectItem>
            {/* Add more fields */}
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekdays">Weekdays</SelectItem>
            <SelectItem value="weekends">Weekends</SelectItem>
            <SelectItem value="evenings">Evenings</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
          <Card key={mentor.id} className="bg-white">
            <CardHeader>
              <CardTitle>{mentor.name}</CardTitle>
              {/* <Image
                src={`https://i.pravatar.cc/150?u=${mentor.id}`}
                alt={mentor.name}
                width={100}
                height={100}
                className="rounded-full mx-auto my-4"
              /> */}
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">{mentor.expertise}</p>
              <p className="mb-4">Rating: {mentor.rating}/5</p>
              <Button className="bg-[#f4acb7] text-white hover:bg-[#ffcad4]">Book a Session</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

