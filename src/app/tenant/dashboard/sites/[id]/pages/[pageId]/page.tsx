import { getPageBlocks, getWebsite } from '@/app/lib/actions';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import ContentForm from '@/app/ui/tenant/content-form';
import { notFound } from 'next/navigation';
import pool from '@/lib/db';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

async function getPageById(id: string) {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM pages WHERE id = $1', [id]);
    client.release();
    return result.rows[0];
}

export default async function PageEditor({ params }: { params: Promise<{ id: string, pageId: string }> }) {
    const { id, pageId } = await params;
    const siteId = id; 
    
    const page = await getPageById(pageId);
    if (!page) notFound();

    const website = await getWebsite(siteId);
    const blocks = await getPageBlocks(pageId);

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-6">
                 <Breadcrumbs
                    breadcrumbs={[
                        { label: 'My Websites', href: '/tenant/dashboard' },
                        { label: website?.name || 'Site', href: `/tenant/dashboard/sites/${siteId}` },
                        { label: page.title, href: `/tenant/dashboard/sites/${siteId}/pages/${pageId}`, active: true },
                    ]}
                />
            </div>
            
            <header className="mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-6">
                <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{page.title}</h1>
                    <span className="px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        Published
                    </span>
                </div>
                 <p className="text-zinc-500 dark:text-zinc-400">Manage the content structure of your website. Select a block below to configure its content.</p>
            </header>

            <main className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                        <PencilSquareIcon className="w-5 h-5" />
                        Editable Blocks
                    </h2>
                </div>

                {blocks.length === 0 ? (
                    <div className="bg-white dark:bg-zinc-950 p-12 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 text-center">
                         <p className="text-zinc-500">The administrator hasn't added any blocks to this page yet.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {blocks.map((block: any) => (
                             <ContentForm key={block.id} pageId={pageId} block={block} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
