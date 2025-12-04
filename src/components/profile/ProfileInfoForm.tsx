"use client";

import { User, Mail, Phone, Loader2, Save, UserCircle } from "lucide-react";
import { useUpdateProfile, useUserData } from "@/hooks/useProfile";

export function ProfileInfoForm() {
  const { user, isLoading: isLoadingUser } = useUserData();
  const { register, handleSubmit, errors, isLoading } = useUpdateProfile(user || undefined);

  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm">
        {/* Profile Avatar Section */}
        <div className="flex flex-col items-center mb-8 pb-6 border-b border-border">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <UserCircle className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-success flex items-center justify-center border-4 border-surface">
              <span className="text-white text-xs">✓</span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-text-primary">{user?.name || "User"}</h3>
          <p className="text-sm text-text-secondary">{user?.email}</p>
          <span className="mt-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium capitalize">
             Member
          </span>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
              <input
                {...register("name")}
                type="text"
                placeholder="Enter your name"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-text-primary placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            {errors.name && (
              <p className="text-error text-xs mt-1.5">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
              <input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-text-primary placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            {errors.email && (
              <p className="text-error text-xs mt-1.5">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
              <input
                {...register("phone")}
                type="tel"
                placeholder="Enter your phone number"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-text-primary placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            {errors.phone && (
              <p className="text-error text-xs mt-1.5">{errors.phone.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-primary text-text-inverse font-semibold rounded-xl hover:bg-primary-dark transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
