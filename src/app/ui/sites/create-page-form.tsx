'use client';

import { createPage } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function CreatePageForm({ websiteId }: { websiteId: string }) {
    const createPageWithId = createPage.bind(null, websiteId);
    const [state, dispatch, isPending] = useActionState(createPageWithId, undefined);

    return (
        <div suppressHydrationWarning className="bg-white dark:bg-zinc-950 p-6 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 mb-6">
            <h2 className="text-lg font-semibold mb-4">Create New Page</h2>
            <form action={dispatch} className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-grow">
                    <label className="block text-sm font-medium mb-1">Page Title</label>
                    <input 
                        name="title" 
                        type="text" 
                        placeholder="About Us"
                        className="w-full p-2 border rounded dark:bg-zinc-900" 
                        required 
                    />
                </div>
                <div className="flex-grow">
                    <label className="block text-sm font-medium mb-1">Slug</label>
                    <input 
                        name="slug" 
                        type="text" 
                        placeholder="/about"
                        className="w-full p-2 border rounded dark:bg-zinc-900" 
                        required 
                    />
                </div>
                <button 
                    disabled={isPending}
                    className="bg-blue-600 text-white px-4 py-2 rounded mb-[2px] hover:bg-blue-700 transition disabled:opacity-50 h-[42px]"
                >
                    {isPending ? 'Creating...' : 'Create Page'}
                </button>
            </form>
            {state && state !== 'Success' && (
                <p className="text-red-500 text-sm mt-2">{state}</p>
            )}
        </div>
    );
}
