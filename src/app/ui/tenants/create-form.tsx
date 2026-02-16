'use client';

import { createTenant } from '@/app/lib/actions';
import { useActionState } from 'react';
import { 
    UserIcon, 
    EnvelopeIcon, 
    KeyIcon, 
    PlusIcon,
    ExclamationCircleIcon
} from '@heroicons/react/24/outline';

export default function CreateTenantForm() {
    const [state, dispatch, isPending] = useActionState(createTenant, undefined);

    return (
        <div suppressHydrationWarning className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 w-full transition-all hover:shadow-md">
            
            {/* Encabezado del Formulario */}
            <div className="mb-6 flex items-center gap-3 border-b border-zinc-100 pb-4">
                <div className="w-8 h-8 rounded-full bg-[#9D2B48]/10 flex items-center justify-center text-[#9D2B48]">
                    <PlusIcon className="w-4 h-4 stroke-2" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-zinc-900 tracking-tight flex items-center gap-2">
                        Registrar Nuevo Cliente 🏢
                    </h2>
                    <p className="text-xs text-zinc-500 font-medium mt-0.5">Ingresa los datos para crear un nuevo espacio de trabajo.</p>
                </div>
            </div>
            
            {/* Formulario Inline */}
            <form action={dispatch} className="grid grid-cols-1 md:grid-cols-4 gap-5 items-start">
                
                {/* Campo: Nombre */}
                <div>
                    <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                        Nombre <span className="text-red-400">*</span>
                    </label>
                    <div className="relative group">
                        <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#9D2B48] transition-colors" />
                        <input 
                            name="name" 
                            type="text" 
                            placeholder="Ej. Empresa SAC"
                            className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-800 focus:bg-white focus:ring-2 focus:ring-[#9D2B48]/20 focus:border-[#9D2B48] transition-all shadow-sm placeholder:text-zinc-400 outline-none" 
                            required 
                        />
                    </div>
                </div>
                
                {/* Campo: Email */}
                <div>
                    <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                        Correo Electrónico <span className="text-red-400">*</span>
                    </label>
                    <div className="relative group">
                        <EnvelopeIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#9D2B48] transition-colors" />
                        <input 
                            name="email" 
                            type="email" 
                            placeholder="admin@empresa.com"
                            className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-800 focus:bg-white focus:ring-2 focus:ring-[#9D2B48]/20 focus:border-[#9D2B48] transition-all shadow-sm placeholder:text-zinc-400 outline-none" 
                            required 
                        />
                    </div>
                </div>
                
                {/* Campo: Contraseña */}
                <div>
                    <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                        Contraseña <span className="text-red-400">*</span>
                    </label>
                    <div className="relative group">
                        <KeyIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#9D2B48] transition-colors" />
                        <input 
                            name="password" 
                            type="password" 
                            placeholder="••••••••"
                            className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-800 focus:bg-white focus:ring-2 focus:ring-[#9D2B48]/20 focus:border-[#9D2B48] transition-all shadow-sm placeholder:text-zinc-400 outline-none" 
                            required 
                            minLength={6} 
                        />
                    </div>
                </div>
                
                {/* Botón de Enviar */}
                <div className="flex flex-col justify-end h-full pt-6 md:pt-0">
                    {/* Añadimos un margen superior invisible en pantallas grandes para alinear el botón con los inputs */}
                    <div className="hidden md:block mb-2">
                        <label className="block text-[11px] opacity-0 mb-2">Acción</label>
                    </div>
                    <button 
                        disabled={isPending}
                        className="w-full h-[42px] bg-[#9D2B48] hover:bg-[#83223b] text-white font-bold rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                    >
                        {isPending ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Creando...</span>
                            </>
                        ) : (
                            <>
                                <PlusIcon className="w-4 h-4" />
                                <span>Registrar</span>
                            </>
                        )}
                    </button>
                </div>
            </form>

            {/* Mensaje de Error Atractivo */}
            {state && state !== 'Success' && (
                <div className="mt-5 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-red-700 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                    <ExclamationCircleIcon className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
                    <div>
                        <p className="text-sm font-bold mb-0.5">Error al crear el cliente</p>
                        <p className="text-[13px] font-medium opacity-90">{state}</p>
                    </div>
                </div>
            )}
        </div>
    )
}