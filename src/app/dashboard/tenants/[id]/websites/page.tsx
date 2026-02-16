import { getTenantWebsites, getTenantById } from '@/app/lib/actions';
import { GlobeAltIcon, PencilSquareIcon, WindowIcon } from '@heroicons/react/24/outline';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import CreateWebsiteForm from '@/app/ui/websites/create-form';
import Link from 'next/link';

export default async function WebsitesPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const tenant = await getTenantById(id);
    const websites = await getTenantWebsites(id);

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            
            {/* Breadcrumbs en Español con Emojis */}
            <div className="mb-2">
                <Breadcrumbs
                    breadcrumbs={[
                        { label: 'Panel Principal', href: '/dashboard', icon: '📊' },
                        { label: 'Clientes', href: '/dashboard', icon: '👥' },
                        { label: tenant.name, href: `/dashboard/tenants/${id}/settings`, icon: '🏢' },
                        {
                            label: 'Sitios Web',
                            href: `/dashboard/tenants/${id}/websites`,
                            active: true,
                            icon: '🌐'
                        },
                    ]}
                />
            </div>
            
            {/* Formulario de Creación (El que ya arreglamos) */}
            <CreateWebsiteForm tenantId={id} />

            {/* Sección de Sitios Existentes */}
            <section>
                {/* Cabecera de la Sección */}
                <div className="flex items-center justify-between px-1 mb-6 border-b border-zinc-200 pb-4">
                    <h2 className="text-xl font-bold text-zinc-800 flex items-center gap-2.5">
                        <div className="p-1.5 bg-[#9D2B48]/10 rounded-lg">
                            <GlobeAltIcon className="w-5 h-5 text-[#9D2B48]" />
                        </div>
                        Sitios Web Existentes
                    </h2>
                    <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest bg-zinc-100 border border-zinc-200 px-2.5 py-1 rounded-md shadow-sm">
                        {websites.length} {websites.length === 1 ? 'Sitio' : 'Sitios'}
                    </span>
                </div>

                {/* Lista o Estado Vacío */}
                {websites.length === 0 ? (
                    /* Estado Vacío Premium con Hover */
                    <div className="bg-white p-14 rounded-2xl border-2 border-dashed border-zinc-200 text-center shadow-sm transition-all duration-300 hover:border-[#9D2B48]/40 hover:shadow-lg hover:-translate-y-1 group cursor-default">
                         <div className="w-20 h-20 bg-zinc-50 rounded-full mx-auto flex items-center justify-center mb-5 border border-zinc-100 shadow-inner group-hover:bg-[#9D2B48]/5 group-hover:border-[#9D2B48]/10 transition-colors">
                            <WindowIcon className="w-10 h-10 text-zinc-300 group-hover:text-[#9D2B48]/70 transition-colors" />
                         </div>
                         <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-[#9D2B48] transition-colors">No hay sitios web</h3>
                         <p className="text-zinc-500 max-w-md mx-auto leading-relaxed text-[15px]">
                            Este cliente aún no tiene sitios web asociados. Utiliza el formulario de arriba para crear el primer portal.
                         </p>
                    </div>
                ) : (
                    /* Cuadrícula de Tarjetas con la Línea Animada Magenta */
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {websites.map((site: any) => (
                            <div 
                                key={site.id} 
                                className="group relative flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#9D2B48]/30 overflow-hidden cursor-pointer"
                            >
                                {/* Línea decorativa magenta animada */}
                                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#9D2B48] scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300 z-10 pointer-events-none"></div>
                                
                                {/* Ícono */}
                                <div className="flex-shrink-0 relative z-20">
                                    <div className="h-12 w-12 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 group-hover:bg-[#9D2B48]/10 group-hover:text-[#9D2B48] group-hover:border-[#9D2B48]/20 transition-all shadow-sm">
                                        <GlobeAltIcon className="h-6 w-6 stroke-2" />
                                    </div>
                                </div>
                                
                                {/* Textos y Link */}
                                <div className="min-w-0 flex-1 relative z-20">
                                    <Link href={`/dashboard/sites/${site.id}`} className="focus:outline-none">
                                        <span className="absolute inset-0" aria-hidden="true" />
                                        <p className="text-base font-bold text-zinc-900 group-hover:text-[#9D2B48] transition-colors truncate">
                                            {site.name}
                                        </p>
                                        <p className="truncate text-[13px] font-mono text-zinc-500 mt-0.5 flex items-center gap-1">
                                            {site.base_url ? (
                                                <>
                                                    <span className="text-zinc-400">/</span>
                                                    {site.base_url}
                                                </>
                                            ) : (
                                                <span className="italic">Sin URL asignada</span>
                                            )}
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}