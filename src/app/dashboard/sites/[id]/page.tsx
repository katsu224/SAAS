import { getWebsite } from '@/app/lib/actions';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import CreatePageForm from '@/app/ui/sites/create-page-form';
import PagesTable from '@/app/ui/sites/pages-table';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { 
    GlobeAltIcon, 
    InformationCircleIcon, 
    DocumentDuplicateIcon,
    CodeBracketIcon,
    ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';

export default async function WebsiteDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const site = await getWebsite(id);

    if (!site) notFound();

    return (
        <div className="max-w-6xl mx-auto pb-12">
            {/* Breadcrumbs en Español con Emojis */}
            <div className="mb-8">
                 <Breadcrumbs
                    breadcrumbs={[
                        { label: 'Panel Principal', href: '/dashboard', icon: '📊' },
                        { label: 'Sitios Web', href: '/dashboard/sites', icon: '🌐' },
                        { label: site.name, href: `/dashboard/sites/${id}`, active: true, icon: '✨' },
                    ]}
                />
            </div>
            
            {/* Header con Resplandor Magenta */}
            <header className="mb-10 relative bg-white p-8 rounded-2xl shadow-sm border border-zinc-200 overflow-hidden group">
                {/* Elemento decorativo de fondo */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#9D2B48]/10 to-transparent rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="px-2.5 py-1 bg-[#9D2B48]/10 text-[#9D2B48] border border-[#9D2B48]/20 rounded-md text-[10px] font-bold uppercase tracking-widest">
                                Editor de Sitio
                            </span>
                        </div>
                        <h1 className="text-3xl font-bold text-zinc-900 mb-3 tracking-tight">{site.name}</h1>
                        <div className="flex items-center gap-2 text-sm font-medium text-zinc-500">
                            <GlobeAltIcon className="w-4 h-4 text-[#9D2B48]" />
                            <span className="font-mono">{site.base_url || 'URL no configurada'}</span>
                        </div>
                    </div>
                    
                    {/* Botón rápido para ver sitio en vivo */}
                    {site.base_url && (
                        <a 
                            href={site.base_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm font-bold text-zinc-700 hover:bg-zinc-50 hover:border-[#9D2B48]/30 hover:text-[#9D2B48] transition-all shadow-sm group/btn"
                        >
                            Ver Sitio en Vivo
                            <ArrowTopRightOnSquareIcon className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </a>
                    )}
                </div>
            </header>

            {/* Información Técnica del Sitio */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 relative overflow-hidden">
                <div className="flex items-center gap-2 mb-6 border-b border-zinc-50 pb-4">
                    <InformationCircleIcon className="w-5 h-5 text-zinc-400" />
                    <h2 className="text-lg font-bold text-zinc-800">Detalles Técnicos</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <div className="space-y-1">
                        <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">URL de Despliegue</p>
                        <div className="flex items-center gap-2 group">
                             <code className="text-sm font-mono text-[#9D2B48] bg-[#9D2B48]/5 px-2 py-1 rounded">
                                {site.base_url || 'https://default-preview.com'}
                             </code>
                        </div>
                    </div>
                    
                    <div className="space-y-1">
                        <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Código de Seguimiento (SDK)</p>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 font-mono bg-zinc-50 border border-zinc-200 p-2 rounded-lg text-[11px] text-zinc-600 shadow-inner">
                                <CodeBracketIcon className="w-3.5 h-3.5 text-zinc-400" />
                                UA-{site.id.split('-')[0].toUpperCase()}
                            </div>
                            <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase">Beta</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Formulario de Creación de Páginas */}
            <div className="mb-10">
                <CreatePageForm websiteId={id} />
            </div>
            
            {/* Tabla de Páginas Existentes */}
          <section className="space-y-6">
    {/* Cabecera de sección con Badge de conteo para consistencia visual */}
    <div className="flex items-center justify-between px-1 border-b border-zinc-200 pb-4">
        <h2 className="text-xl font-bold text-zinc-800 flex items-center gap-2.5">
            <div className="p-1.5 bg-[#9D2B48]/10 rounded-lg">
                <DocumentDuplicateIcon className="w-5 h-5 text-[#9D2B48]" />
            </div>
            Páginas del Proyecto
        </h2>
        {/* Este badge mantiene la coherencia con las otras vistas de administración */}
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-zinc-100 border border-zinc-200 px-2.5 py-1 rounded-md shadow-sm">
            Listado Oficial
        </span>
    </div>

    <Suspense fallback={
        <div className="space-y-3">
            {/* Skeletons mejorados: ahora imitan mejor las filas de la tabla real */}
            {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between h-16 w-full bg-white rounded-xl border border-zinc-100 px-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 bg-zinc-100 rounded-lg animate-pulse"></div>
                        <div className="h-4 w-32 bg-zinc-100 rounded animate-pulse"></div>
                    </div>
                    <div className="h-4 w-20 bg-zinc-50 rounded animate-pulse"></div>
                </div>
            ))}
        </div>
    }>
        <PagesTable websiteId={id} />
    </Suspense>
</section>
        </div>
    );
}