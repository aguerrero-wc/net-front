import type { SignInDto, SignUpDto, AuthResponse, User } from "~/types/auth";
import { apiFetch, apiPost } from "./api.server";

/**
 * Servicio de Autenticación
 * Encapsula todas las llamadas al backend de NestJS relacionadas con auth
 */

const API_BASE_URL = process.env.API_URL || "http://localhost:3000";

/**
 * Iniciar sesión
 * POST /auth/signin
 */
export async function signIn(signInDto: SignInDto): Promise<{
  accessToken: string;
  user: User;
  refreshTokenCookie: string | null;
}> {
  const response = await fetch(`${API_BASE_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signInDto),
    credentials: "include", // IMPORTANTE: Para recibir cookies
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Error al iniciar sesión");
  }

  const data: AuthResponse = await response.json();

  // Extraer la cookie del refresh token de la respuesta
  const setCookieHeader = response.headers.get("Set-Cookie");

  return {
    accessToken: data.accessToken,
    user: data.user,
    refreshTokenCookie: setCookieHeader,
  };
}

/**
 * Registrar usuario
 * POST /auth/signup
 */
export async function signUp(signUpDto: SignUpDto): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signUpDto),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Error al registrar usuario");
  }

  const data = await response.json();
  return data.user;
}

/**
 * Cerrar sesión
 * POST /auth/signout
 */
export async function signOut(request: Request): Promise<void> {
  try {
    const response = await apiPost(request, "/auth/signout", {});

    if (!response.ok) {
      console.error("Error al cerrar sesión en el backend");
    }
  } catch (error) {
    // Aún si falla el signout en el backend, continuamos
    console.error("Error al cerrar sesión:", error);
  }
}

/**
 * Obtener perfil del usuario actual
 * GET /auth/me
 */
export async function getProfile(request: Request): Promise<User> {
  const response = await apiFetch(request, "/auth/me", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener el perfil del usuario");
  }

  const data = await response.json();
  return data.user;
}

/**
 * Verificar si las credenciales son válidas sin crear sesión
 * Útil para validaciones
 */
export async function validateCredentials(
  email: string,
  password: string
): Promise<boolean> {
  try {
    await signIn({ email, password });
    return true;
  } catch {
    return false;
  }
}