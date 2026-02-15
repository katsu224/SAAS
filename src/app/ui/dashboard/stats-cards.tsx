import { getTenants } from '@/app/lib/actions';
import { UserGroupIcon, GlobeAltIcon, ServerIcon } from '@heroicons/react/24/outline';

export default async function StatsCards() {
    const tenants = await getTenants();
    const activeTenants = tenants.filter((t: any) => t.status === 'active').length;

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div 
                suppressHydrationWarning
                className="rounded-xl bg-white dark:bg-zinc-950 p-4 shadow-sm border border-zinc-200 dark:border-zinc-800"
            >
                <div className="flex p-4">
                    <UserGroupIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                    <h3 className="ml-2 text-sm font-medium">Total Tenants</h3>
                </div>
                <p className="truncate rounded-xl bg-white dark:bg-zinc-950 px-4 py-8 text-center text-2xl font-bold">
                    {tenants.length}
                </p>
            </div>
            <div 
                suppressHydrationWarning
                className="rounded-xl bg-white dark:bg-zinc-950 p-4 shadow-sm border border-zinc-200 dark:border-zinc-800"
            >
                <div className="flex p-4">
                    <ServerIcon className="h-5 w-5 text-green-700 dark:text-green-200" />
                    <h3 className="ml-2 text-sm font-medium">Active Tenants</h3>
                </div>
                <p className="truncate rounded-xl bg-white dark:bg-zinc-950 px-4 py-8 text-center text-2xl font-bold">
                    {activeTenants}
                </p>
            </div>
             {/* Placeholders for future stats */}
        </div>
    );
}
