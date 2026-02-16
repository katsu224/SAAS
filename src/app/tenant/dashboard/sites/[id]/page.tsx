import { getPages, getWebsite } from '@/app/lib/actions';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
    DocumentTextIcon, 
    GlobeAltIcon, 
    ArrowRightIcon,
    CodeBracketSquareIcon 
} from '@heroicons/react/24/outline';

export default async function TenantWebsiteDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const site = await getWebsite(id);
    
    if (!site) notFound();

    const pages = await getPages(id); // Reuse existing action

    return (
        <div className="max-w-5xl mx-auto pb-12">
            {/* Breadcrumbs con emojis */}
            <div className="mb-6">
                 <Breadcrumbs
                    breadcrumbs={[
                        { label: 'Mis Sitios', href: '/tenant/dashboard', icon: '🏠' },
                        { label: site.name, href: `/tenant/dashboard/sites/${id}`, active: true, icon: '🌐' },
                    ]}
                />
            </div>
            
            {/* Header Rediseñado con más detalle visual */}
            <header className="mb-10 relative bg-white p-8 rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
                {/* Elemento decorativo de fondo */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#9D2B48]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                
                <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 rounded-md text-[10px] font-bold uppercase tracking-widest shadow-sm">
                                Activo
                            </span>
                            <span className="text-xs font-mono text-zinc-400">ID: {site.id.split('-')[0]}</span>
                        </div>
                        <h1 className="text-3xl font-bold text-zinc-900 mb-3 tracking-tight">
                            {site.name}
                        </h1>
                        <div className="flex items-center gap-2 text-[14px] font-medium text-zinc-600">
                            <GlobeAltIcon className="w-4 h-4 text-[#9D2B48]" />
                            {site.base_url ? (
                                <a href={`https://${site.base_url}`} target="_blank" rel="noreferrer" className="hover:text-[#9D2B48] hover:underline transition-colors flex items-center gap-1">
                                    {site.base_url}
                                    <svg className="w-3 h-3 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                </a>
                            ) : (
                                <span className="italic text-zinc-400">Sin URL asignada</span>
                            )}
                        </div>
                    </div>
                    
                    {/* Tarjeta de resumen a la derecha */}
                    <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 flex items-center gap-4 min-w-[200px]">
                        <div className="w-12 h-12 bg-white rounded-lg shadow-sm border border-zinc-200 flex items-center justify-center text-[#9D2B48]">
                            <DocumentTextIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-0.5">Total Páginas</p>
                            <p className="text-2xl font-black text-zinc-800 leading-none">{pages.length}</p>
                        </div>
                    </div>
                </div>
            </header>

            <main>
                <div className="flex items-center justify-between mb-6 px-1 border-b border-zinc-200 pb-4">
                    <h2 className="text-xl font-bold text-zinc-800 flex items-center gap-2.5">
                        <div className="p-1.5 bg-[#9D2B48]/10 rounded-lg">
                            <CodeBracketSquareIcon className="w-5 h-5 text-[#9D2B48]" />
                        </div>
                        Páginas del Sitio
                    </h2>
                </div>

                {pages.length === 0 ? (
                    <div className="bg-white p-14 rounded-2xl border-2 border-dashed border-zinc-200 text-center shadow-sm">
                         <div className="w-20 h-20 bg-zinc-50 rounded-full mx-auto flex items-center justify-center mb-5 border border-zinc-100 shadow-inner">
                             <DocumentTextIcon className="w-10 h-10 text-zinc-300" />
                         </div>
                        <h3 className="text-xl font-bold text-zinc-900 mb-3">No hay páginas creadas</h3>
                        <p className="text-zinc-500 max-w-md mx-auto leading-relaxed text-[15px]">
                            Aún no se ha estructurado el contenido de este sitio web. Contacta al administrador para que configure las páginas iniciales.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {pages.map((page: any) => (
                            <Link key={page.id} href={`/tenant/dashboard/sites/${id}/pages/${page.id}`} className="block group">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-5 rounded-xl shadow-sm border border-zinc-200 transition-all duration-300 hover:border-[#9D2B48]/40 hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden">
                                    
                                    {/* Borde izquierdo decorativo en hover */}
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#9D2B48] scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300"></div>
                                    
                                    <div className="flex items-center gap-4 mb-4 sm:mb-0">
                                        <div className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center group-hover:bg-[#9D2B48]/5 transition-colors shrink-0">
                                            <DocumentTextIcon className="w-5 h-5 text-zinc-400 group-hover:text-[#9D2B48]" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-zinc-800 group-hover:text-[#9D2B48] transition-colors mb-1">
                                                {page.title}
                                            </h3>
                                            <p className="text-[13px] text-zinc-500 font-mono flex items-center gap-1.5 bg-zinc-50 px-2 py-0.5 rounded w-fit border border-zinc-100">
                                                <span className="text-zinc-400">/</span>{page.slug}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 sm:ml-4">
                                        {/* Insignia de estado ficticia para dar más vida */}
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 bg-white border border-zinc-200 px-2 py-1 rounded-md shadow-sm">
                                            Borrador
                                        </span>
                                        <div className="flex items-center gap-2 text-sm font-bold text-white bg-[#9D2B48] px-4 py-2 rounded-lg opacity-90 group-hover:opacity-100 group-hover:bg-[#83223b] transition-all shadow-sm">
                                            Editar Bloques 
                                            <ArrowRightIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}