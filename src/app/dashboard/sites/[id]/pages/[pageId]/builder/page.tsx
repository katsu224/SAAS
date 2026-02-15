import { getPageBlocks, getWebsite } from '@/app/lib/actions'; // Need to fetch page details too?
import BlockBuilder from '@/app/ui/builder/block-builder';
import { notFound } from 'next/navigation';
import { Block } from '@/app/ui/builder/types';

// We might need a getPageById action
import pool from '@/lib/db';

async function getPageById(id: string) {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM pages WHERE id = $1', [id]);
    client.release();
    return result.rows[0];
}

export default async function BuilderPage({ params }: { params: Promise<{ id: string, pageId: string }> }) {
    const { id, pageId } = await params;
    const siteId = id;
    
    // Check if page exists
    const page = await getPageById(pageId);
    if (!page) notFound();

    const blocksData = await getPageBlocks(pageId);

    // Transform DB blocks to UI blocks if necessary (e.g. ensuring schema is array)
    const initialBlocks: Block[] = blocksData.map((b: any) => ({
        id: b.id, // Keep UUID from DB
        name: b.name,
        order_index: b.order_index,
        admin_schema: b.admin_schema || [],
        tenant_content: b.tenant_content || {},
    }));

    return (
        <div className="h-screen flex flex-col">
             <header className="flex-none p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-white dark:bg-zinc-950">
                <div>
                     <h1 className="text-xl font-bold">Builder: {page.title}</h1>
                     <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <span>/{page.slug}</span>
                        <span className="text-zinc-300">|</span>
                        <details className="relative group">
                            <summary className="cursor-pointer text-indigo-600 hover:text-indigo-500 font-medium list-none flex items-center gap-1">
                                <span>&lt;/&gt; API Integration</span>
                            </summary>
                            <div className="absolute top-6 left-0 w-[600px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl rounded-lg p-4 z-50">
                                <h3 className="font-bold text-sm mb-2 text-zinc-900 dark:text-zinc-100">Headless API Endpoint</h3>
                                <div className="bg-zinc-100 dark:bg-zinc-950 p-2 rounded text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-4 break-all selection:bg-indigo-100">
                                    GET /api/v1/delivery/websites/{siteId}/pages/{page.slug}
                                </div>
                                
                                <h3 className="font-bold text-sm mb-2 text-zinc-900 dark:text-zinc-100">Example Usage (JavaScript)</h3>
                                <pre className="bg-zinc-950 text-zinc-100 p-3 rounded text-xs font-mono overflow-x-auto">
{`// Fetch content for this page
const res = await fetch('/api/v1/delivery/websites/${siteId}/pages/${page.slug}');
const { data } = await res.json();

// Render blocks
data.blocks.forEach(block => {
  console.log(block.name, block.content);
});`}
                                </pre>
                            </div>
                        </details>
                     </div>
                </div>
                <a href={`/dashboard/sites/${siteId}`} className="text-sm hover:underline">
                    &larr; Back to Site
                </a>
             </header>
             <div className="flex-grow overflow-hidden">
                <BlockBuilder pageId={pageId} initialBlocks={initialBlocks} />
             </div>
        </div>
    );
}
