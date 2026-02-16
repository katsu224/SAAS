'use client';

import { useActionState, useState, Suspense } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';

// 1. Separamos el formulario en su propio componente
function LoginForm() {
  const searchParams = useSearchParams();
  const [errorMessage, dispatch, isPending] = useActionState(
    authenticate,
    undefined,
  );
  
  const [role, setRole] = useState<'admin' | 'tenant'>('admin');
  
  // Dynamic redirect based on role
  const defaultRedirect = role === 'admin' ? '/dashboard' : '/tenant/dashboard';
  const finalRedirectUrl = defaultRedirect; 

  return (
    // Fondo claro y limpio
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      
      {/* Tarjeta blanca con sombra suave y bordes limpios */}
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
        
        {/* Logo / Ícono con tu color corporativo */}
        <div className="flex justify-center mb-6">
          <div className="h-14 w-14 bg-[#9D2B48]/10 rounded-2xl flex items-center justify-center shadow-sm">
            <svg className="w-8 h-8 text-[#9D2B48]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-black mb-8 text-center text-gray-900 tracking-tight">
          {role === 'admin' ? 'Acceso Administrador' : 'Acceso Inquilino'}
        </h1>

        {/* Tabs Modernos (Tipo Píldora) - Estilo Light */}
        <div className="flex p-1 mb-8 bg-gray-100 rounded-xl shadow-inner">
          <button
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${
              role === 'admin' 
                ? 'bg-white shadow-sm text-[#9D2B48] ring-1 ring-black/5' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setRole('admin')}
            type="button"
          >
            Admin
          </button>
          <button
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${
              role === 'tenant' 
                ? 'bg-white shadow-sm text-[#9D2B48] ring-1 ring-black/5' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setRole('tenant')}
            type="button"
          >
            Tenant
          </button>
        </div>

        <form action={dispatch} className="space-y-5">
          <input type="hidden" name="redirectTo" value={finalRedirectUrl} />
          <input type="hidden" name="role" value={role} />
          
          <div>
            <label className="block mb-1.5 text-sm font-semibold text-gray-700" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9D2B48]/20 focus:border-[#9D2B48] transition-all text-gray-900 placeholder-gray-400 shadow-sm"
              id="email"
              type="email"
              name="email"
              placeholder={role === 'admin' ? "admin@ejemplo.com" : "tenant@ejemplo.com"}
              required
            />
          </div>
          
          <div>
            <label className="block mb-1.5 text-sm font-semibold text-gray-700" htmlFor="password">
              Contraseña
            </label>
            <input
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9D2B48]/20 focus:border-[#9D2B48] transition-all text-gray-900 placeholder-gray-400 shadow-sm"
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          {/* Mensaje de Error */}
          <div className="flex min-h-[1.5rem] items-center" aria-live="polite" aria-atomic="true">
            {errorMessage && (
              <p className="text-sm font-medium text-red-600 flex items-center gap-1 bg-red-50 p-2 rounded-lg w-full border border-red-100">
                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errorMessage}
              </p>
            )}
          </div>

          <button
            className="w-full bg-[#9D2B48] hover:bg-[#85233c] text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#9D2B48]/25 transform active:scale-[0.98] hover:-translate-y-0.5"
            aria-disabled={isPending}
            disabled={isPending}
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Iniciando sesión...
              </span>
            ) : (
              'Ingresar al panel'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

// 2. Exportamos el componente Page envolviendo a LoginForm en <Suspense> para complacer a Vercel
export default function Page() {
  return (
    <Suspense 
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          {/* Spinner de carga claro */}
          <svg className="animate-spin h-8 w-8 text-[#9D2B48]" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}