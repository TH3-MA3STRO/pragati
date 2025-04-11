"use client"
//import { Rochester } from 'next/font/google'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import STEMGenderAnalysis from "@/components/ui/stats"

// Mock data for the chart



const testimonials = [
  {
    id: 1,
    name: "Shreya Jain",
    role: "Aerospace Engineer",
    quote: "My mentor helped me land my dream job at NASA. The guidance was invaluable!",
  },
  {
    id: 2,
    name: "Dr. Anchal Anand",
    role: "Senior Data Scientist",
    quote: "Being a mentor has been incredibly rewarding. I've seen my mentees grow and achieve amazing things.",
  },
  {
    id: 3,
    name: "Ananya Singh",
    role: "Biotech Researcher",
    quote: "The STEM mentorship program opened doors I never knew existed. It's been life-changing.",
  },
]

// const rock = Rochester({ subsets: ['latin'], weight: '400' })
export default function Home() {
  return (
    <div className="min-h-screen bg-[#ffe5d9]">
      <header className="bg-[#9d8189] text-white">
        <nav className=" px-4 py-2 flex justify-between items-center">
          <h1 className={`text-2xl font-bold`}>Pragati</h1>
          <div className="space-x-4">

            <Link href="/contact" className="hover:text-[#ffcad4]">
              Contact
            </Link>
            <Link href="/login">
              <Button variant="outline" className="text-[#9d8189] border-white hover:bg-[#f4acb7] hover:text-[#9d8189]">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-[#f4acb7] text-white hover:bg-[#ffcad4]">Sign Up</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="px-24 mx-auto px-4 py-12 ">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-[#9d8189]">Pragati</h2>
          <p className="text-xl text-[#9d8189] mb-8">
            Accelerate your career in Science, Technology, Engineering, and Mathematics
          </p>
          <div className="space-x-4">
            <Link href="/signup?role=mentee">
              <Button size="lg" className="bg-[#f4acb7] text-white hover:bg-[#ffcad4]">
                Find a Mentor
              </Button>
            </Link>
            <Link href="/signup?role=mentor">
              <Button size="lg" variant="outline" className="text-[#9d8189] border-[#9d8189] hover:bg-[#d8e2dc]">
                Become a Mentor
              </Button>
            </Link>
          </div>
        </section>
        <h2 className="text-center text-4xl font-bold mb-4 text-[#9d8189]">
          Global Trends Over the Past Decade
        </h2>

        <STEMGenderAnalysis />
        <section className="my-16">
          <h3 className="text-2xl font-semibold mb-4 text-[#9d8189] text-center">Success Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-white">
                <CardContent className="p-6">
                  <p className="italic mb-4 text-[#9d8189]">"{testimonial.quote}"</p>
                  <p className="font-semibold text-[#f4acb7]">{testimonial.name}</p>
                  <p className="text-sm text-[#9d8189]">{testimonial.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="text-center mb-16 bg-[#d8e2dc] rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-semibold mb-4 text-[#9d8189]">Join Our Community</h3>
          <p className="text-[#9d8189] mb-6">Connect with mentors, access resources, and accelerate your STEM career</p>
          <Link href="/signup">
            <Button size="lg" className="bg-[#f4acb7] text-white hover:bg-[#ffcad4]">
              Sign Up Now
            </Button>
          </Link>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold mb-4 text-[#9d8189]">For Mentees</h3>
            <ul className="list-disc list-inside text-[#9d8189] space-y-2">
              <li>Access to experienced STEM professionals</li>
              <li>Personalized career guidance</li>
              <li>Networking opportunities</li>
              <li>Skill development workshops</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold mb-4 text-[#9d8189]">For Mentors</h3>
            <ul className="list-disc list-inside text-[#9d8189] space-y-2">
              <li>Share your expertise and give back</li>
              <li>Develop leadership skills</li>
              <li>Expand your professional network</li>
              <li>Gain fresh perspectives from mentees</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="bg-[#9d8189] text-white py-8">
        <div className="px-24 mx-auto px-4 flex justify-between items-center">
          <p>&copy; 2025 STEM Mentorship Platform</p>
          <div className="space-x-4">
            <a href="#" className="hover:text-[#ffcad4]">
              Twitter
            </a>
            <a href="#" className="hover:text-[#ffcad4]">
              LinkedIn
            </a>
            <a href="#" className="hover:text-[#ffcad4]">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

