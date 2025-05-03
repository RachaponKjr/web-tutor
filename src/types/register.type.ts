/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod";

const resRegisterSchema = z.object({
  createdAt: z.string(),
  email: z.string(),
  id: z.number(),
  role: z.string(),
  updatedAt: z.string(),
});

export type ResRegister = z.infer<typeof resRegisterSchema>;
