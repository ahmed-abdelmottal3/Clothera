"use client";

import { Lock, Eye, EyeOff, Loader2, Shield, KeyRound } from "lucide-react";
import { useState } from "react";
import { useChangePassword } from "@/hooks/useProfile";

export function ChangePasswordForm() {
  const { register, handleSubmit, errors, isLoading } = useChangePassword();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Change Password</h3>
            <p className="text-sm text-text-secondary">Keep your account secure with a strong password</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Current Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
              <input
                {...register("currentPassword")}
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter current password"
                className="w-full pl-10 pr-12 py-3 rounded-xl border border-input bg-background text-text-primary placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-light hover:text-text-primary transition-colors"
              >
                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-error text-xs mt-1.5">{errors.currentPassword.message}</p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              New Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
              <input
                {...register("password")}
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="w-full pl-10 pr-12 py-3 rounded-xl border border-input bg-background text-text-primary placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-light hover:text-text-primary transition-colors"
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-error text-xs mt-1.5">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Confirm New Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
              <input
                {...register("rePassword")}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                className="w-full pl-10 pr-12 py-3 rounded-xl border border-input bg-background text-text-primary placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-light hover:text-text-primary transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.rePassword && (
              <p className="text-error text-xs mt-1.5">{errors.rePassword.message}</p>
            )}
          </div>

          {/* Password Tips */}
          <div className="bg-primary/5 rounded-xl p-4">
            <p className="text-sm font-medium text-text-primary mb-2">Password Requirements:</p>
            <ul className="text-xs text-text-secondary space-y-1">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                At least 6 characters
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Mix of letters and numbers recommended
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Avoid common passwords
              </li>
            </ul>
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
                Changing Password...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4" />
                Change Password
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
