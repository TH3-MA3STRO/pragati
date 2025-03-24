import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

// This would typically come from a database
const mentorData = {
  id: 1,
  name: "Dr. Jane Smith",
  expertise: "Computer Science",
  bio: "Experienced software engineer with 15 years in the industry. Passionate about mentoring the next generation of tech leaders.",
  rating: 4.8,
  reviews: [
    { id: 1, text: "Dr. Smith was incredibly helpful and insightful!", rating: 5 },
    { id: 2, text: "Great mentor, really helped me understand complex concepts.", rating: 4 },
  ],
}

export default function MentorProfile({ params }) {
  return (
    <div className="px-24 mx-auto p-4 bg-[#ffe5d9] min-h-screen">
      <Card className="mb-6 bg-white">
        <CardHeader>
          <CardTitle>{mentorData.name}</CardTitle>
          {/* <Image
            src={`https://i.pravatar.cc/300?u=${mentorData.id}`}
            alt={mentorData.name}
            width={200}
            height={200}
            className="rounded-full mx-auto my-4"
          /> */}
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-2">{mentorData.expertise}</p>
          <p className="mb-4">Rating: {mentorData.rating}/5</p>
          <p className="mb-4">{mentorData.bio}</p>
          <Button className="bg-[#f4acb7] text-white hover:bg-[#ffcad4]">Book a Free Session</Button>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mb-4">Available Time Slots</h2>
      {/* This would be populated dynamically from the Google Calendar API */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Button variant="outline">Mon, 10 AM</Button>
        <Button variant="outline">Wed, 2 PM</Button>
        <Button variant="outline">Fri, 4 PM</Button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Reviews</h2>
      {mentorData.reviews.map((review) => (
        <Card key={review.id} className="mb-4">
          <CardContent className="pt-4">
            <p>{review.text}</p>
            <p className="text-muted-foreground mt-2">Rating: {review.rating}/5</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

