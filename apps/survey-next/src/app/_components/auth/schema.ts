import { z } from "zod";

// allauth session payload (the `data` part of the envelope). Shape is partial —
// allauth returns more, but this is what the UI needs. Refine in task 0.
export const UserSchema = z.object({
  id: z.union([z.number(), z.string()]).optional(),
  display: z.string().optional(),
  name: z.string().optional(),
  email: z.email().optional(),
  username: z.string().optional(),
  has_usable_password: z.boolean().optional(),
});
export type User = z.infer<typeof UserSchema>;

export const SessionSchema = z.object({
  user: UserSchema.optional(),
});

// an email address as returned by GET /account/email
export const EmailAddressSchema = z.object({
  email: z.email(),
  primary: z.boolean(),
  verified: z.boolean(),
});
export type EmailAddress = z.infer<typeof EmailAddressSchema>;

// --- form inputs ---

export const LoginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});
export type LoginFormData = z.infer<typeof LoginSchema>;

export const SignupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordConfirm: z.string(),
  })
  .refine((d) => d.password === d.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });
export type SignupFormData = z.infer<typeof SignupSchema>;

export const PasswordResetRequestSchema = z.object({
  email: z.email("Enter a valid email address"),
});
export type PasswordResetRequestFormData = z.infer<
  typeof PasswordResetRequestSchema
>;

export const PasswordResetConfirmSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordConfirm: z.string(),
  })
  .refine((d) => d.password === d.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });
export type PasswordResetConfirmFormData = z.infer<
  typeof PasswordResetConfirmSchema
>;

export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    newPasswordConfirm: z.string(),
  })
  .refine((d) => d.newPassword === d.newPasswordConfirm, {
    message: "Passwords do not match",
    path: ["newPasswordConfirm"],
  });
export type ChangePasswordFormData = z.infer<typeof ChangePasswordSchema>;
