"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, signInSchema, forgotPasswordSchema, verifyResetCodeSchema, SignUpSchema, SignInSchema, ForgotPasswordSchema, VerifyResetCodeSchema, ResetPasswordSchema, resetPasswordSchema } from "@/schema/auth";
import { registerUser, signInUser, forgotPassword, verifyResetCode, resetPassword } from "@/services/auth";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpSchema) => {
    setIsLoading(true);
    try {
      await registerUser(data);
      router.push("/sign-in");
      reset();
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isLoading,
  };
};

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInSchema) => {
    setIsLoading(true);
    try {
      const response = await signInUser(data);
      if (response.token) {
        localStorage.setItem("token", response.token);
        Cookies.set("token", response.token, { expires: 7, path: '/', sameSite: 'lax' });
      }
      toast.success("Login successful!");
      reset();
      
      // Force page reload to update navbar state
      setTimeout(() => {
        window.location.href = "/";
      }, 100);
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    reset,
    errors,
    isLoading,
  };
};

export const useForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    setIsLoading(true);
    setIsSuccess(false);
    try {
      await forgotPassword(data);
      setIsSuccess(true);
      reset();
      // Optionally redirect after a delay
      setTimeout(() => {
        router.push("/verify-code");
      }, 3000);
    } catch (error) {
      console.error("Forgot password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isLoading,
    isSuccess,
  };
};


export const useVerifyResetCode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VerifyResetCodeSchema>({
    resolver: zodResolver(verifyResetCodeSchema),
  });

  const onSubmit = async (data: VerifyResetCodeSchema) => {
    setIsLoading(true);
    try {
      await verifyResetCode(data);
      router.push("/reset-password");
      toast.success("Code verified successfully!");
      reset();
    } catch (error) {
      console.error("Verify code error:", error);
      toast.error("Invalid code");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isLoading,
  };
};

export const useResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordSchema) => {
    setIsLoading(true);
    try {
      await resetPassword(data);
      router.push("/sign-in");
      toast.success("Password reset successfully!");
      reset();
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error("Invalid code");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isLoading,
  };
};

// Hook to check if user is authenticated
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
      setIsLoading(false);
      return !!token;
    }
    setIsLoading(false);
    return false;
  }, []);

  useEffect(() => {
    // eslint-disable-next-line
    checkAuth();
  }, [checkAuth]);

  return {
    isAuthenticated,
    isLoading,
    checkAuth,
  };
};

// Hook to handle logout
export const useLogout = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const logout = () => {
    setIsLoading(true);
    try {
      // Remove token from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem("token");
        Cookies.remove("token", { path: '/' });
      }
      
      // Show success message
      toast.success("Logged out successfully!");
      
      // Force page reload to clear auth state
      setTimeout(() => {
        window.location.href = "/";
      }, 100);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    logout,
    isLoading,
  };
};