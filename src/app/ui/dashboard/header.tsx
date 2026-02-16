import { auth } from '@/auth';

export default async function Header() {
    const session = await auth();
    return (
        <header className="flex items-center justify-end px-6 py-4 bg-white dark:bg-white border-b border-zinc-200 dark:border-zinc-800" suppressHydrationWarning>
            <div className="flex items-center gap-4" suppressHydrationWarning>
                <div className="text-sm text-right" suppressHydrationWarning>
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">{session?.user?.name}</p>
                    <p className="text-zinc-500 text-xs">{session?.user?.email}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold" suppressHydrationWarning>
                    {session?.user?.name?.[0] || 'A'}
                </div>
            </div>
        </header>
    )
}
