// app/routes/dashboard.users.new.tsx
import { useState } from "react";
import { Form, useActionData, useNavigation, Link } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

// Types
interface ActionData {
  errors?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
    general?: string;
  };
  success?: boolean;
}

// Action para manejar el submit del formulario
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  
  const userData = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    phone: formData.get("phone") as string,
    timezone: formData.get("timezone") as string,
    language: formData.get("language") as string,
  };

  // Validaciones básicas
  const errors: ActionData["errors"] = {};
  
  if (!userData.firstName || userData.firstName.trim().length < 2) {
    errors.firstName = "El nombre debe tener al menos 2 caracteres";
  }
  
  if (!userData.lastName || userData.lastName.trim().length < 2) {
    errors.lastName = "El apellido debe tener al menos 2 caracteres";
  }
  
  if (!userData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
    errors.email = "Email inválido";
  }
  
  if (!userData.password || userData.password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres";
  }

  if (Object.keys(errors).length > 0) {
    return json<ActionData>({ errors }, { status: 400 });
  }

  try {
    // Aquí harías la llamada a tu API backend
    // const response = await fetch('http://tu-api/users', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(userData)
    // });
    
    // Por ahora simulamos éxito
    console.log("Creando usuario:", userData);
    
    // Redirigir a la lista de usuarios después de crear
    return redirect("/dashboard/users");
  } catch (error) {
    return json<ActionData>(
      { errors: { general: "Error al crear el usuario. Intenta nuevamente." } },
      { status: 500 }
    );
  }
}

export default function NewUser() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              to="/dashboard/users"
              className="p-2 rounded-xl hover:bg-white/80 backdrop-blur-sm transition-all border border-gray-200/50 shadow-sm"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Crear Usuario</h1>
              <p className="text-gray-600 mt-1">Agrega un nuevo usuario al sistema</p>
            </div>
          </div>
        </div>

        {/* Form Card - Fondo más definido con borde sutil */}
        <div className="backdrop-blur-xl bg-white border border-gray-200 rounded-3xl shadow-lg p-8">
          <Form method="post" className="space-y-6">
            {/* Error General */}
            {actionData?.errors?.general && (
              <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">⚠️</span>
                  <div>
                    <h4 className="font-semibold text-red-900 text-sm">Error</h4>
                    <p className="text-sm text-red-700 mt-1">{actionData.errors.general}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Información Personal */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b-2 border-slate-200">
                <span className="text-xl">👤</span>
                <h3 className="text-lg font-semibold text-gray-900">Información Personal</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className={`w-full px-4 py-3 rounded-xl bg-white border-2 transition-all focus:outline-none focus:ring-2 ${
                      actionData?.errors?.firstName
                        ? "border-red-300 focus:ring-red-500/20 focus:border-red-500"
                        : "border-gray-200 focus:ring-[#E6600D]/20 focus:border-[#E6600D]"
                    }`}
                    placeholder="Ej: Juan"
                  />
                  {actionData?.errors?.firstName && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <span>⚠️</span> {actionData.errors.firstName}
                    </p>
                  )}
                </div>

                {/* Apellido */}
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Apellido *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className={`w-full px-4 py-3 rounded-xl bg-white border-2 transition-all focus:outline-none focus:ring-2 ${
                      actionData?.errors?.lastName
                        ? "border-red-300 focus:ring-red-500/20 focus:border-red-500"
                        : "border-gray-200 focus:ring-[#E6600D]/20 focus:border-[#E6600D]"
                    }`}
                    placeholder="Ej: Pérez"
                  />
                  {actionData?.errors?.lastName && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <span>⚠️</span> {actionData.errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className={`w-full px-4 py-3 rounded-xl bg-white border-2 transition-all focus:outline-none focus:ring-2 ${
                    actionData?.errors?.email
                      ? "border-red-300 focus:ring-red-500/20 focus:border-red-500"
                      : "border-gray-200 focus:ring-[#E6600D]/20 focus:border-[#E6600D]"
                  }`}
                  placeholder="usuario@ejemplo.com"
                />
                {actionData?.errors?.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <span>⚠️</span> {actionData.errors.email}
                  </p>
                )}
              </div>

              {/* Teléfono */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 rounded-xl bg-white border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E6600D]/20 focus:border-[#E6600D] transition-all"
                  placeholder="+57 300 123 4567"
                />
              </div>
            </div>

            {/* Seguridad - Con fondo azul grisáceo suave */}
            <div className="space-y-6 bg-gradient-to-br from-slate-50 to-blue-50/30 p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2 pb-3 border-b-2 border-slate-300">
                <span className="text-xl">🔒</span>
                <h3 className="text-lg font-semibold text-gray-900">Seguridad</h3>
              </div>

              {/* Contraseña */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    className={`w-full px-4 py-3 pr-12 rounded-xl bg-white border-2 transition-all focus:outline-none focus:ring-2 ${
                      actionData?.errors?.password
                        ? "border-red-300 focus:ring-red-500/20 focus:border-red-500"
                        : "border-gray-200 focus:ring-[#E6600D]/20 focus:border-[#E6600D]"
                    }`}
                    placeholder="Mínimo 8 caracteres"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {actionData?.errors?.password && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <span>⚠️</span> {actionData.errors.password}
                  </p>
                )}
                <p className="mt-2 text-xs text-slate-600">
                  La contraseña debe tener al menos 8 caracteres
                </p>
              </div>
            </div>

            {/* Preferencias - Con fondo verde grisáceo suave */}
            <div className="space-y-6 bg-gradient-to-br from-slate-50 to-emerald-50/30 p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2 pb-3 border-b-2 border-slate-300">
                <span className="text-xl">⚙️</span>
                <h3 className="text-lg font-semibold text-gray-900">Preferencias</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Idioma */}
                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                    Idioma
                  </label>
                  <select
                    id="language"
                    name="language"
                    defaultValue="es"
                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E6600D]/20 focus:border-[#E6600D] transition-all"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                    <option value="pt">Português</option>
                  </select>
                </div>

                {/* Zona Horaria */}
                <div>
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-2">
                    Zona Horaria
                  </label>
                  <select
                    id="timezone"
                    name="timezone"
                    defaultValue="America/Bogota"
                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E6600D]/20 focus:border-[#E6600D] transition-all"
                  >
                    <option value="America/Bogota">Bogotá (GMT-5)</option>
                    <option value="America/Mexico_City">Ciudad de México (GMT-6)</option>
                    <option value="America/New_York">Nueva York (GMT-5)</option>
                    <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                    <option value="Europe/Madrid">Madrid (GMT+1)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t-2 border-slate-200">
              <Link
                to="/dashboard/users"
                className="px-6 py-3 rounded-xl text-gray-700 bg-white border-2 border-gray-200 hover:bg-gray-50 transition-all font-medium"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#E6600D] to-[#FF7A2F] text-white font-medium shadow-md hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Creando...</span>
                  </>
                ) : (
                  <>
                    <span>✓</span>
                    <span>Crear Usuario</span>
                  </>
                )}
              </button>
            </div>
          </Form>
        </div>

        {/* Info Card - Con mejor contraste */}
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-xl p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-blue-500 text-xl">💡</span>
            <div>
              <h4 className="font-semibold text-blue-900 text-sm mb-1">
                Información importante
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• El usuario recibirá un email de bienvenida</li>
                <li>• La contraseña debe tener al menos 8 caracteres</li>
                <li>• El email debe ser único en el sistema</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}