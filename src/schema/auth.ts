import {z} from "zod";


export const signUpSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    rePassword: z.string().min(6, "Password must be at least 6 characters long"),
    phone: z.string().min(10, "Phone number must be at least 10 characters long"),
})

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})

export type SignInSchema = z.infer<typeof signInSchema>;

export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
})

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const verifyResetCodeSchema = z.object({
    resetCode: z.string().min(6, "Code must be at least 6 characters long"),
})

export type VerifyResetCodeSchema = z.infer<typeof verifyResetCodeSchema>;

export const resetPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
    newPassword: z.string().min(6, "Password must be at least 6 characters long"),
})

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
