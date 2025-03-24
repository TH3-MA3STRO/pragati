"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for bookings
const bookings = [
  { id: 1, mentorName: "Dr. Jane Smith", date: "2025-03-15", time: "10:00 AM", status: "Confirmed" },
  { id: 2, mentorName: "Prof. John Doe", date: "2025-03-20", time: "2:00 PM", status: "Pending" },
  { id: 3, mentorName: "Dr. Alice Johnson", date: "2025-03-10", time: "11:00 AM", status: "Completed" },
]

export default function MyBookings() {
  const [activeTab, setActiveTab] = useState("upcoming")

  const filteredBookings = bookings.filter(
    (booking) =>
      (activeTab === "upcoming" && booking.status !== "Completed") ||
      (activeTab === "completed" && booking.status === "Completed"),
  )

  return (
    <div className="px-24 mx-auto p-4 bg-[#ffe5d9] min-h-screen">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          {filteredBookings.map((booking) => (
            <Card className="bg-white mb-4" key={booking.id}>
              <CardHeader>
                <CardTitle>{booking.mentorName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">
                  <strong>Date:</strong> {booking.date}
                </p>
                <p className="mb-2">
                  <strong>Time:</strong> {booking.time}
                </p>
                <p className="mb-4">
                  <strong>Status:</strong> {booking.status}
                </p>
                {booking.status === "Confirmed" && (
                  <Button className="bg-[#f4acb7] text-[#9d8189] hover:bg-[#ffcad4] w-full">Join Meeting</Button>
                )}
                <div className="mt-2 space-x-2">
                  <Button variant="outline">Reschedule</Button>
                  <Button variant="destructive">Cancel</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="completed">
          {filteredBookings.map((booking) => (
            <Card className="bg-white mb-4" key={booking.id}>
              <CardHeader>
                <CardTitle>{booking.mentorName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">
                  <strong>Date:</strong> {booking.date}
                </p>
                <p className="mb-2">
                  <strong>Time:</strong> {booking.time}
                </p>
                <p className="mb-4">
                  <strong>Status:</strong> {booking.status}
                </p>
                <Button className="bg-[#f4acb7] text-[#9d8189] hover:bg-[#ffcad4] w-full" variant="outline">
                  Leave Feedback
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

