import { redirect } from "@remix-run/node";
import { getUser, getAccessToken } from "./session.server";
import type { User } from "~/types/auth";

/**
 * Guards para proteger rutas en Remix
 * Equivalente a @UseGuards() en NestJS
 */

/**
 * Requiere que el usuario esté autenticado
 * Si no está autenticado, redirige al login
 * 
 * Uso en loader/action:
 * ```ts
 * export async function loader({ request }: LoaderFunctionArgs) {
 *   const user = await requireAuth(request);
 *   // ... resto del código
 * }
 * ```
 */
export async function requireAuth(request: Request): Promise<User> {
  const user = await getUser(request);
  
  if (!user) {
    // Guardar la URL actual para redirigir después del login
    const url = new URL(request.url);
    const redirectTo = url.pathname + url.search;
    
    throw redirect(`/?redirectTo=${encodeURIComponent(redirectTo)}`);
  }

  return user;
}

/**
 * Requiere que el usuario NO esté autenticado (para login/signup)
 * Si está autenticado, redirige al dashboard
 * 
 * Uso en loader/action:
 * ```ts
 * export async function loader({ request }: LoaderFunctionArgs) {
 *   await requireGuest(request);
 *   // ... resto del código
 * }
 * ```
 */
export async function requireGuest(request: Request): Promise<void> {
  const accessToken = await getAccessToken(request);
  
  if (accessToken) {
    throw redirect("/dashboard");
  }
}

/**
 * Verifica si el usuario está autenticado sin redirigir
 * Útil para páginas públicas que muestran contenido diferente según el estado
 * 
 * Uso en loader:
 * ```ts
 * export async function loader({ request }: LoaderFunctionArgs) {
 *   const user = await optionalAuth(request);
 *   // user puede ser null
 * }
 * ```
 */
export async function optionalAuth(request: Request): Promise<User | null> {
  return getUser(request);
}

/**
 * Requiere un rol específico (si implementas roles en el futuro)
 * 
 * Uso en loader/action:
 * ```ts
 * export async function loader({ request }: LoaderFunctionArgs) {
 *   const user = await requireRole(request, ['admin', 'editor']);
 *   // ... resto del código
 * }
 * ```
 */
export async function requireRole(
  request: Request,
  allowedRoles: string[]
): Promise<User> {
  const user = await requireAuth(request);
  
  // Aquí deberías verificar el rol del usuario
  // Por ahora solo verificamos que esté autenticado
  // Si tu User tiene un campo 'role', descomenta esto:
  /*
  if (!allowedRoles.includes(user.role)) {
    throw new Response("No autorizado", { status: 403 });
  }
  */
  
  return user;
}

/**
 * Requiere que el email esté verificado
 */
export async function requireVerifiedEmail(request: Request): Promise<User> {
  const user = await requireAuth(request);
  
  if (!user.emailVerified) {
    throw redirect("/auth/verify-email");
  }
  
  return user;
}

/**
 * Requiere que el usuario no esté bloqueado
 */
export async function requireNotBlocked(request: Request): Promise<User> {
  const user = await requireAuth(request);
  
  if (user.isBlocked) {
    throw redirect("/auth/blocked");
  }
  
  return user;
}

/**
 * Guard combinado: autenticado, verificado y no bloqueado
 * El más común para rutas protegidas
 */
export async function requireActiveUser(request: Request): Promise<User> {
  const user = await requireAuth(request);
  
  if (user.isBlocked) {
    throw redirect("/auth/blocked");
  }
  
  if (!user.isActive) {
    throw redirect("/auth/inactive");
  }
  
  return user;
}