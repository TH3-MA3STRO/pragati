import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Mock data
const menteeData = {
  name: "Satyam Jha",
  sessionsCompleted: 5,
  nextSession: "2025-03-20",
  learningProgress: 60,
}

const recommendedMentors = [
  { id: 1, name: "Dr. Anchal Anand", expertise: "Machine Learning" },
  { id: 2, name: "Prof. Ramesh Singh", expertise: "Quantum Computing" },
  // Add more recommended mentors...
]

export default function MenteeDashboard() {
  return (
    <div className="px-24 mx-auto p-4 bg-[#ffe5d9] min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Welcome, {menteeData.name}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Sessions Completed: {menteeData.sessionsCompleted}</p>
            <p className="mb-2">Next Session: {menteeData.nextSession}</p>
            <p className="mb-2">Learning Progress:</p>
            <Progress value={menteeData.learningProgress} className="w-full bg-[#d8e2dc]" />
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Recommended Mentors</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recommendedMentors.map((mentor) => (
                <li key={mentor.id}>
                  <strong>{mentor.name}</strong> - {mentor.expertise}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Add more sections as needed */}
    </div>
  )
}

