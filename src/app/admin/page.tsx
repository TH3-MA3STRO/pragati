"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data
const pendingMentors = [
  { id: 1, name: "Dr. Anchal Anand", expertise: "Artificial Intelligence" },
  { id: 2, name: "Prof. Ramesh Singh", expertise: "Robotics" },
  // Add more pending mentors...
]

const reportedDiscussions = [
  { id: 1, title: "Inappropriate content in AI ethics thread", reporter: "User1" },
  { id: 2, title: "Spam in machine learning forum", reporter: "User2" },
  // Add more reported discussions...
]

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("mentors")

  return (
    <div className="px-24 mx-auto p-4 bg-[#ffe5d9] min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="mentors">Mentor Applications</TabsTrigger>
          <TabsTrigger value="reports">Reported Discussions</TabsTrigger>
        </TabsList>

        <TabsContent value="mentors">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Pending Mentor Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {pendingMentors.map((mentor) => (
                  <li key={mentor.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p>
                        <strong>{mentor.name}</strong>
                      </p>
                      <p className="text-muted-foreground">Expertise: {mentor.expertise}</p>
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline">View Details</Button>
                      <Button className="bg-[#d8e2dc] text-gray-700 hover:bg-[#ffcad4]">Approve</Button>
                      <Button variant="destructive">Deny</Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Reported Discussions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {reportedDiscussions.map((discussion) => (
                  <li key={discussion.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p>
                        <strong>{discussion.title}</strong>
                      </p>
                      <p className="text-muted-foreground">Reported by: {discussion.reporter}</p>
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline">View Thread</Button>
                      <Button className="bg-[#d8e2dc] text-gray-700 hover:bg-[#ffcad4]">Dismiss Report</Button>
                      <Button variant="destructive">Remove Thread</Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

