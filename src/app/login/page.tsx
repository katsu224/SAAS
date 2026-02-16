'use client';

import { useActionState, useState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
 
export default function Page() {
    const searchParams = useSearchParams();
  const [errorMessage, dispatch, isPending] = useActionState(
    authenticate,
    undefined,
  );
  
  const [role, setRole] = useState<'admin' | 'tenant'>('admin');
  
  // Dynamic redirect based on role, defaulting to dashboard paths if no specific callback is set
  const defaultRedirect = role === 'admin' ? '/dashboard' : '/tenant/dashboard';
  // Use search param callback ONLY if it matches the role scope (simple check) or just force dashboard for clarity
  const finalRedirectUrl = defaultRedirect; 

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-white">
      <div className="w-full max-w-sm p-6 bg-white dark:bg-white rounded-lg shadow-md border border-gray-200 dark:border-zinc-800">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
            {role === 'admin' ? 'Admin Login' : 'Tenant Login'}
        </h1>

        {/* Tabs */}
        <div className="flex mb-6 border-b border-gray-200 dark:border-gray-700">
            <button
                className={`flex-1 py-2 text-sm font-medium ${role === 'admin' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setRole('admin')}
                type="button"
            >
                Admin
            </button>
            <button
                className={`flex-1 py-2 text-sm font-medium ${role === 'tenant' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setRole('tenant')}
                type="button"
            >
                Tenant
            </button>
        </div>

        <form action={dispatch} className="space-y-4">
            <input type="hidden" name="redirectTo" value={finalRedirectUrl} />
            <input type="hidden" name="role" value={role} />
          <div>
            <label
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-white dark:border-zinc-700 dark:text-white"
              id="email"
              type="email"
              name="email"
              placeholder={role === 'admin' ? "admin@example.com" : "tenant@example.com"}
              required
            />
          </div>
          <div>
            <label
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-white dark:border-zinc-700 dark:text-white"
              id="password"
              type="password"
              name="password"
              placeholder="••••••"
              required
              minLength={6}
            />
          </div>
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}
          </div>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition disabled:opacity-50"
            aria-disabled={isPending}
            disabled={isPending}
          >
            {isPending ? 'Logging in...' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  );
}
