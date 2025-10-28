import { useState } from 'react';
import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, useActionData, useSearchParams, useNavigation } from "@remix-run/react";
import { signIn } from "~/services/auth.server";
import { createUserSession } from "~/utils/session.server";
import { requireGuest } from "~/utils/guards.server";

/**
 * Loader: Verificar que el usuario no esté autenticado
 */
export async function loader({ request }: LoaderFunctionArgs) {
  await requireGuest(request);
  return json({});
}

/**
 * Action: Procesar el formulario de login
 */
export async function action({ request }: ActionFunctionArgs) {
  await requireGuest(request);

  const formData = await request.formData();
  const identifier = formData.get("identifier");
  const password = formData.get("password");
  const redirectTo = formData.get("redirectTo") || "/dashboard";

  // Validación básica
  if (typeof identifier !== "string" || !identifier) {
    return json(
      { error: "El email o username es requerido" },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || !password) {
    return json(
      { error: "La contraseña es requerida" },
      { status: 400 }
    );
  }

  try {
    // Intentar iniciar sesión
    const { accessToken, user } = await signIn({ identifier, password });

    // Crear sesión en Remix
    return createUserSession({
      request,
      accessToken,
      user,
      redirectTo: typeof redirectTo === "string" ? redirectTo : "/dashboard",
    });
  } catch (error) {
    console.error("Error en login:", error);
    return json(
      { error: error instanceof Error ? error.message : "Error al iniciar sesión" },
      { status: 401 }
    );
  }
}

/**
 * Componente de Login - Estilo iOS 26 Glassmorphism
 */
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const actionData = useActionData<typeof action>();
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Imagen de fondo */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://mediaweb.sfo3.cdn.digitaloceanspaces.com/wallpaper.jpeg)',
        }}
      ></div>
      
      {/* Capa de blur sobre la imagen */}
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      
      {/* Overlay de color naranja con opacidad para mantener identidad de marca */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E6600D]/20 via-orange-500/10 to-amber-500/15"></div>
      
      {/* Elementos decorativos adicionales con blur */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E6600D] rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-400 rounded-full mix-blend-soft-light filter blur-3xl opacity-15 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-amber-400 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>


      {/* Card de Login con Glassmorphism */}
      <div className="relative z-10 w-full max-w-md">
        {/* Efecto glassmorphism mejorado para imagen de fondo */}
        <div className="backdrop-blur-2xl bg-white/50 rounded-3xl shadow-2xl border border-white/60 p-8 md:p-10">
          {/* Icono superior */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#E6600D] to-[#FF7A2F] rounded-2xl shadow-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>

          {/* Título */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Iniciar Sesión
            </h1>
            <p className="text-gray-600 text-sm">
              Accede a tu cuenta para continuar
            </p>
          </div>

          {/* Formulario REMIX */}
          <Form method="post" className="space-y-5">
            <input type="hidden" name="redirectTo" value={redirectTo} />

            {/* Error Message */}
            {actionData?.error && (
              <div className="rounded-2xl bg-red-100/60 backdrop-blur-sm border border-red-200/50 p-4">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm font-medium text-red-800">
                    {actionData.error}
                  </p>
                </div>
              </div>
            )}

            {/* Email o Username Input */}
            <div className="space-y-2">
              <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 ml-1">
                Email o Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input 
                  id="identifier" 
                  name="identifier" 
                  type="text" 
                  autoComplete="username"
                  className="block w-full pl-12 pr-4 py-3.5 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E6600D]/50 focus:border-transparent transition-all text-gray-800"
                  placeholder="Email o Username"
                  disabled={isSubmitting}
                  required
                />
              </div>
            </div>
            
            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 ml-1">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input 
                  id="password" 
                  name="password" 
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className="block w-full pl-12 pr-12 py-3.5 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E6600D]/50 focus:border-transparent transition-all text-gray-800"
                  placeholder="••••••••"
                  disabled={isSubmitting}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isSubmitting}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            {/* Recordar y Olvidar */}
            <div className="flex items-center justify-between text-sm pt-1">
              <div className="flex items-center">
                <input 
                  id="remember-me" 
                  name="remember-me" 
                  type="checkbox" 
                  className="h-4 w-4 text-[#E6600D] focus:ring-[#E6600D] border-gray-300 rounded"
                  disabled={isSubmitting}
                />
                <label htmlFor="remember-me" className="ml-2 block text-gray-700">
                  Recordar sesión
                </label>
              </div>
              <a 
                href="/auth/forgot-password"
                className="font-medium text-[#E6600D] hover:text-[#CC5509] transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            
            {/* Botón de Login con gradiente */}
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 mt-6 bg-gradient-to-r from-[#E6600D] to-[#FF7A2F] text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Iniciando sesión...
                </span>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </Form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300/50"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/40 text-gray-500">O continúa con</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              className="flex justify-center items-center py-3 px-4 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl hover:bg-white/80 transition-all hover:scale-105 active:scale-95"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>
            <button
              type="button"
              className="flex justify-center items-center py-3 px-4 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl hover:bg-white/80 transition-all hover:scale-105 active:scale-95"
            >
              <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
<button
  type="button"
  className="flex justify-center items-center py-3 px-4 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl hover:bg-white/80 transition-all hover:scale-105 active:scale-95"
>
  <svg className="w-5 h-5 text-[#0077B5]" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
</button>
          </div>
          
        </div>
      </div>

      {/* Animaciones CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}} />
    </div>
  );
}