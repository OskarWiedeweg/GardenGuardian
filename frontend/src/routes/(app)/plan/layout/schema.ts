import {z} from "zod";

export const bedFormSchema = z.object({
    name: z.string().min(3).max(255),
    size: z.string()
});