"use client";
import {useSession} from 'next-auth/react'
import {useRouter} from 'next/navigation'
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
// Initialize Google AI
const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY ||
    "AIzaSyBIX9dfRMZJer_hHlFnls1RCrhJPNONQ5c"
);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// System prompt for women in STEM guidance
const menteePrompt = `
You are Pragati, an AI career advisor dedicated to supporting women in STEM fields.
Respond using Markdown formatting for better readability:

- Use **bold** for important concepts
- Use *italics* for emphasis
- Use bullet points for lists:
  * Like this
  * And this
- Use numbered lists for steps:
  1. First step
  2. Second step
- Use \`code\` formatting for technical terms
- Separate sections with headings:
  ## Subheading
  ### Smaller heading

Your purpose is to provide:

1. Career guidance specific to women in science, technology, engineering, and math
2. Advice on overcoming gender bias and workplace challenges
3. Educational pathway recommendations
4. Networking and mentorship opportunities
5. Work-life balance strategies in technical fields

Rules:
- ONLY answer questions related to women in STEM careers
- Politely decline unrelated questions with: "I specialize in advising women in STEM fields. Could you ask a question about STEM careers, education, or workplace challenges?"
- Provide accurate, up-to-date information
- Offer supportive, empowering advice
- Suggest concrete resources when possible
- Maintain professional but approachable tone

Response format:
1. Acknowledge the question's context
2. Provide detailed, actionable advice
3. Include relevant resources if available
4. End with an encouraging note
`;
const mentorPrompt = `
You are Pragati, an AI assistant designed to empower and assist women mentors in STEM fields as they guide the next generation of women in science, technology, engineering, and mathematics.

Respond using Markdown formatting for clear readability:

- Use **bold** for key insights and advice
- Use *italics* for nuance or emphasis
- Use bullet points for lists:
  * Like this
  * And this
- Use numbered lists for action plans:
  1. First step
  2. Second step
- Use \`code\` formatting for technical terms, role names, or tools
- Separate responses with clear headings:
  ## Subheading
  ### Smaller heading

Your purpose is to provide:

1. Support for women mentors working to uplift other women in STEM
2. Strategies for creating inclusive, empowering mentorship relationships
3. Techniques for helping mentees overcome self-doubt, imposter syndrome, and workplace biases
4. Guidance on fostering strong professional development and technical growth
5. Resources, frameworks, and actionable advice for improving the mentorship experience

Rules:

- ONLY answer questions related to mentoring women in STEM fields
- Politely decline unrelated questions with:
  "I specialize in advising women mentors supporting other women in STEM. Could you ask a question about mentorship strategies or STEM guidance?"
- Always provide respectful, thoughtful, and up-to-date insights
- Prioritize empathy, empowerment, and practical value in your responses
- Suggest relevant mentorship frameworks, community resources, and best practices whenever possible
- Close each response with encouragement and a reminder of the mentor's impact

Response format:

1. Acknowledge the mentor’s intent and context
2. Share actionable, structured guidance
3. Recommend resources or tools where appropriate
4. Conclude with motivation and appreciation for their role as a mentor

`;
export default function CareerGuidanceChatbot() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let systemPrompt = ``;
  useEffect(() => {
    if (status === "loading") return; // Wait for session to load
    if (!session) {
      router.push("/404"); // Redirect if not a mentee
    }
    systemPrompt = (session?.user.role==="mentor")? mentorPrompt: menteePrompt
  }, [session, status, router]);
  console.log(session?.user)

  if (status === "loading" || !session || session.user.role !== "mentee") {
    return (
      <div className="text-center h-[100vh] flex items-center justify-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-[100px] h-[100px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Start chat with system prompt
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: systemPrompt }],
          },
          {
            role: "model",
            parts: [
              {
                text: "Understood. I'm Pragati, an AI Assistant, ready to advise on women in STEM careers.",
              },
            ],
          },
        ],
      });

      // Get AI response
      const result = await chat.sendMessage(input);
      const response = await result.response;
      const text = response.text();

      // Add AI response to chat
      const aiMessage = { text: text, sender: "ai" };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI Error:", error);
      const errorMessage = {
        text: "Sorry, I encountered an error. Please try again later.",
        sender: "ai",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = async (question: string) => {
    setInput(question);
    // Trigger form submission after a small delay to allow input to update
    setTimeout(() => {
      const form = document.getElementById("form")
      if(!form){
        return null
      }
      document.querySelector("form")?.requestSubmit();
    }, 100);
  };

  return (
    <div className="px-24 mx-auto p-4 bg-[#ffe5d9] min-h-screen">
      <Card className="bg-white mb-6">
        <CardHeader>
          <CardTitle>Chat with PragatiAI</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] overflow-y-auto mb-4 p-4 border rounded">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 h-full flex items-center justify-center">
                Ask about STEM careers, workplace challenges, or skill
                development
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    message.sender === "user"
                      ? "text-right flex justify-end"
                      : "text-left"
                  }`}
                >
                  {message.sender === "user" ? (
                    <div className="prose  bg-[#d8e2dc] rounded-lg p-5 prose-sm max-w-[80%]">
                      {message.text}
                    </div>
                  ) : (
                    <div className="prose bg-slate-400 rounded-lg p-5 prose-sm max-w-[80%]">
                      <ReactMarkdown>{message.text}</ReactMarkdown>
                    </div>
                  )}
                </div>
              ))
            )}
            {isLoading && (
              <div className="text-left mb-4">
                <span className="inline-block p-3 rounded-lg bg-[#d8e2dc] border border-[#9d8189]">
                  Thinking...
                </span>
              </div>
            )}
          </div>
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about women in STEM careers..."
              className="flex-grow"
              disabled={isLoading}
            />
            <Button
              type="submit"
              className="bg-[#f4acb7] text-white hover:bg-[#ffcad4]"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Common Questions for Women in STEM</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {[
              "How can I negotiate my salary in a male-dominated tech company?",
              "What are some strategies to combat imposter syndrome in engineering?",
              "Which STEM fields have the best support systems for women?",
              "How can I find female mentors in data science?",
              "What certifications would help advance my biomedical engineering career?",
            ].map((question, index) => (
              <li key={index}>
                <button
                  onClick={() => handleQuickQuestion(question)}
                  className="text-left text-[#9d8189] hover:text-[#f4acb7] hover:underline"
                >
                  {question}
                </button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
