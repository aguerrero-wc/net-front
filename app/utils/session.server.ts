import { createCookieSessionStorage } from "@remix-run/node";
import type { SessionData } from "~/types/auth";

/**
 * Configuración de sesiones de Remix
 * La sesión almacena el accessToken de forma segura en el servidor
 */

// Validar que exista el secreto de sesión
if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET debe estar definido en las variables de entorno");
}

// Crear el almacenamiento de sesiones con cookies
export const sessionStorage = createCookieSessionStorage<SessionData>({
  cookie: {
    name: "__session", // Nombre de la cookie en el navegador
    httpOnly: true, // Cookie no accesible desde JavaScript del cliente
    maxAge: 60 * 60 * 24 * 7, // 7 días (igual que el refresh token)
    path: "/", // Cookie disponible en toda la app
    sameSite: "lax", // Protección contra CSRF
    secrets: [process.env.SESSION_SECRET], // Secreto para encriptar la cookie
    secure: process.env.NODE_ENV === "production", // Solo HTTPS en producción
  },
});

/**
 * Obtener la sesión actual desde el request
 */
export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

/**
 * Obtener el access token de la sesión
 */
export async function getAccessToken(request: Request): Promise<string | null> {
  const session = await getSession(request);
  return session.get("accessToken") || null;
}

/**
 * Obtener el usuario de la sesión
 */
export async function getUser(request: Request): Promise<SessionData["user"] | null> {
  const session = await getSession(request);
  return session.get("user") || null;
}

/**
 * Guardar datos de autenticación en la sesión
 */
export async function createUserSession({
  request,
  accessToken,
  user,
  redirectTo,
}: {
  request: Request;
  accessToken: string;
  user: SessionData["user"];
  redirectTo: string;
}) {
  const session = await getSession(request);
  session.set("accessToken", accessToken);
  session.set("user", user);

  return new Response(null, {
    status: 302,
    headers: {
      Location: redirectTo,
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

/**
 * Actualizar el access token en la sesión existente
 * Útil para el refresh token
 */
export async function updateAccessToken(
  request: Request,
  newAccessToken: string
): Promise<string> {
  const session = await getSession(request);
  session.set("accessToken", newAccessToken);
  return sessionStorage.commitSession(session);
}

/**
 * Destruir la sesión (logout)
 */
export async function destroySession(request: Request) {
  const session = await getSession(request);
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/auth/login",
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

/**
 * Verificar si el usuario está autenticado
 */
export async function isAuthenticated(request: Request): Promise<boolean> {
  const accessToken = await getAccessToken(request);
  return accessToken !== null;
}