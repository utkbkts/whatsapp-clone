import { z } from "zod";

const requiredStringName = z
  .string({ required_error: "required" })
  .min(3, "min length should be 3")
  .regex(/^[a-zA-Z_çÇğĞıİöÖşŞüÜ^"\s]*$/, {
    message: "Invalid characters in search query",
  });

const requiredStringPassword = z
  .string({ required_error: "required" })
  .min(6, "min length should be 6")
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@?!#%])[A-Za-z\d@?!#%]{6,}$/, {
    message:
      "At least 1 uppercase, 1 lowercase and 1 special character must be entered.min.6 characters",
  });
export const registerSchema = z.object({
  name: requiredStringName,
  email: z.string({ required_error: "required" }).email(),
  password: requiredStringPassword,
  status: z
    .string()
    .regex(/^[A-Za-z0-9@?!#%çÇğĞıİöÖşŞüÜ^"\s]*$/, {
      message: "Invalid characters in status",
    })
    .optional(),
  picture: z.instanceof(File).optional(),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
