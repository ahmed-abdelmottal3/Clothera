"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { Home, ArrowLeft } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background">
      {/* Home Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-surface/80 backdrop-blur-sm border border-border rounded-full shadow-lg hover:shadow-xl hover:bg-surface transition-all duration-300 group"
        >
          <ArrowLeft className="w-4 h-4 text-text-secondary group-hover:text-primary transition-colors" />
          <Home className="w-5 h-5 text-text-secondary group-hover:text-primary transition-colors" />
          <span className="text-sm font-medium text-text-secondary group-hover:text-primary transition-colors">
            Back to Home
          </span>
        </Link>
      </div>
      
      {children}
    </div>
  );
}
