"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Routes where navbar and footer should be hidden
const AUTH_ROUTES = [
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
  "/verify-code",
];

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  
  // Check if current route is an auth route
  const isAuthRoute = AUTH_ROUTES.some(route => pathname?.startsWith(route));

  if (isAuthRoute) {
    // Render without navbar and footer for auth pages
    return <>{children}</>;
  }

  // Render with navbar and footer for all other pages
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
