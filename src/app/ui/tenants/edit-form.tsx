'use client';

import { updateTenant } from '@/app/lib/actions';
import { useActionState } from 'react';
import { 
    UserIcon, 
    EnvelopeIcon, 
    KeyIcon, 
    CheckCircleIcon,
    ExclamationCircleIcon,
    PencilSquareIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function EditTenantForm({ tenant }: { tenant: any }) {
    const updateTenantWithId = updateTenant.bind(null, tenant.id);
    const [state, dispatch, isPending] = useActionState(updateTenantWithId, undefined);

    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200 w-full max-w-2xl transition-all hover:shadow-md">
             
             {/* Encabezado del Formulario */}
             <div className="mb-8 flex items-center gap-4 border-b border-zinc-100 pb-5">
                <div className="w-12 h-12 rounded-xl bg-[#9D2B48]/10 flex items-center justify-center text-[#9D2B48] shadow-sm">
                    <PencilSquareIcon className="w-6 h-6 stroke-2" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
                        Editar Cliente 📝
                    </h2>
                    <p className="text-sm text-zinc-500 font-medium mt-0.5">
                        Actualiza la información y credenciales de este espacio de trabajo.
                    </p>
                </div>
            </div>

            <form action={dispatch} className="space-y-8">
                
                {/* SECCIÓN 1: Información Personal */}
                <div className="space-y-5">
                    <h3 className="text-[13px] font-bold text-zinc-800 uppercase tracking-wider flex items-center gap-2">
                        <UserIcon className="w-4 h-4 text-zinc-400" />
                        Información General
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Campo: Nombre */}
                        <div>
                            <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                                Nombre de la Empresa <span className="text-red-400">*</span>
                            </label>
                            <div className="relative group">
                                <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#9D2B48] transition-colors" />
                                <input 
                                    name="name" 
                                    defaultValue={tenant.name} 
                                    type="text" 
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
                                    defaultValue={tenant.email} 
                                    type="email" 
                                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-800 focus:bg-white focus:ring-2 focus:ring-[#9D2B48]/20 focus:border-[#9D2B48] transition-all shadow-sm placeholder:text-zinc-400 outline-none" 
                                    required 
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* SECCIÓN 2: Seguridad (Enmarcada para resaltar) */}
                <div className="bg-zinc-50 p-5 rounded-xl border border-zinc-200 shadow-sm">
                    <h3 className="text-[13px] font-bold text-zinc-800 uppercase tracking-wider flex items-center gap-2 mb-4">
                        <ShieldCheckIcon className="w-4 h-4 text-zinc-400" />
                        Seguridad 🔒
                    </h3>
                    
                    <div>
                        <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                            Nueva Contraseña <span className="text-zinc-400 normal-case tracking-normal font-medium">(Opcional)</span>
                        </label>
                        <div className="relative group">
                            <KeyIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#9D2B48] transition-colors" />
                            <input 
                                name="password" 
                                type="password" 
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-800 focus:ring-2 focus:ring-[#9D2B48]/20 focus:border-[#9D2B48] transition-all shadow-sm placeholder:text-zinc-400 outline-none" 
                                placeholder="Déjalo en blanco para mantener la actual"
                                minLength={6}
                            />
                        </div>
                        <p className="text-xs text-zinc-500 mt-2 flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-zinc-400"></span>
                            Mínimo 6 caracteres.
                        </p>
                    </div>
                </div>

                {/* Mensajes de Feedback (Animados) */}
                {state && state !== 'Success' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                        <ExclamationCircleIcon className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
                        <div>
                            <p className="text-sm font-bold mb-0.5">No se pudieron guardar los cambios</p>
                            <p className="text-[13px] font-medium opacity-90">{state}</p>
                        </div>
                    </div>
                )}
                
                {state === 'Success' && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3 text-green-700 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                        <CheckCircleIcon className="w-5 h-5 shrink-0 mt-0.5 text-green-600" />
                        <div>
                            <p className="text-sm font-bold mb-0.5">¡Actualización Exitosa!</p>
                            <p className="text-[13px] font-medium opacity-90">Los datos del cliente se han guardado correctamente.</p>
                        </div>
                    </div>
                )}

                {/* Acciones */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100">
                    <button 
                        disabled={isPending}
                        className="h-[42px] px-8 bg-[#9D2B48] hover:bg-[#83223b] text-white font-bold rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                    >
                        {isPending ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Guardando...</span>
                            </>
                        ) : (
                            <span>Guardar Cambios</span>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}