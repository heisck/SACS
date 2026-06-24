import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  redact: {
    paths: [
      "password",
      "token",
      "*.token",
      "authorization",
      "cookie",
      "DATABASE_URL",
      "UPSTASH_REDIS_REST_TOKEN",
      "ARKESEL_API_KEY",
      "GOOGLE_CLIENT_SECRET",
      "OPENAI_API_KEY",
      "SENTRY_AUTH_TOKEN"
    ],
    censor: "[redacted]"
  }
});
