'use client';

import { createWebsite } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function CreateWebsiteForm({ tenantId }: { tenantId: string }) {
    const createWebsiteWithId = createWebsite.bind(null, tenantId);
    const [state, dispatch, isPending] = useActionState(createWebsiteWithId, undefined);

    return (
        <div suppressHydrationWarning className="bg-white dark:bg-zinc-950 p-6 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 mb-6">
            <h2 className="text-lg font-semibold mb-4">Create New Website</h2>
            <form action={dispatch} className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-grow">
                    <label className="block text-sm font-medium mb-1">Website Name</label>
                    <input 
                        name="name" 
                        type="text" 
                        placeholder="My Awesome Site"
                        className="w-full p-2 border rounded dark:bg-zinc-900" 
                        required 
                    />
                </div>
                <div className="flex-grow">
                    <label className="block text-sm font-medium mb-1">Base URL (Optional)</label>
                    <input 
                        name="base_url" 
                        type="text" 
                        placeholder="https://example.com"
                        className="w-full p-2 border rounded dark:bg-zinc-900" 
                    />
                </div>
                <button 
                    disabled={isPending}
                    className="bg-blue-600 text-white px-4 py-2 rounded mb-[2px] hover:bg-blue-700 transition disabled:opacity-50 h-[42px]"
                >
                    {isPending ? 'Creating...' : 'Create Website'}
                </button>
            </form>
            {state && state !== 'Success' && (
                <p className="text-red-500 text-sm mt-2">{state}</p>
            )}
        </div>
    );
}
