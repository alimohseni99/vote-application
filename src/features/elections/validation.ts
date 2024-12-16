import { z } from "zod";

export const electionSchema = z.object({
  title: z.string().min(1, "This field is required"),
  optionA: z.string().min(1, "This field is required"),
  optionB: z.string().min(1, "This field is required"),
  optionC: z.string().min(1, "This field is required"),
  optionD: z.string().min(1, "This field is required"),
});
