import { useState } from 'react';
import { Form, json } from '@remix-run/react';

// Esto sería tu routes/login.tsx
export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const rememberMe = formData.get("remember-me");
  
  // Tu lógica de autenticación aquí
  console.log('Login attempt:', { email, password, rememberMe });
  
  // Ejemplo de validación
  if (!email || !password) {
    return json({ error: "Email y contraseña son requeridos" }, { status: 400 });
  }
  
  // Si login exitoso, redirigir
  // return redirect("/videos");
  
  return json({ success: true });
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = () => {
    // Redirigir a OAuth endpoint
    // window.location.href = '/auth/google';
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Panel Izquierdo con Imagen e Info */}
      <div className="hidden lg:flex lg:w-2/2 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 relative overflow-hidden">
        {/* Patrón de fondo sutil */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>
        
        {/* Contenido */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-purple-600 font-bold text-sm">WC</span>
            </div>
            <span className="text-xl font-semibold">Windows Channel</span>
          </div>
          
          {/* Imagen central */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-64 h-64 mx-auto mb-8 bg-white bg-opacity-20 rounded-3xl backdrop-blur-sm flex items-center justify-center">
                <div className="w-48 h-48 bg-white bg-opacity-30 rounded-2xl flex items-center justify-center">
                  <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quote */}
          <div className="space-y-4">
            <blockquote className="text-2xl font-light leading-relaxed">
              "La herramienta perfecta para gestionar todos nuestros contenidos multimedia de forma eficiente."
            </blockquote>
            <div className="space-y-1">
              <div className="font-semibold">María González</div>
              <div className="text-purple-200 text-sm">Directora de Contenidos Digitales</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Panel Derecho con Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-end p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            {/* Logo móvil */}
            <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">WC</span>
              </div>
              <span className="text-2xl font-semibold text-gray-900">Windows Channel</span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900">Bienvenido de vuelta</h1>
            <p className="text-gray-600">
              Gestiona y organiza todos tus contenidos multimedia con nuestra poderosa plataforma.
            </p>
          </div>
          
          {/* Formulario REMIX */}
          <Form method="post" className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                defaultValue="admin@windowschannel.com"
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                placeholder="tu@email.com"
                required
              />
            </div>
            
            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="relative">
                <input 
                  id="password" 
                  name="password" 
                  type={showPassword ? "text" : "password"}
                  className="block w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  placeholder="Tu contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
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
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input 
                  id="remember-me" 
                  name="remember-me" 
                  type="checkbox" 
                  defaultChecked
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Recordar sesión
                </label>
              </div>
              <div className="text-sm">
                <a 
                  href="/forgot-password"
                  className="font-medium text-purple-600 hover:text-purple-500 transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>
            
            {/* Botón de Login */}
            <button 
              type="submit" 
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
            >
              Iniciar Sesión
            </button>
          </Form>
          
          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">O</span>
            </div>
          </div>
          
          {/* Google Button */}
          <button 
            type="button" 
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar con Google
          </button>
          
          {/* Sign up */}
          <div className="text-center">
            <span className="text-sm text-gray-600">
              ¿No tienes una cuenta? 
              <a 
                href="/register"
                className="font-medium text-purple-600 hover:text-purple-500 transition-colors ml-1"
              >
                Regístrate
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}