'use client';

import { useActionState } from 'react';
import { createAdmin } from '@/app/lib/actions';
import { ShieldExclamationIcon, KeyIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function RegisterAdminPage() {
  const [errorMessage, dispatch, isPending] = useActionState(
    createAdmin,
    undefined,
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
        
        {/* Ícono de Seguridad Restringida */}
        <div className="flex justify-center mb-6">
          <div className="h-14 w-14 bg-red-50 rounded-2xl flex items-center justify-center shadow-sm ring-1 ring-red-100">
            <ShieldExclamationIcon className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <h1 className="text-2xl font-black mb-2 text-center text-gray-900 tracking-tight">
          Registro Administrativo
        </h1>
        
        <div className="mb-8 p-3 bg-orange-50 rounded-xl border border-orange-100 text-center">
          <p className="text-xs text-orange-800 font-medium">
            ⚠️ Zona restringida. Requiere token de autorización del servidor para completar el registro.
          </p>
        </div>

        <form action={dispatch} className="space-y-5">
          <div>
            <label className="block mb-1.5 text-sm font-semibold text-gray-700" htmlFor="name">
              Nombre Completo
            </label>
            <input
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-900 placeholder-gray-400 shadow-sm"
              id="name"
              type="text"
              name="name"
              placeholder="Ej. Juan Pérez"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1.5 text-sm font-semibold text-gray-700" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-900 placeholder-gray-400 shadow-sm"
              id="email"
              type="email"
              name="email"
              placeholder="admin@empresa.com"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1.5 text-sm font-semibold text-gray-700" htmlFor="password">
              Contraseña
            </label>
            <input
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-900 placeholder-gray-400 shadow-sm"
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          {/* EL CAMPO DE SEGURIDAD SECRETO */}
          <div className="pt-2 border-t border-gray-100">
            <label className="block mb-1.5 text-sm font-bold text-red-700" htmlFor="secretToken">
              Token Master
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <KeyIcon className="h-5 w-5 text-red-400" />
              </div>
              <input
                className="w-full pl-11 px-4 py-3 bg-red-50/50 border border-red-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-900 placeholder-red-300 shadow-sm"
                id="secretToken"
                type="password"
                name="secretToken"
                placeholder="Ingresa la clave secreta del servidor"
                required
              />
            </div>
          </div>

          {/* Mensaje de Error */}
          <div className="flex min-h-[1.5rem] items-center" aria-live="polite" aria-atomic="true">
            {errorMessage && (
              <p className="text-sm font-medium text-red-600 flex items-center gap-1 bg-red-50 p-2 rounded-lg w-full border border-red-100">
                <ShieldExclamationIcon className="w-5 h-5 text-red-500" />
                {errorMessage}
              </p>
            )}
          </div>

          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-600/25 transform active:scale-[0.98]"
            disabled={isPending}
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verificando eufórica...
              </span>
            ) : (
              'Autorizar y Crear Admin'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/login" className="text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">
            ¿Ya tienes acceso? Volver al Login
          </Link>
        </div>
      </div>
    </div>
  );
}