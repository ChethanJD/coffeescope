import type { LoginValues, SignupValues } from "@/lib/validation/authSchemas";

/**
 * Mock authentication layer. Every function here simulates network latency
 * and always succeeds — it exists purely so the UI has a real async flow
 * (loading states, disabled buttons, redirects) to build against.
 *
 * When the FastAPI backend is wired up (JWT auth per the tech stack),
 * replace the bodies below with real fetch() calls to e.g.
 * POST /api/auth/login and POST /api/auth/signup, store the returned
 * JWT (httpOnly cookie recommended over localStorage), and throw on
 * non-2xx responses so the forms' existing error-handling path works
 * unchanged.
 */

function simulateLatency(ms = 900) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function mockLogin(values: LoginValues) {
  await simulateLatency();
  return { token: "mock-jwt-token", email: values.email };
}

export async function mockSignup(values: SignupValues) {
  await simulateLatency();
  return { token: "mock-jwt-token", email: values.email, name: values.name };
}
