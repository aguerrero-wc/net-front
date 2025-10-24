import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useActionData, Form, useNavigation } from "@remix-run/react";
import { requireAuth } from "~/utils/guards.server";
import { getProfile } from "~/services/auth.server";
import { apiGet } from "~/services/api.server";
import { useState, useEffect } from "react";

/**
 * Loader: Cargar datos del usuario autenticado
 */
export async function loader({ request }: LoaderFunctionArgs) {
  // Proteger la ruta - redirige a login si no está autenticado
  const user = await requireAuth(request);

  return json({ user });
}

/**
 * Action: Probar diferentes operaciones
 */
export async function action({ request }: ActionFunctionArgs) {
  await requireAuth(request);

  const formData = await request.formData();
  const action = formData.get("_action");

  try {
    switch (action) {
      case "call-protected-api": {
        // Llamar al endpoint /auth/me para probar el access token
        const profile = await getProfile(request);
        return json({
          success: true,
          message: "API protegida llamada exitosamente",
          data: profile,
          timestamp: new Date().toISOString(),
        });
      }

      case "call-api-generic": {
        // Llamar a cualquier endpoint para probar el refresh automático
        const response = await apiGet(request, "/auth/me");
        const data = await response.json();
        return json({
          success: true,
          message: "Llamada genérica exitosa",
          data,
          timestamp: new Date().toISOString(),
        });
      }

      default:
        return json({ error: "Acción desconocida" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error en action:", error);
    return json({
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * Componente de Test
 */
export default function TestAuth() {
  const { user } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const [logs, setLogs] = useState<string[]>([]);

  const isSubmitting = navigation.state === "submitting";

  // Agregar log cuando hay respuesta del action
  useEffect(() => {
    if (actionData) {
      const timestamp = new Date().toLocaleTimeString();
      if ("success" in actionData && actionData.success) {
        setLogs((prev) => [
          `[${timestamp}] ✅ ${actionData.message}`,
          ...prev.slice(0, 9),
        ]);
      } else if ("error" in actionData) {
        setLogs((prev) => [
          `[${timestamp}] ❌ Error: ${actionData.error}`,
          ...prev.slice(0, 9),
        ]);
      }
    }
  }, [actionData]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Test de Autenticación
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Panel de pruebas para validar el flujo de JWT con Refresh Token
              </p>
            </div>
            <Form method="post" action="/auth/logout">
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Cerrar Sesión
              </button>
            </Form>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Estado de Autenticación */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              📊 Estado de Autenticación
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-sm font-medium text-gray-500 w-32">
                  Estado:
                </span>
                <span className="text-sm text-green-600 font-semibold">
                  ✓ Autenticado
                </span>
              </div>

              <div className="flex items-start">
                <span className="text-sm font-medium text-gray-500 w-32">
                  Email:
                </span>
                <span className="text-sm text-gray-900">{user.email}</span>
              </div>

              <div className="flex items-start">
                <span className="text-sm font-medium text-gray-500 w-32">
                  ID:
                </span>
                <span className="text-sm text-gray-900 font-mono">{user.id}</span>
              </div>

              {user.name && (
                <div className="flex items-start">
                  <span className="text-sm font-medium text-gray-500 w-32">
                    Nombre:
                  </span>
                  <span className="text-sm text-gray-900">{user.name}</span>
                </div>
              )}

              <div className="flex items-start">
                <span className="text-sm font-medium text-gray-500 w-32">
                  Activo:
                </span>
                <span className={`text-sm ${user.isActive ? "text-green-600" : "text-red-600"}`}>
                  {user.isActive ? "Sí" : "No"}
                </span>
              </div>

              <div className="flex items-start">
                <span className="text-sm font-medium text-gray-500 w-32">
                  Bloqueado:
                </span>
                <span className={`text-sm ${user.isBlocked ? "text-red-600" : "text-green-600"}`}>
                  {user.isBlocked ? "Sí" : "No"}
                </span>
              </div>

              <div className="flex items-start">
                <span className="text-sm font-medium text-gray-500 w-32">
                  Email Verificado:
                </span>
                <span className={`text-sm ${user.emailVerified ? "text-green-600" : "text-yellow-600"}`}>
                  {user.emailVerified ? "Sí" : "No"}
                </span>
              </div>

              {user.lastLogin && (
                <div className="flex items-start">
                  <span className="text-sm font-medium text-gray-500 w-32">
                    Último Login:
                  </span>
                  <span className="text-sm text-gray-900">
                    {new Date(user.lastLogin).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🎯 Acciones de Prueba
            </h2>

            <div className="space-y-3">
              <Form method="post">
                <input type="hidden" name="_action" value="call-protected-api" />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left flex items-center justify-between"
                >
                  <span>🔒 Llamar API Protegida (/auth/me)</span>
                  {isSubmitting && navigation.formData?.get("_action") === "call-protected-api" && (
                    <span className="text-sm">Cargando...</span>
                  )}
                </button>
              </Form>

              <Form method="post">
                <input type="hidden" name="_action" value="call-api-generic" />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left flex items-center justify-between"
                >
                  <span>🔄 Test Refresh Automático</span>
                  {isSubmitting && navigation.formData?.get("_action") === "call-api-generic" && (
                    <span className="text-sm">Cargando...</span>
                  )}
                </button>
              </Form>

              <div className="pt-3 border-t">
                <p className="text-sm text-gray-600 mb-2">
                  💡 <strong>Nota:</strong> El refresh token se maneja automáticamente.
                  Si el access token expira (15 min), el sistema lo renovará sin que te des cuenta.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Logs de Actividad */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              📋 Log de Actividad
            </h2>
            <button
              onClick={() => setLogs([])}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Limpiar
            </button>
          </div>

          <div className="bg-gray-50 rounded-md p-4 font-mono text-sm space-y-2 max-h-64 overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No hay logs aún. Prueba alguna acción.
              </p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="text-gray-800">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Resultado del Action */}
        {actionData && "data" in actionData && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              📦 Última Respuesta
            </h2>
            <pre className="bg-gray-50 rounded-md p-4 overflow-x-auto text-sm">
              {JSON.stringify(actionData.data, null, 2)}
            </pre>
          </div>
        )}

        {/* Información Adicional */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>¿Cómo funciona el refresh automático?</strong>
              </p>
              <p className="mt-2 text-sm text-blue-700">
                Cuando el Access Token expira (15 minutos), el cliente API detecta el error 401,
                usa el Refresh Token almacenado en una cookie HTTPOnly para obtener un nuevo
                Access Token, y reintenta la petición automáticamente. Todo esto sucede de
                forma transparente sin que el usuario tenga que volver a iniciar sesión.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}