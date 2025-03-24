import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data
const mentorData = {
  name: "Dr. Anchal Anand",
  upcomingSessions: 3,
  totalMentees: 10,
  averageRating: 4.8,
}

const recentFeedback = [
  { id: 1, mentee: "Bob Green", comment: "Great session! Very helpful.", rating: 5 },
  { id: 2, mentee: "Alice Brown", comment: "Insightful discussion. Thank you!", rating: 4 },
  // Add more feedback...
]

export default function MentorDashboard() {
  return (
    <div className="px-24 mx-auto p-4 bg-[#ffe5d9] min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Welcome, {mentorData.name}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{mentorData.upcomingSessions}</p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Total Mentees</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{mentorData.totalMentees}</p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{mentorData.averageRating}/5</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {recentFeedback.map((feedback) => (
              <li key={feedback.id} className="border-b pb-2">
                <p>
                  <strong>{feedback.mentee}</strong> - Rating: {feedback.rating}/5
                </p>
                <p className="text-muted-foreground">{feedback.comment}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Add more sections as needed */}
    </div>
  )
}

