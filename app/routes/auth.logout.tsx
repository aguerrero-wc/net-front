import { type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { signOut } from "~/services/auth.server";
import { destroySession } from "~/utils/session.server";

/**
 * Loader: Redirigir al login si acceden por GET
 */
export async function loader({ request }: LoaderFunctionArgs) {
  // Si alguien intenta acceder al logout por GET, solo destruir la sesión
  return destroySession(request);
}

/**
 * Action: Procesar el cierre de sesión
 */
export async function action({ request }: ActionFunctionArgs) {
  // Cerrar sesión en el backend (invalidar refresh token)
  try {
    await signOut(request);
  } catch (error) {
    console.error("Error al cerrar sesión en backend:", error);
    // Continuamos de todas formas para destruir la sesión local
  }

  // Destruir la sesión de Remix
  return destroySession(request);
}