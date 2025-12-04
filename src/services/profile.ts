import api from "@/lib/axios";
import { 
  Address, 
  AddressFormData, 
  AddressResponse, 
  SingleAddressResponse,
  ChangePasswordData, 
  UpdateProfileData,
  UserDataResponse 
} from "@/types/profile";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

// ==================== Address Services ====================

export async function getAddresses(): Promise<Address[]> {
  try {
    const response = await api.get<AddressResponse>("/addresses");
    return response.data.data || [];
  } catch (error: unknown) {
    const err = error as AxiosError<{ message?: string }>;
    const message = err.response?.data?.message || err.message || "Failed to fetch addresses";
    console.error("Get addresses error:", message);
    throw new Error(message);
  }
}

export async function getAddress(id: string): Promise<Address> {
  try {
    const response = await api.get<SingleAddressResponse>(`/addresses/${id}`);
    return response.data.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message?: string }>;
    const message = err.response?.data?.message || err.message || "Failed to fetch address";
    console.error("Get address error:", message);
    throw new Error(message);
  }
}

export async function addAddress(data: AddressFormData): Promise<Address> {
  try {
    const response = await api.post<SingleAddressResponse>("/addresses", data);
    toast.success("Address added successfully!");
    return response.data.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message?: string; errors?: Array<{ msg: string }> }>;
    const message = 
      err.response?.data?.errors?.[0]?.msg ||
      err.response?.data?.message || 
      err.message || 
      "Failed to add address";
    toast.error(message);
    throw new Error(message);
  }
}

export async function deleteAddress(id: string): Promise<void> {
  try {
    await api.delete(`/addresses/${id}`);
    toast.success("Address deleted successfully!");
  } catch (error: unknown) {
    const err = error as AxiosError<{ message?: string }>;
    const message = err.response?.data?.message || err.message || "Failed to delete address";
    toast.error(message);
    throw new Error(message);
  }
}
export async function updateAddress(id: string, data: AddressFormData): Promise<Address> {
  try {
    const response = await api.put<SingleAddressResponse>(`/addresses/${id}`, data);
    toast.success("Address updated successfully!");
    return response.data.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message?: string; errors?: Array<{ msg: string }> }>;
    const message = 
      err.response?.data?.errors?.[0]?.msg ||
      err.response?.data?.message || 
      err.message || 
      "Failed to update address";
    toast.error(message);
    throw new Error(message);
  }
}

// ==================== User Services ====================

export async function changePassword(data: ChangePasswordData): Promise<void> {
  try {
    await api.put("/users/changeMyPassword", data);
    toast.success("Password changed successfully!");
  } catch (error: unknown) {
    const err = error as AxiosError<{ message?: string; errors?: Array<{ msg: string }> }>;
    const message = 
      err.response?.data?.errors?.[0]?.msg ||
      err.response?.data?.message || 
      err.message || 
      "Failed to change password";
    toast.error(message);
    throw new Error(message);
  }
}

export async function updateProfile(data: UpdateProfileData): Promise<void> {
  try {
    await api.put("/users/updateMe", data);
    toast.success("Profile updated successfully!");
  } catch (error: unknown) {
    const err = error as AxiosError<{ message?: string; errors?: Array<{ msg: string }> }>;
    const message = 
      err.response?.data?.errors?.[0]?.msg ||
      err.response?.data?.message || 
      err.message || 
      "Failed to update profile";
    toast.error(message);
    throw new Error(message);
  }
}

export async function getLoggedUserData(): Promise<UserDataResponse> {
  try {
    const response = await api.get<UserDataResponse>("/users/me");
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message?: string }>;
    const message = err.response?.data?.message || err.message || "Failed to fetch user data";
    console.error("Get user data error:", message);
    throw new Error(message);
  }
}
