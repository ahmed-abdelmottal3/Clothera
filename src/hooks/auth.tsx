import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, signInSchema, SignUpSchema, SignInSchema } from "@/schema/auth";
import { registerUser, signInUser } from "@/services/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
