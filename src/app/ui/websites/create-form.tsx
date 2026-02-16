'use client';

import { createWebsite } from '@/app/lib/actions';
import { useActionState } from 'react';
import { 
    GlobeAltIcon, 
    LinkIcon, 
    PlusIcon, 
    ExclamationCircleIcon,
    WindowIcon 
} from '@heroicons/react/24/outline';

export default function CreateWebsiteForm({ tenantId }: { tenantId: string }) {
    const createWebsiteWithId = createWebsite.bind(null, tenantId);
    const [state, dispatch, isPending] = useActionState(createWebsiteWithId, undefined);

    return (
        <div suppressHydrationWarning className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 transition-all hover:shadow-md w-full">
            
            {/* Encabezado del Formulario */}
            <div className="mb-6 flex items-center gap-4 border-b border-zinc-100 pb-5">
                <div className="w-10 h-10 rounded-xl bg-[#9D2B48]/10 flex items-center justify-center text-[#9D2B48] shadow-sm">
                    <WindowIcon className="w-5 h-5 stroke-2" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-zinc-900 tracking-tight">
                        Crear Nuevo Sitio Web 🚀
                    </h2>
                    <p className="text-xs text-zinc-500 font-medium mt-0.5">
                        Añade un nuevo portal o landing page para este cliente.
                    </p>
                </div>
            </div>

            {/* Formulario Inline */}
            <form action={dispatch} className="flex flex-col md:flex-row gap-5 items-start">
                
                {/* Campo: Nombre del Sitio */}
                <div className="w-full md:flex-1">
                    <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                        Nombre del Sitio <span className="text-red-400">*</span>
                    </label>
                    <div className="relative group">
                        <GlobeAltIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#9D2B48] transition-colors" />
                        <input 
                            name="name" 
                            type="text" 
                            placeholder="Ej. Mi Tienda Online"
                            className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-800 focus:bg-white focus:ring-2 focus:ring-[#9D2B48]/20 focus:border-[#9D2B48] transition-all shadow-sm placeholder:text-zinc-400 outline-none" 
                            required 
                        />
                    </div>
                </div>
                
                {/* Campo: URL Base */}
                <div className="w-full md:flex-1">
                    <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                        URL Base <span className="text-zinc-400 normal-case tracking-normal font-medium">(Opcional)</span>
                    </label>
                    <div className="relative group">
                        <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#9D2B48] transition-colors" />
                        <input 
                            name="base_url" 
                            type="text" 
                            placeholder="ejemplo.com"
                            className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-800 focus:bg-white focus:ring-2 focus:ring-[#9D2B48]/20 focus:border-[#9D2B48] transition-all shadow-sm placeholder:text-zinc-400 outline-none" 
                        />
                    </div>
                </div>

                {/* Botón de Enviar */}
                <div className="w-full md:w-auto md:shrink-0 flex flex-col justify-end pt-2 md:pt-0 h-full">
                    {/* Espaciador invisible para alinear el botón con los inputs en pantallas grandes */}
                    <div className="hidden md:block mb-2">
                        <label className="block text-[11px] opacity-0 mb-2">Acción</label>
                    </div>
                    <button 
                        disabled={isPending}
                        className="w-full md:w-auto h-[42px] px-6 bg-[#9D2B48] hover:bg-[#83223b] text-white font-bold rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                    >
                        {isPending ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Creando...</span>
                            </>
                        ) : (
                            <>
                                <PlusIcon className="w-4 h-4 stroke-2" />
                                <span>Crear Sitio Web</span>
                            </>
                        )}
                    </button>
                </div>
            </form>

            {/* Mensaje de Error Animado */}
            {state && state !== 'Success' && (
                <div className="mt-5 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-red-700 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                    <ExclamationCircleIcon className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
                    <div>
                        <p className="text-sm font-bold mb-0.5">Error al crear el sitio</p>
                        <p className="text-[13px] font-medium opacity-90">{state}</p>
                    </div>
                </div>
            )}
        </div>
    );
}