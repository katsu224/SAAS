import { getWebsite } from '@/app/lib/actions';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import CreatePageForm from '@/app/ui/sites/create-page-form';
import PagesTable from '@/app/ui/sites/pages-table';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function WebsiteDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const site = await getWebsite(id);

    if (!site) notFound();

    return (
        <main>
             <Breadcrumbs
                breadcrumbs={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'Sites', href: '/dashboard/sites' },
                    { label: site.name, href: `/dashboard/sites/${id}`, active: true },
                ]}
            />
            
            <h1 className="text-2xl font-bold mb-4">{site.name}</h1>
            <p className="text-zinc-500 mb-8">{site.base_url}</p>

            <div className="bg-white dark:bg-zinc-950 p-6 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 mb-8">
                <h2 className="text-lg font-semibold mb-4">Website Information</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-zinc-500">Base URL</p>
                        <a href={site.base_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {site.base_url || 'N/A'}
                        </a>
                    </div>
                     <div>
                        <p className="text-zinc-500">Tracking Code (Future)</p>
                        <p className="font-mono bg-gray-100 dark:bg-zinc-900 p-1 rounded inline-block text-xs">UA-XXXXX</p>
                    </div>
                </div>
            </div>

            <CreatePageForm websiteId={id} />
            
            <h2 className="text-lg font-semibold mb-2">Pages</h2>
            <Suspense fallback={<div>Loading Pages...</div>}>
                <PagesTable websiteId={id} />
            </Suspense>
        </main>
    );
}
