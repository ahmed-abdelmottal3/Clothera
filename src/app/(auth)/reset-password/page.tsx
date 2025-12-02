'use client';
import Link from 'next/link';
import { useResetPassword } from '@/hooks/auth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export default function ResetPasswordPage() {
  const { register, handleSubmit, errors, isLoading } = useResetPassword();

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-[440px] animate-slide-left">
          {/* Logo/Brand */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">
              Clothera
            </h1>
            <p className="text-lg text-text-secondary">
              Reset Password
            </p>
          </div>

          {/* Reset Password Form */}
          <form 
            onSubmit={handleSubmit}
            className="bg-surface p-8 rounded-2xl shadow-[0_8px_24px_rgba(26,31,58,0.12)]"
          >
            <h2 className="text-2xl font-semibold mb-6 text-text-primary">
              Set New Password
            </h2>

            <p className="text-text-secondary mb-6">
              Please enter your email and new password.
            </p>

            <Input
              id="email"
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              id="newPassword"
              type="password"
              label="New Password"
              placeholder="Enter new password"
              error={errors.newPassword?.message}
              {...register('newPassword')}
            />

            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="mb-4"
            >
              Reset Password
            </Button>

            <div className="text-center text-sm text-text-secondary">
              Remember your password?{' '}
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

      {/* Right Side - Image/Brand Section */}
      <div className="hidden lg:flex flex-1 bg-primary items-center justify-center p-12 relative overflow-hidden ">
        {/* Decorative Elements */}
        <div className="absolute top-[10%] right-[10%] w-[200px] h-[200px] bg-secondary rounded-full opacity-10" />
        <div className="absolute bottom-[15%] left-[5%] w-[150px] h-[150px] bg-accent rounded-full opacity-10" />

        {/* Content */}
        <div className="z-10 text-center animate-slide-right">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
            <Image src="/assets/logo.png" alt="Logo" width={200} height={200} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Secure Your Account
          </h2>
          <p className="text-lg text-accent max-w-[400px] leading-relaxed">
            Create a strong password to protect your account and personal information.
          </p>

          {/* Feature List */}
          <div className="mt-10 text-left inline-block">
            {[
              'Strong Encryption',
              'Secure Access',
              'Privacy Protection',
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3 mb-4 text-white">
                <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-sm">
                  ✓
                </div>
                <span className="text-base">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
