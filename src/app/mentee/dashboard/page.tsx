"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function MenteeDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mentee, setMentee] = useState<any>(null);

  useEffect(() => {
    if (status === "loading") return; // Wait for session to load

    if (!session || session.user.role !== "mentee") {
      router.push("/404"); // Redirect if not a mentee
      return;
    }

    const fetchMenteeData = async () => {
      try {
        const response = await fetch(`/api/mentee`, {
          method: "GET",
          credentials: "include"
        });
        if (response.ok) {
          const data = await response.json();
          setMentee(data);
        } else {
          console.error("Failed to fetch mentee data");
        }
      } catch (error) {
        console.error("Error fetching mentee data", error);
      }
    };

    fetchMenteeData();
  }, [session, status, router]);

  if (!mentee) {
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

  return (
    <div className="px-24 mx-auto p-4 bg-[#ffe5d9] min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        Welcome, {mentee.name || "Mentee"}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Bio: {mentee.bio || 0}</p>
            <Link
              href={`${mentee.linkedin}`}
              className="mb-4 p-8 text-white text-center w-[50%] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Linkedin
            </Link>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Talk to PragatiAI</CardTitle>
          </CardHeader>
          <CardContent>
            <Link
              href={"/career-chatbot"}
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
            >
              Link
            </Link>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Access Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <Link
              href={"/resources"}
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
            >
              Link
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Areas of Interest</CardTitle>
          </CardHeader>
          <CardContent className="w-full">
            <ul className="flex flex-wrap items-center flex-grow-0 flex-row">
              {mentee.tags.map((mentee: any) => (
                <span
                  key={mentee.id}
                  className="bg-purple-100 m-1 flex-none  break-normal text-nowrap text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-sm dark:bg-purple-900 dark:text-purple-300"
                >
                  <strong>{mentee}</strong>
                </span>
              )) || <li>No tags set yet.</li>}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
