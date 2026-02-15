'use client';

import { createTenant } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function CreateTenantForm() {
    const [state, dispatch, isPending] = useActionState(createTenant, undefined);

    return (
        <div suppressHydrationWarning className="bg-white dark:bg-zinc-950 p-6 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 mb-8">
            <h2 className="text-lg font-semibold mb-4">Create New Tenant</h2>
            <form action={dispatch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input name="name" type="text" className="w-full p-2 border rounded dark:bg-zinc-900" required />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input name="email" type="email" className="w-full p-2 border rounded dark:bg-zinc-900" required />
                </div>
                <div>
                     <label className="block text-sm font-medium mb-1">Password</label>
                    <input name="password" type="password" className="w-full p-2 border rounded dark:bg-zinc-900" required minLength={6} />
                </div>
                <button 
                    disabled={isPending}
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {isPending ? 'Creating...' : 'Create Tenant'}
                </button>
            </form>
            {state && state !== 'Success' && (
                <p className="text-red-500 text-sm mt-2">{state}</p>
            )}
        </div>
    )
}
