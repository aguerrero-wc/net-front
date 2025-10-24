import type { RefreshResponse } from "~/types/auth";
import { getAccessToken, updateAccessToken } from "~/utils/session.server";

/**
 * Cliente API con refresh automático de tokens
 * 
 * Este cliente intercepta errores 401 y automáticamente
 * refresca el access token usando el refresh token
 */

// URL base del backend NestJS
const API_BASE_URL = process.env.API_URL || "http://localhost:3003";

interface FetchOptions extends RequestInit {
  skipAuth?: boolean; // Para endpoints públicos
  skipRefresh?: boolean; // Para evitar loops infinitos en el refresh
}

/**
 * Cliente fetch personalizado con manejo de tokens
 */
export async function apiFetch(
  request: Request,
  endpoint: string,
  options: FetchOptions = {}
): Promise<Response> {
  const { skipAuth = false, skipRefresh = false, ...fetchOptions } = options;

  // Construir URL completa
  const url = `${API_BASE_URL}${endpoint}`;

  // Obtener access token si no es un endpoint público
  let accessToken: string | null = null;
  if (!skipAuth) {
    accessToken = await getAccessToken(request);
    
    if (!accessToken) {
      throw new Error("No hay token de acceso disponible");
    }
  }

  // Agregar headers de autorización
  const headers = new Headers(fetchOptions.headers);
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }
  headers.set("Content-Type", "application/json");

  // Extraer y reenviar las cookies del request original
  // Esto es CRÍTICO para que el refresh token (en cookie HTTPOnly) se envíe
  const originalCookies = request.headers.get("Cookie");
  if (originalCookies) {
    headers.set("Cookie", originalCookies);
  }

  // Hacer la petición
  let response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  // Si es 401 y no estamos ya en un refresh, intentar refrescar el token
  if (response.status === 401 && !skipRefresh && !skipAuth) {
    console.log("🔄 Token expirado detectado, intentando refresh automático...");

    try {
      // Intentar refrescar el token
      const newAccessToken = await refreshAccessToken(request);

      // Actualizar el token en la sesión
      await updateAccessToken(request, newAccessToken);

      // Reintentar la petición original con el nuevo token
      headers.set("Authorization", `Bearer ${newAccessToken}`);
      
      response = await fetch(url, {
        ...fetchOptions,
        headers,
      });

      console.log("✅ Token refrescado exitosamente, petición reintentada");
    } catch (error) {
      console.error("❌ Error al refrescar token:", error);
      // Si falla el refresh, propagar el error original
      throw new Error("Sesión expirada, por favor inicia sesión nuevamente");
    }
  }

  return response;
}

/**
 * Refrescar el access token usando el refresh token
 */
async function refreshAccessToken(request: Request): Promise<string> {
  const url = `${API_BASE_URL}/auth/refresh`;

  // Extraer cookies del request original (contiene el refresh token)
  const cookies = request.headers.get("Cookie");
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(cookies ? { Cookie: cookies } : {}),
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo refrescar el token");
  }

  const data: RefreshResponse = await response.json();
  return data.accessToken;
}

/**
 * Helpers para métodos HTTP comunes
 */
export async function apiGet(request: Request, endpoint: string, options?: FetchOptions) {
  return apiFetch(request, endpoint, { ...options, method: "GET" });
}

export async function apiPost(
  request: Request,
  endpoint: string,
  body: any,
  options?: FetchOptions
) {
  return apiFetch(request, endpoint, {
    ...options,
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function apiPut(
  request: Request,
  endpoint: string,
  body: any,
  options?: FetchOptions
) {
  return apiFetch(request, endpoint, {
    ...options,
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export async function apiPatch(
  request: Request,
  endpoint: string,
  body: any,
  options?: FetchOptions
) {
  return apiFetch(request, endpoint, {
    ...options,
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export async function apiDelete(request: Request, endpoint: string, options?: FetchOptions) {
  return apiFetch(request, endpoint, { ...options, method: "DELETE" });
}