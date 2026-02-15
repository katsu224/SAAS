import { getPages } from '@/app/lib/actions'; 
import Link from 'next/link';
import { ChevronRightIcon, DocumentTextIcon, HomeIcon } from '@heroicons/react/24/outline'; // Need to install or likely available

// Helper to check active state would need "use client" or checking params in server component
// Since layout doesn't easily get path segment for active state styling without client hooks, 
// we'll keep it simple or use a client component for the sidebar list.

export default async function SiteDetailsLayout({ 
    children,
    params 
}: { 
    children: React.ReactNode;
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const pages = await getPages(id); // Ensure this action exists and works with site ID

    return (
        <div className="flex h-screen overflow-hidden bg-white dark:bg-zinc-950">
            {/* Left Sidebar: Page List */}
            <aside className="w-72 bg-gray-50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
                <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-2 mb-4 text-sm text-zinc-500">
                         <Link href="/tenant/dashboard" className="hover:text-zinc-800 dark:hover:text-zinc-200 flex items-center gap-1">
                            <HomeIcon className="w-4 h-4" /> Dashboard
                         </Link>
                         <ChevronRightIcon className="w-3 h-3" />
                         <span className="font-semibold text-zinc-800 dark:text-zinc-200">Site Management</span>
                    </div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <DocumentTextIcon className="w-6 h-6 text-purple-600" />
                        Site Pages
                    </h2>
                    <span className="inline-block mt-2 px-2 py-0.5 bg-gray-200 text-gray-700 rounded text-xs font-bold">{pages.length} Pages</span>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {pages.map((page: any) => (
                        <Link 
                            key={page.id} 
                            href={`/tenant/dashboard/sites/${id}/pages/${page.id}`}
                            className="block p-3 rounded-lg border border-transparent hover:bg-white hover:border-zinc-200 hover:shadow-sm transition-all group"
                        >
                            <div className="flex justify-between items-start">
                                <span className="font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-purple-600">{page.title}</span>
                                <span className="text-[10px] uppercase font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded">Published</span>
                            </div>
                            <span className="text-xs text-zinc-400 font-mono mt-1 block">/{page.slug}</span>
                        </Link>
                    ))}
                    
                    {pages.length === 0 && (
                        <div className="text-center p-8 text-zinc-400 italic text-sm">
                            No pages found.
                        </div>
                    )}
                </div>
            </aside>

            {/* Right Content: Editor Area */}
            <main className="flex-1 overflow-y-auto bg-white dark:bg-zinc-950 p-8">
                 {children}
            </main>
        </div>
    );
}
