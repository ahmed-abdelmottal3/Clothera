import { SignUpData, SignInData, ForgotPasswordData, verifyResetCodeData, resetPasswordData } from "@/types/auth";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import api from "@/lib/axios";

export async function registerUser(values: SignUpData) {
  try {
    const response = await api.post("/auth/signup", values);
    toast.success("Registration successful!");

    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message?: string; errors?: Array<{ msg: string }>; error?: string }>;
    console.error("Registration error details:", err.response?.data);
    const message =
      err.response?.data?.errors?.[0]?.msg ||
      err.response?.data?.message ||
      err.response?.data?.error ||
      err.message ||
      "Something went wrong";
    toast.error(message);
    throw new Error(message);
  }
}

export async function signInUser(values: SignInData) {
  try {
    const response = await api.post("/auth/signin", values);
    toast.success("Login successful!");

    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message?: string; errors?: Array<{ msg: string }>; error?: string }>;
    console.error("Sign in error details:", err.response?.data);
    const message =
      err.response?.data?.errors?.[0]?.msg ||
      err.response?.data?.message ||
      err.response?.data?.error ||
      err.message ||
      "Something went wrong";
    toast.error(message);
    throw new Error(message);
  }
}

export async function forgotPassword(values: ForgotPasswordData) {
  try {
    const response = await api.post("/auth/forgotPasswords", values);
    toast.success("Check your email for reset instructions!");

    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    const message =
      err.response?.data?.message ||
      err.message ||
      "Something went wrong";
    toast.error(message);
    throw new Error(message);
  }
}

export async function verifyResetCode(values: verifyResetCodeData) {
  try {
    const response = await api.post("/auth/verifyResetCode", values);

    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    const message =
      err.response?.data?.message ||
      err.message ||
      "Something went wrong";
    toast.error(message);
    throw new Error(message);
  }
}

export async function resetPassword(values :resetPasswordData) {
  try{
    const response = await api.put("/auth/resetPassword", values);
    toast.success("Password reset successful!");
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    const message =
      err.response?.data?.message ||
      err.message ||
      "Something went wrong";
    toast.error(message);
    throw new Error(message);
  }
}