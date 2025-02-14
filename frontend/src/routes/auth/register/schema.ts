import {z} from "zod";

export const registerFormSchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(8)
});