"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, signInSchema, forgotPasswordSchema, verifyResetCodeSchema, SignUpSchema, SignInSchema, ForgotPasswordSchema, VerifyResetCodeSchema } from "@/schema/auth";
import { registerUser, signInUser, forgotPassword, verifyResetCode } from "@/services/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
      }
      router.push("/");
      reset();
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
      router.push("/sign-in");
      toast.success("Password reset successful!");
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
