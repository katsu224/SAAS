import { getTenantWebsites, getTenantById } from '@/app/lib/actions';
import { GlobeAltIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import CreateWebsiteForm from '@/app/ui/websites/create-form';
import Link from 'next/link';

export default async function WebsitesPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const tenant = await getTenantById(id);
    const websites = await getTenantWebsites(id);

    return (
        <div className="space-y-6">
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'Tenants', href: '/dashboard' },
                    { label: tenant.name, href: `/dashboard/tenants/${id}/settings` },
                    {
                        label: 'Websites',
                        href: `/dashboard/tenants/${id}/websites`,
                        active: true,
                    },
                ]}
            />
            
            <CreateWebsiteForm tenantId={id} />

             <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Existing Websites</h2>
            </div>

            {websites.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 border-dashed">
                    <GlobeAltIcon className="mx-auto h-12 w-12 text-zinc-400" />
                    <h3 className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">No websites</h3>
                    <p className="mt-1 text-sm text-zinc-500">This tenant hasn't created any websites yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {websites.map((site: any) => (
                        <div key={site.id} className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white dark:bg-zinc-950 px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                            <div className="flex-shrink-0">
                                <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                                    <GlobeAltIcon className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="min-w-0 flex-1">
                                <Link href={`/dashboard/sites/${site.id}`} className="focus:outline-none">
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{site.name}</p>
                                    <p className="truncate text-sm text-gray-500">{site.base_url || 'No URL assigned'}</p>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
