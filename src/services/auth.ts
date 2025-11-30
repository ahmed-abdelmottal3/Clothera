import { SignUpData, SignInData } from "@/types/auth";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import api from "@/lib/axios";

export async function registerUser(values: SignUpData) {
  try {
    const response = await api.post("/auth/register", values);
    toast.success("Registration successful!");

    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    const message =
      err.response?.data?.message ||
      err.message ||
      "Something went wrong";
    throw new Error(message);
  }
}

export async function signInUser(values: SignInData) {
  try {
    const response = await api.post("/auth/signin", values);
    toast.success("Login successful!");

    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    const message =
      err.response?.data?.message ||
      err.message ||
      "Something went wrong";
    throw new Error(message);
  }
}
