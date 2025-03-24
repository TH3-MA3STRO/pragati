"use client";

import { useState } from "react";
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
const systemPrompt = `
You are MentorSTEM, an AI career advisor dedicated to supporting women in STEM fields.
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

export default function CareerGuidanceChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e) => {
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
                text: "Understood. I'm MentorSTEM, ready to advise on women in STEM careers.",
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

  const handleQuickQuestion = async (question) => {
    setInput(question);
    // Trigger form submission after a small delay to allow input to update
    setTimeout(() => {
      document.querySelector("form").requestSubmit();
    }, 100);
  };

  return (
    <div className="px-24 mx-auto p-4 bg-[#ffe5d9] min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Women in STEM Career Advisor</h1>

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
