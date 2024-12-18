import { z } from "zod";

export const electionSchema = z.object({
  title: z.string().min(1, "This field is required"),
  choices: z.array(z.string().min(1, "Choice is required")),
});
