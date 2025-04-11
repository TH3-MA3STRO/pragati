import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// This data would typically come from your booking system
const bookingData = {
  mentorName: "Dr. Jane Smith",
  date: "2025-03-15",
  time: "10:00 AM",
  meetLink: "https://meet.google.com/abc-defg-hij",
}

export default function BookingConfirmation() {
  return (
    <div className="px-24 mx-auto p-4 bg-[#ffe5d9] min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Booking Confirmation</h1>
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Your session is confirmed!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">
            <strong>Mentor:</strong> {bookingData.mentorName}
          </p>
          <p className="mb-2">
            <strong>Date:</strong> {bookingData.date}
          </p>
          <p className="mb-2">
            <strong>Time:</strong> {bookingData.time}
          </p>
          <p className="mb-4">
            <strong>Meeting Link:</strong>{" "}
            <a href={bookingData.meetLink} className="text-primary hover:underline">
              {bookingData.meetLink}
            </a>
          </p>
          <div className="space-y-2">
            <Button className="bg-[#f4acb7] text-white hover:bg-[#ffcad4] w-full">Add to Calendar</Button>
            <Button variant="outline" className="bg-[#f4acb7] text-white hover:bg-[#ffcad4] w-full">
              Reschedule
            </Button>
            <Button variant="destructive" className="bg-[#f4acb7] text-white hover:bg-[#ffcad4] w-full">
              Cancel Booking
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

