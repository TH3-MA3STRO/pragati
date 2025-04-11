"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

// Mock data for forum threads
const threads = [
  { id: 1, title: "How to start a career in AI?", author: "Alice", replies: 5, likes: 10 },
  { id: 2, title: "Best resources for learning React?", author: "Bob", replies: 3, likes: 7 },
  { id: 3, title: "Tips for acing technical interviews", author: "Charlie", replies: 8, likes: 15 },
  // Add more threads...
]

export default function CommunityForum() {
  const [searchTerm, setSearchTerm] = useState("")
  const [newThreadTitle, setNewThreadTitle] = useState("")
  const [newThreadContent, setNewThreadContent] = useState("")

  const filteredThreads = threads.filter((thread) => thread.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleCreateThread = (e) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log("New thread:", { title: newThreadTitle, content: newThreadContent })
    // Reset form
    setNewThreadTitle("")
    setNewThreadContent("")
  }

  return (
    <div className="px-24 mx-auto p-4 bg-[#ffe5d9] min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Community Forum</h1>

      <div className="mb-6">
        <Input placeholder="Search threads..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <Card className="bg-white mb-6">
        <CardHeader>
          <CardTitle>Create New Thread</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateThread} className="space-y-4">
            <Input
              placeholder="Thread title"
              value={newThreadTitle}
              onChange={(e) => setNewThreadTitle(e.target.value)}
              required
            />
            <Textarea
              placeholder="Thread content"
              value={newThreadContent}
              onChange={(e) => setNewThreadContent(e.target.value)}
              required
            />
            <Button className="bg-[#f4acb7] text-white hover:bg-[#ffcad4]" type="submit">
              Create Thread
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredThreads.map((thread) => (
          <Card className="bg-white" key={thread.id}>
            <CardHeader>
              <CardTitle>{thread.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">Posted by: {thread.author}</p>
              <p className="mb-4">
                Replies: {thread.replies} | Likes: {thread.likes}
              </p>
              <Button variant="outline">View Thread</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

