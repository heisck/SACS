import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    APP_ENV: z
      .enum(["development", "test", "staging", "production"])
      .default("development"),
    APP_URL: z.string().url(),
    DATABASE_URL: z.string().min(1).optional(),
    DATABASE_URL_UNPOOLED: z.string().min(1).optional(),
    UPSTASH_REDIS_REST_URL: z.string().url().optional(),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
    QSTASH_TOKEN: z.string().min(1).optional(),
    BETTER_AUTH_SECRET: z.string().min(32).optional(),
    GOOGLE_CLIENT_ID: z.string().min(1).optional(),
    GOOGLE_CLIENT_SECRET: z.string().min(1).optional(),
    RESEND_API_KEY: z.string().min(1).optional(),
    ARKESEL_API_KEY: z.string().min(1).optional(),
    META_WHATSAPP_ACCESS_TOKEN: z.string().min(1).optional(),
    OPENAI_API_KEY: z.string().min(1).optional(),
    SENTRY_DSN: z.string().url().optional()
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url()
  },
  runtimeEnv: {
    APP_ENV: process.env.APP_ENV,
    APP_URL: process.env.APP_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_URL_UNPOOLED: process.env.DATABASE_URL_UNPOOLED,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    QSTASH_TOKEN: process.env.QSTASH_TOKEN,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    ARKESEL_API_KEY: process.env.ARKESEL_API_KEY,
    META_WHATSAPP_ACCESS_TOKEN: process.env.META_WHATSAPP_ACCESS_TOKEN,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    SENTRY_DSN: process.env.SENTRY_DSN,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL
  },
  emptyStringAsUndefined: true
});
