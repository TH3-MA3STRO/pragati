"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for sessions
const sessions = [
  { id: 1, menteeName: "Alice Brown", date: "2025-03-15", time: "10:00 AM", status: "Pending" },
  { id: 2, menteeName: "Bob Green", date: "2025-03-20", time: "2:00 PM", status: "Approved" },
  { id: 3, menteeName: "Charlie White", date: "2025-03-10", time: "11:00 AM", status: "Completed" },
]

export default function SessionManagement() {
  const [activeTab, setActiveTab] = useState("upcoming")

  const filteredSessions = sessions.filter(
    (session) =>
      (activeTab === "upcoming" && session.status !== "Completed") ||
      (activeTab === "completed" && session.status === "Completed"),
  )

  return (
    <div className="px-24 mx-auto p-4 bg-[#ffe5d9] min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Session Management</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          {filteredSessions.map((session) => (
            <Card className="bg-white mb-4" key={session.id}>
              <CardHeader>
                <CardTitle>{session.menteeName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">
                  <strong>Date:</strong> {session.date}
                </p>
                <p className="mb-2">
                  <strong>Time:</strong> {session.time}
                </p>
                <p className="mb-4">
                  <strong>Status:</strong> {session.status}
                </p>
                {session.status === "Pending" && (
                  <div className="space-x-2">
                    <Button variant="default">Approve</Button>
                    <Button variant="destructive">Decline</Button>
                  </div>
                )}
                {session.status === "Approved" && (
                  <Button className="bg-[#f4acb7] text-[#9d8189] hover:bg-[#ffcad4] w-full">
                    Generate Meeting Link
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="completed">
          {filteredSessions.map((session) => (
            <Card className="bg-white mb-4" key={session.id}>
              <CardHeader>
                <CardTitle>{session.menteeName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">
                  <strong>Date:</strong> {session.date}
                </p>
                <p className="mb-2">
                  <strong>Time:</strong> {session.time}
                </p>
                <p className="mb-4">
                  <strong>Status:</strong> {session.status}
                </p>
                <Button variant="outline" className="w-full">
                  View Feedback
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

