"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { 
  Address, 
  AddressFormData, 
  ChangePasswordData, 
  UpdateProfileData,
  UserProfile 
} from "@/types/profile";
import {
  getAddresses,
  addAddress,
  deleteAddress,
  updateAddress,
  changePassword,
  updateProfile,
} from "@/services/profile";

// ==================== Validation Schemas ====================

export const addressSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  details: z.string().min(5, "Address details must be at least 5 characters"),
  phone: z.string().regex(/^(\+20|0)?1[0125]\d{8}$/, "Please enter a valid Egyptian phone number"),
  city: z.string().min(2, "City must be at least 2 characters"),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, "Password must be at least 6 characters"),
  password: z.string().min(6, "New password must be at least 6 characters"),
  rePassword: z.string().min(6, "Confirm password must be at least 6 characters"),
}).refine((data) => data.password === data.rePassword, {
  message: "Passwords don't match",
  path: ["rePassword"],
});

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().regex(/^(\+20|0)?1[0125]\d{8}$/, "Please enter a valid Egyptian phone number"),
});

export type AddressSchema = z.infer<typeof addressSchema>;
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;

// ==================== Address Hook ====================

export const useAddresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressSchema>({
    resolver: zodResolver(addressSchema),
  });

  const fetchAddresses = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAddresses();
      setAddresses(data);
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const onSubmit = async (data: AddressFormData) => {
    setIsAdding(true);
    try {
      if (editingId) {
        const updatedAddress = await updateAddress(editingId, data);
        setAddresses((prev) => prev.map((addr) => addr._id === editingId ? updatedAddress : addr));
        setEditingId(null);
        toast.success("Address updated successfully");
      } else {
        const newAddress = await addAddress(data);
        setAddresses((prev) => [...prev, newAddress]);
        toast.success("Address added successfully");
      }
      reset({ name: "", details: "", phone: "", city: "" });
    } catch (error) {
      console.error("Failed to save address:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const startEditing = (address: Address) => {
    setEditingId(address._id);
    reset({
      name: address.name,
      details: address.details,
      phone: address.phone,
      city: address.city,
    });
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditing = () => {
    setEditingId(null);
    reset({ name: "", details: "", phone: "", city: "" });
  };

  const onDeleteAddress = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteAddress(id);
      setAddresses((prev) => prev.filter((addr) => addr._id !== id));
    } catch (error) {
      console.error("Failed to delete address:", error);
    } finally {
      setDeletingId(null);
    }
  };

  return {
    addresses,
    isLoading,
    isAdding,
    deletingId,
    editingId,
    register,
    handleSubmit: handleSubmit(onSubmit),
    startEditing,
    cancelEditing,
    errors,
    onDeleteAddress,
    refetch: fetchAddresses,
  };
};

// ==================== Change Password Hook ====================

export const useChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordData) => {
    setIsLoading(true);
    try {
      await changePassword(data);
      reset();
    } catch (error) {
      console.error("Failed to change password:", error);
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

// ==================== Update Profile Hook ====================

export const useUpdateProfile = (initialData?: UserProfile) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      email: initialData.email,
      phone: initialData.phone || "",
    } : undefined,
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone || "",
      });
    }
  }, [initialData, reset]);

  const onSubmit = async (data: UpdateProfileData) => {
    setIsLoading(true);
    try {
      await updateProfile(data);
    } catch (error) {
      console.error("Failed to update profile:", error);
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

// ==================== User Data Hook ====================

export const useUserData = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = useCallback(() => {
    setIsLoading(true);
    try {
      // Read user data from localStorage (stored during login)
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return {
    user,
    isLoading,
    refetch: fetchUserData,
  };
};
