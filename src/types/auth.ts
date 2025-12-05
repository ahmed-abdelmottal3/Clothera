export interface SignUpData {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
}

export interface SignInData {
    email: string;
    password: string;
}

export interface ForgotPasswordData {
    email: string;
}

export interface verifyResetCodeData {
    resetCode: string;
}

export interface resetPasswordData {
    email: string;
    newPassword: string;
}