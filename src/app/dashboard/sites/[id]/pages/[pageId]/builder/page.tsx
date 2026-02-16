import { getPageBlocks, getWebsite } from '@/app/lib/actions';
import BlockBuilder from '@/app/ui/builder/block-builder';
import { notFound } from 'next/navigation';
import { Block } from '@/app/ui/builder/types';
import pool from '@/lib/db';
import { 
    CommandLineIcon, 
    ArrowLeftIcon, 
    ChevronDownIcon,
    CodeBracketIcon,
    CpuChipIcon
} from '@heroicons/react/24/outline';

async function getPageById(id: string) {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM pages WHERE id = $1', [id]);
    client.release();
    return result.rows[0];
}

export default async function BuilderPage({ params }: { params: Promise<{ id: string, pageId: string }> }) {
    const { id, pageId } = await params;
    const siteId = id;
    
    const page = await getPageById(pageId);
    if (!page) notFound();

    const blocksData = await getPageBlocks(pageId);

    const initialBlocks: Block[] = blocksData.map((b: any) => ({
        id: b.id,
        name: b.name,
        order_index: b.order_index,
        admin_schema: b.admin_schema || [],
        tenant_content: b.tenant_content || {},
    }));

    return (
        <div className="h-screen flex flex-col bg-zinc-50">
            {/* Header del Constructor Premium */}
            <header className="flex-none h-16 border-b border-zinc-200 bg-white px-6 flex justify-between items-center relative z-50 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#9D2B48] flex items-center justify-center text-white shadow-lg shadow-[#9D2B48]/20">
                        <CpuChipIcon className="w-6 h-6" />
                    </div>
                    
                    <div>
                        <h1 className="text-sm font-black text-zinc-900 flex items-center gap-2">
                            Constructor: <span className="text-[#9D2B48]">{page.title}</span>
                        </h1>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-zinc-400 bg-zinc-50 px-1.5 py-0.5 rounded border border-zinc-100">
                                /{page.slug}
                            </span>
                            <span className="text-zinc-300">|</span>
                            
                            {/* Dropdown de Integración API Mejorado */}
                            <details className="relative group">
                                <summary className="cursor-pointer text-[11px] text-[#9D2B48] hover:text-[#83223b] font-bold list-none flex items-center gap-1 transition-colors uppercase tracking-wider">
                                    <CommandLineIcon className="w-3.5 h-3.5" />
                                    Integración API
                                    <ChevronDownIcon className="w-3 h-3 group-open:rotate-180 transition-transform" />
                                </summary>
                                
                                <div className="absolute top-8 left-0 w-[550px] bg-white border border-zinc-200 shadow-2xl rounded-2xl p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
                                            <CodeBracketIcon className="w-4 h-4" />
                                        </div>
                                        <h3 className="font-bold text-sm text-zinc-900">Endpoint para Headless CMS</h3>
                                    </div>

                                    <div className="bg-zinc-900 p-3 rounded-xl text-[11px] font-mono text-blue-300 mb-5 break-all border border-zinc-800 shadow-inner relative group/code">
                                        <span className="text-zinc-500 mr-2">GET</span> 
                                        {`https://api.tu-app.com/v1/delivery/websites/${siteId}/pages/${page.slug}`}
                                    </div>
                                    
                                    <h3 className="font-bold text-xs mb-3 text-zinc-500 uppercase tracking-widest">Ejemplo de implementación (JS)</h3>
                                    <div className="relative group/pre">
                                        <pre className="bg-[#1e1e1e] text-zinc-300 p-4 rounded-xl text-[11px] font-mono overflow-x-auto border border-zinc-800 leading-relaxed">
{`// 1. Obtener contenido dinámico
const res = await fetch('/api/v1/delivery/${siteId}/${page.slug}');
const { data } = await res.json();

// 2. Renderizar bloques en tu frontend
return data.blocks.map(block => (
  <DynamicBlock key={block.id} type={block.name} content={block.content} />
));`}
                                        </pre>
                                    </div>
                                    
                                    <p className="mt-4 text-[11px] text-zinc-400 italic text-center">
                                        Este endpoint devuelve el contenido JSON listo para ser consumido por cualquier cliente.
                                    </p>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>

                {/* Botón de Salida Estilizado */}
                <a 
                    href={`/dashboard/sites/${siteId}`} 
                    className="flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-zinc-900 bg-zinc-50 hover:bg-zinc-100 px-4 py-2 rounded-xl transition-all border border-zinc-200"
                >
                    <ArrowLeftIcon className="w-3.5 h-3.5" />
                    Volver al Sitio
                </a>
            </header>

            {/* Área del Constructor */}
            <main className="flex-grow overflow-hidden relative">
                {/* Un sutil degradado decorativo para que no se vea tan plano */}
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-40"></div>
                
                <div className="relative h-full z-10">
                    <BlockBuilder pageId={pageId} initialBlocks={initialBlocks} />
                </div>
            </main>
        </div>
    );
}