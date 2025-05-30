"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const resources = [
  { id: 1, title: "Introduction to Machine Learning", type: "PDF", category: "Computer Science" },
  { id: 2, title: "Quantum Mechanics Basics", type: "Video", category: "Physics" },
  { id: 3, title: "Calculus for Beginners", type: "Course", category: "Mathematics" },
  { id: 4, title: "Basics of Thermodynamics", type: "PDF", category: "Engineering" },
  { id: 5, title: "Linear Algebra Essentials", type: "Course", category: "Mathematics" },
  { id: 6, title: "Introduction to Artificial Intelligence", type: "Video", category: "Computer Science" },
  { id: 7, title: "Astrophysics for Enthusiasts", type: "PDF", category: "Physics" },
  { id: 8, title: "Data Structures and Algorithms", type: "Course", category: "Computer Science" },
  { id: 9, title: "Fluid Mechanics Overview", type: "Video", category: "Engineering" },
  { id: 10, title: "Probability and Statistics", type: "PDF", category: "Mathematics" },
  { id: 11, title: "Nanotechnology Basics", type: "Course", category: "Engineering" },
  { id: 12, title: "Relativity Explained", type: "Video", category: "Physics" },
]

export default function ResourceLibrary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  const filteredResources = resources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || resource.category === selectedCategory),
  )

  return (
    <div className="px-24 mx-auto p-4 bg-[#ffe5d9] min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Resource Library</h1>

      <div className="mb-6 flex space-x-4">
        <Input
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Computer Science">Computer Science</SelectItem>
            <SelectItem value="Physics">Physics</SelectItem>
            <SelectItem value="Mathematics">Mathematics</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="bg-white">
            <CardHeader>
              <CardTitle>{resource.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">Type: {resource.type}</p>
              <p className="mb-4">Category: {resource.category}</p>
              <Button className="bg-[#f4acb7] text-white hover:bg-[#ffcad4]">Access Resource</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

