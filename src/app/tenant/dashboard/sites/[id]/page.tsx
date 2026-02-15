import { getPages, getWebsite } from '@/app/lib/actions';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function TenantWebsiteDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const site = await getWebsite(id);
    
    if (!site) notFound();

    const pages = await getPages(id); // Reuse exising action

    return (
        <div className="flex min-h-screen flex-col p-8 bg-zinc-50 dark:bg-zinc-900">
             <Breadcrumbs
                breadcrumbs={[
                    { label: 'My Websites', href: '/tenant/dashboard' },
                    { label: site.name, href: `/tenant/dashboard/sites/${id}`, active: true },
                ]}
            />
            
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{site.name}</h1>
                <p className="text-zinc-500">{site.base_url || 'No URL assigned'}</p>
            </header>

            <main>
                <h2 className="text-xl font-semibold mb-6">Pages</h2>
                 {pages.length === 0 ? (
                    <div className="bg-white dark:bg-zinc-950 p-6 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800">
                        <p className="text-zinc-500">No pages have been created for this website yet.</p>
                    </div>
                 ) : (
                    <div className="space-y-4">
                        {pages.map((page: any) => (
                            <Link key={page.id} href={`/tenant/dashboard/sites/${id}/pages/${page.id}`} className="block group">
                                <div className="flex items-center justify-between bg-white dark:bg-zinc-950 p-4 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 transition-all hover:border-blue-500 hover:shadow-md">
                                    <div>
                                        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600">{page.title}</h3>
                                        <p className="text-sm text-zinc-500">{page.slug}</p>
                                    </div>
                                    <span className="text-sm font-medium text-blue-600 group-hover:underline">Edit Content &rarr;</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                 )}
            </main>
        </div>
    );
}
