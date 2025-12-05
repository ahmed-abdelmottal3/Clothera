// Address types
export interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface AddressFormData {
  name: string;
  details: string;
  phone: string;
  city: string;
}

// Password change types
export interface ChangePasswordData {
  currentPassword: string;
  password: string;
  rePassword: string;
}

// Profile update types
export interface UpdateProfileData {
  name: string;
  email: string;
  phone: string;
}

// User profile response
export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  role?: string;
}

// API Response types
export interface AddressResponse {
  status: string;
  data: Address[];
}

export interface SingleAddressResponse {
  status: string;
  data: Address;
}

export interface UserDataResponse {
  data: {
    user: UserProfile;
  };
}
