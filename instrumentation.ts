export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { registerOTel } = await import("@vercel/otel");

    registerOTel({
      serviceName: process.env.OTEL_SERVICE_NAME ?? "sacs-study-abroad"
    });
  }
}
