import Link from 'next/link';
import { HomeIcon, UserIcon, ChartBarIcon, Cog6ToothIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { auth, signOut } from '@/auth';

export default async function TenantLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                <span className="font-bold text-lg text-zinc-900 dark:text-zinc-100">SiteManager</span>
            </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
            <Link href="/tenant/dashboard" className="flex items-center gap-3 px-4 py-3 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-lg font-medium">
                <HomeIcon className="w-5 h-5" />
                My Sites
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg font-medium transition-colors">
                <UserIcon className="w-5 h-5" />
                Profile
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg font-medium transition-colors">
                <ChartBarIcon className="w-5 h-5" />
                Analytics
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg font-medium transition-colors">
                <Cog6ToothIcon className="w-5 h-5" />
                Settings
            </Link>
        </nav>

        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800">
             <Link href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-500 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 rounded-lg font-medium transition-colors mb-2">
                <QuestionMarkCircleIcon className="w-5 h-5" />
                Support
            </Link>
            
            <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 font-bold text-xs uppercase">
                    {session?.user?.name?.[0] || 'T'}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">{session?.user?.name || 'Tenant User'}</p>
                    <p className="text-xs text-zinc-500 truncate">{session?.user?.email}</p>
                </div>
                 <form action={async () => {
                    'use server';
                    await signOut();
                }}>
                    <button className="text-zinc-400 hover:text-red-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    </button>
                </form>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
