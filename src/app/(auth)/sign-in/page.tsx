'use client';
import Link from 'next/link';
import { useSignIn } from '@/hooks/auth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export default function SignInPage() {
  const { register, handleSubmit, errors, isLoading } = useSignIn();

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
              Welcome back! Sign in to continue
            </p>
          </div>

          {/* Sign In Form */}
          <form 
            onSubmit={handleSubmit}
            className="bg-surface p-8 rounded-2xl shadow-[0_8px_24px_rgba(26,31,58,0.12)]"
          >
            <h2 className="text-2xl font-semibold mb-6 text-text-primary">
              Sign In
            </h2>

            <Input
              id="email"
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register('password')}
            />

            <div className="flex justify-between items-center mb-6">
              <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
                <input type="checkbox" className="cursor-pointer" />
                Remember me
              </label>
              <Link 
                href="/forgot-password"
                className="text-sm text-secondary font-medium hover:text-secondary-light"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="mb-4"
            >
              Sign In
            </Button>

            <div className="text-center text-sm text-text-secondary">
              Don&apos;t have an account?{' '}
              <Link 
                href="/sign-up"
                className="text-secondary font-medium hover:text-secondary-light"
              >
                Sign up
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
          <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
            <Image src="/assets/logo.png" alt="Logo" width={200} height={200} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Discover Your Style
          </h2>
          <p className="text-lg text-accent max-w-[400px] leading-relaxed">
            Join thousands of fashion enthusiasts exploring the latest trends and timeless classics.
          </p>

          {/* Feature List */}
          <div className="mt-10 text-left inline-block">
            {[
              'Curated Collections',
              'Personalized Recommendations',
              'Exclusive Member Benefits',
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
