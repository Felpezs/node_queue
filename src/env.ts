import { z } from "zod";

const envSchema = z.object({
  MAIL_HOST: z.string(),
  MAIL_PORT: z.number(),
  MAIL_USER: z.string(),
  MAIL_PASS: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.number(),
});

export const env = envSchema.parse(process.env);
