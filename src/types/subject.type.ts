/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod";

const SubjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  icon: z.string(),
});

export type Subject = z.infer<typeof SubjectSchema>;

export type Subjects = Subject[];
