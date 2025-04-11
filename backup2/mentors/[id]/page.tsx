import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MentorData {
  id: string;
  name: string;
  expertise: string;
  rating: number;
  bio: string;
  reviews: {
    id: string;
    text: string;
    rating: number;
  }[];
}

// Fetch all mentor IDs for static generation
export async function generateStaticParams() {
  const response = await fetch("https://your-api-url.com/mentors", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch mentor IDs");
  }

  const mentors: { id: string }[] = await response.json();

  return mentors.map((mentor) => ({
    id: mentor.id,
  }));
}

export default async function MentorProfile({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // params: Promise<{ slug: string }>
  let mentorData = await fetch(`https://your-api-url.com/mentors/${id}`, {
    cache: "no-store",
  });

  if (!mentorData.ok) {
    return <div className="text-center mt-10">Mentor not found</div>;
  }
  mentorData = mentorData.json();
  if (!mentorData) {
    return <div className="text-center mt-10">Mentor not found</div>;
  }

  return (
    <div className="px-24 mx-auto p-4 bg-[#ffe5d9] min-h-screen">
      <Card className="mb-6 bg-white">
        <CardHeader>
          <CardTitle>{mentorData.name}</CardTitle>
          {/* Uncomment and use dynamic image */}
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
          <Button className="bg-[#f4acb7] text-white hover:bg-[#ffcad4]">
            Book a Free Session
          </Button>
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
            <p className="text-muted-foreground mt-2">
              Rating: {review.rating}/5
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
