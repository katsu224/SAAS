import { getPages } from '@/app/lib/actions';
import { 
    DocumentTextIcon, 
    ArrowRightIcon, 
    ClockIcon,
    HashtagIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default async function PagesTable({ websiteId }: { websiteId: string }) {
    const pages = await getPages(websiteId);

    return (
        <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full text-left border-collapse">
                    <thead className="bg-zinc-50/80 border-b border-zinc-200">
                        <tr>
                            <th scope="col" className="px-6 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                                Título de la Página 📄
                            </th>
                            <th scope="col" className="px-6 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                                Ruta (Slug)
                            </th>
                            <th scope="col" className="px-6 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                                Estado
                            </th>
                            <th scope="col" className="px-6 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                                Fecha de Creación
                            </th>
                            <th scope="col" className="relative px-6 py-4 text-right">
                                <span className="sr-only">Acciones</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 bg-white">
                        {pages.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-12 text-center">
                                    <div className="flex flex-col items-center justify-center">
                                        <DocumentTextIcon className="w-10 h-10 text-zinc-300 mb-3" />
                                        <p className="text-zinc-500 font-medium">Aún no hay páginas creadas.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            pages.map((page: any) => {
                                const isPublished = page.is_published;
                                return (
                                    <tr 
                                        key={page.id} 
                                        className="group relative transition-colors hover:bg-zinc-50/50"
                                    >
                                        {/* Línea decorativa magenta animada */}
                                        
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-zinc-100 rounded-lg group-hover:bg-[#9D2B48]/10 transition-colors">
                                                    <DocumentTextIcon className="w-5 h-5 text-zinc-500 group-hover:text-[#9D2B48] transition-colors" />
                                                </div>
                                                <p className="font-bold text-zinc-900 text-sm">{page.title}</p>
                                            </div>
                                        </td>
                                        
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-[13px] font-mono text-zinc-500 bg-zinc-50 px-2 py-1 rounded border border-zinc-100 w-fit">
                                                <HashtagIcon className="w-3 h-3 text-zinc-300" />
                                                {page.slug}
                                            </div>
                                        </td>
                                        
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide border shadow-sm ${
                                                isPublished 
                                                ? 'bg-green-50 text-green-700 border-green-200' 
                                                : 'bg-amber-50 text-amber-700 border-amber-200'
                                            }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${isPublished ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`}></span>
                                                {isPublished ? 'Publicado' : 'Borrador'}
                                            </span>
                                        </td>
                                        
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="flex items-center gap-2 text-[13px] text-zinc-500 font-medium">
                                                <ClockIcon className="w-4 h-4 text-zinc-300" />
                                                {new Date(page.created_at).toLocaleDateString('es-ES', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </div>
                                        </td>
                                        
                                        <td className="whitespace-nowrap px-6 py-4 text-right">
    {/* Envolvemos el Link en un div flex para forzar el centrado vertical perfecto */}
    <div className="flex items-center justify-end h-full">
        <Link 
            href={`/dashboard/sites/${websiteId}/pages/${page.id}/builder`}
            // 1. Quitamos 'opacity-0' para que sea siempre visible
            // 2. Aseguramos que 'items-center' y 'h-fit' mantengan la línea recta
            className="inline-flex items-center gap-2 text-sm font-bold text-[#9D2B48] transition-all hover:text-[#83223b] group/edit"
        >
            Editar Diseño
            <ArrowRightIcon className="w-4 h-4 transform group-hover/edit:translate-x-1 transition-transform" />
        </Link>
    </div>
</td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}