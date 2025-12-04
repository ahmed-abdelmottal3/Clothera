"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, MapPin, Shield, ArrowLeft } from "lucide-react";
import { ProfileInfoForm } from "@/components/profile/ProfileInfoForm";
import { AddressManager } from "@/components/profile/AddressManager";
import { ChangePasswordForm } from "@/components/profile/ChangePasswordForm";
import Link from "next/link";

type TabType = "profile" | "addresses" | "security";

interface Tab {
  id: TabType;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
  { id: "addresses", label: "Addresses", icon: <MapPin className="w-4 h-4" /> },
  { id: "security", label: "Security", icon: <Shield className="w-4 h-4" /> },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const router = useRouter();

  const [authState] = useState(() => {
    if (typeof window === "undefined") {
      return { isAuthenticated: false, isLoading: true };
    }
    const token = localStorage.getItem("token");
    return { isAuthenticated: !!token, isLoading: false };
  });

  useEffect(() => {
    if (!authState.isLoading && !authState.isAuthenticated) {
      router.push("/sign-in");
    }
  }, [authState.isAuthenticated, authState.isLoading, router]);

  if (authState.isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/20"></div>
          <div className="h-4 w-32 bg-primary/20 rounded"></div>
        </div>
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary-dark to-primary-light">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">My Profile</h1>
              <p className="text-white/70 text-sm mt-1">Manage your account settings and preferences</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-surface border-b border-border sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-text-inverse shadow-lg shadow-primary/20"
                    : "text-text-secondary hover:bg-accent hover:text-text-primary"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="animate-fade-in">
          {activeTab === "profile" && <ProfileInfoForm />}
          {activeTab === "addresses" && <AddressManager />}
          {activeTab === "security" && <ChangePasswordForm />}
        </div>
      </div>
    </div>
  );
}
