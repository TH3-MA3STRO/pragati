"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/auth/signin");
    } else {
      if (!session.user.setupComplete) {
        router.push("/setup");
      } else if (session.user.role === "mentor") {
        router.push("/dashboard/mentor");
      } else {
        router.push("/dashboard/mentee");
      }
    }
  }, [session]);

  return <div>Redirecting...</div>;
}
