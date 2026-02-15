import { getTenantAssignedWebsites } from '@/app/lib/actions';
import Link from 'next/link';
import { auth } from '@/auth';
import { PlusIcon, GlobeAltIcon, Cog6ToothIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';

const StatusBadge = ({ status }: { status?: string }) => {
    const s = status || 'draft';
    const styles = {
        published: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        draft: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        maintenance: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
    };
    return (
        <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${styles[s as keyof typeof styles] || styles.draft}`}>
            {s}
        </span>
    );
};

export default async function TenantDashboardPage() {
  const session = await auth();
  
  let websites = [];
  if (session?.user?.id) {
    websites = await getTenantAssignedWebsites(session.user.id);
  }

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Your Websites</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Manage your assigned websites, edit pages, and update content blocks.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {websites.map((site: any) => (
            <div key={site.id} className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
                {/* Visual Header / Thumbnail Placeholder */}
                <div className="h-40 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center p-6 relative">
                    <StatusBadge status={site.status} />
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                        <GlobeAltIcon className="w-24 h-24 text-indigo-900 dark:text-indigo-400" />
                    </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">{site.name}</h3>
                    <a href={`https://${site.base_url}`} target="_blank" rel="noreferrer" className="text-sm text-red-500 hover:text-red-600 font-medium mb-4 flex items-center gap-1">
                        {site.base_url || 'No URL assigned'}
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                    
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 flex-1">
                        Manage your site features and content pages.
                    </p>

                    <div className="space-y-3">
                        <Link 
                            href={`/tenant/dashboard/sites/${site.id}`}
                            className="block w-full text-center py-2.5 px-4 bg-red-800 hover:bg-red-900 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                            <DocumentDuplicateIcon className="w-4 h-4" />
                            Manage Pages
                        </Link>
                        <button className="block w-full text-center py-2.5 px-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2">
                             <Cog6ToothIcon className="w-4 h-4" />
                             Site Settings
                        </button>
                    </div>
                </div>
            </div>
        ))}

        {/* Request New Site Placeholder */}
        <button className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center p-8 text-zinc-400 hover:border-zinc-300 hover:text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all min-h-[300px]">
            <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                <PlusIcon className="w-6 h-6 text-zinc-500" />
            </div>
            <span className="font-bold text-lg mb-1">Request New Site</span>
            <span className="text-sm text-center max-w-[200px]">Contact your administrator to provision a new website environment.</span>
        </button>
      </div>
    </div>
  );
}
