"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      // User is already logged in, redirect to home
      router.replace("/");
    }
  }, [router]);

  // Check token synchronously to prevent flash of auth content
  const token = typeof window !== "undefined" ? Cookies.get("token") : null;
  
  if (token) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-text-secondary">Redirecting...</div>
      </div>
    );
  }

  return <>{children}</>;
}
