'use client';

import React from 'react';
import Link from 'next/link';
import { useSignUp } from '@/hooks/auth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function SignUpPage() {
  const { register, handleSubmit, errors, isLoading } = useSignUp();

  return (
    <div className="min-h-screen flex flex-row-reverse bg-background">
      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-[440px] animate-slide-right">
          {/* Logo/Brand */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">
              Clothera
            </h1>
            <p className="text-lg text-text-secondary">
              Create your account to get started
            </p>
          </div>

          {/* Sign Up Form */}
          <form 
            onSubmit={handleSubmit}
            className="bg-surface p-8 rounded-2xl shadow-[0_8px_24px_rgba(26,31,58,0.12)]"
          >
            <h2 className="text-2xl font-semibold mb-6 text-text-primary">
              Sign Up
            </h2>

            <Input
              id="name"
              type="text"
              label="Full Name"
              placeholder="John Doe"
              error={errors.name?.message}
              {...register('name')}
            />

            <Input
              id="email"
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              id="phone"
              type="phone"
              label="Phone Number"
              placeholder="+1 (555) 000-0000"
              error={errors.phone?.message}
              {...register('phone')}
            />

            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="Min. 6 characters"
              error={errors.password?.message}
              helperText="Must be at least 6 characters long"
              {...register('password')}
            />

            <Input
              id="rePassword"
              type="password"
              label="Confirm Password"
              placeholder="Re-enter your password"
              error={errors.rePassword?.message}
              {...register('rePassword')}
            />

            <div className="mb-6">
              <label className="flex items-start gap-2 text-sm text-text-secondary cursor-pointer">
                <input 
                  type="checkbox" 
                  required 
                  className="mt-1 cursor-pointer" 
                />
                <span>
                  I agree to the{' '}
                  <Link 
                    href="/terms"
                    className="text-secondary font-medium hover:text-secondary-light"
                  >
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link 
                    href="/privacy"
                    className="text-secondary font-medium hover:text-secondary-light"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="mb-4"
            >
              Create Account
            </Button>

            <div className="text-center text-sm text-text-secondary">
              Already have an account?{' '}
              <Link 
                href="/sign-in"
                className="text-secondary font-medium hover:text-secondary-light"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Left Side - Image/Brand Section */}
      <div className="hidden lg:flex flex-1 bg-secondary items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-[15%] left-[10%] w-[180px] h-[180px] bg-primary rounded-full opacity-10" />
        <div className="absolute bottom-[10%] right-[8%] w-[120px] h-[120px] bg-accent rounded-full opacity-15" />

        {/* Content */}
        <div className="z-10 text-center animate-slide-left">
          <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 text-4xl">
            🎨
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Your Fashion Journey
          </h2>
          <p className="text-lg text-white max-w-[400px] leading-relaxed opacity-95">
            Express yourself through fashion. Discover, create, and share your unique style with our community.
          </p>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-[500px]">
            {[
              { number: '10k+', label: 'Members' },
              { number: '500+', label: 'Brands' },
              { number: '50k+', label: 'Products' },
            ].map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-3xl font-bold mb-1">
                  {stat.number}
                </div>
                <div className="text-sm opacity-90">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
