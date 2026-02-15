'use client';

import { updateTenant } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function EditTenantForm({ tenant }: { tenant: any }) {
    const updateTenantWithId = updateTenant.bind(null, tenant.id);
    const [state, dispatch, isPending] = useActionState(updateTenantWithId, undefined);

    return (
        <div className="bg-white dark:bg-zinc-950 p-6 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800">
             <h2 className="text-lg font-semibold mb-6">Personal Information</h2>
            <form action={dispatch} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input 
                        name="name" 
                        defaultValue={tenant.name} 
                        type="text" 
                        className="w-full p-2 border rounded dark:bg-zinc-900" 
                        required 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input 
                        name="email" 
                        defaultValue={tenant.email} 
                        type="email" 
                        className="w-full p-2 border rounded dark:bg-zinc-900" 
                        required 
                    />
                </div>
                
                <hr className="my-6 border-zinc-200 dark:border-zinc-800" />
                
                <div>
                    <label className="block text-sm font-medium mb-1">New Password (Optional)</label>
                    <input 
                        name="password" 
                        type="password" 
                        className="w-full p-2 border rounded dark:bg-zinc-900" 
                        placeholder="Leave blank to keep current"
                        minLength={6}
                    />
                    <p className="text-xs text-zinc-500 mt-1">Min 6 characters.</p>
                </div>

                <div className="flex gap-4 pt-4">
                    <button 
                        disabled={isPending}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {isPending ? 'Updating...' : 'Save Changes'}
                    </button>
                </div>

                {state && state !== 'Success' && (
                    <p className="text-red-500 text-sm mt-2">{state}</p>
                )}
                 {state === 'Success' && (
                    <p className="text-green-500 text-sm mt-2">Tenant updated successfully!</p>
                )}
            </form>
        </div>
    )
}
