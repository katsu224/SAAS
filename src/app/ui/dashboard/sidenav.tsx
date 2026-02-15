import Link from 'next/link';
import { PowerIcon } from '@heroicons/react/24/outline';
import { logOut } from '@/app/lib/actions';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/dashboard"
      >
        <div className="w-32 text-white md:w-40" suppressHydrationWarning>
           <span className="text-2xl font-bold">SiteManager</span>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <Link
            href="/dashboard"
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 dark:bg-zinc-900 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 dark:hover:bg-zinc-800 dark:hover:text-blue-400 md:flex-none md:justify-start md:p-2 md:px-3"
        >
            Dashboard
        </Link>
        {/* Add more links here later */}
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 dark:bg-zinc-900 md:block"></div>
        <form action={logOut}>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 dark:bg-zinc-900 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 dark:hover:bg-zinc-800 dark:hover:text-blue-400 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
