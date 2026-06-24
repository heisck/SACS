import { NextResponse } from "next/server";
import { contactSchema } from "@/features/leads/schemas/contact";
import { logger } from "@/server/logging/logger";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.issues },
      { status: 422 }
    );
  }

  // TODO(backend phase): rate-limit, persist to leads table, enqueue
  // confirmation email + staff notification. For now we validate and log.
  logger.info(
    { lead: { email: parsed.data.email, degree: parsed.data.degree } },
    "contact lead received"
  );

  return NextResponse.json({ ok: true });
}
