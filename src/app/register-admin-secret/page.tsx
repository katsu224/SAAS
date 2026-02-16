'use client';

import { useActionState } from 'react';
import { createAdmin } from '@/app/lib/actions';

export default function RegisterAdminPage() {
  const [errorMessage, dispatch, isPending] = useActionState(
    createAdmin,
    undefined,
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-whitedark:bg-white">
      <div className="w-full max-w-sm p-8 bg-white dark:bg-white rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-800">
        <h1 className="text-2xl font-bold mb-6 text-center text-red-600">
          Secret Admin Registration
        </h1>
        <p className="mb-4 text-sm text-center text-zinc-500">
            This route should be protected or disabled in production if not needed.
        </p>
        <form action={dispatch} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md dark:bg-white"
              id="name"
              type="text"
              name="name"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md dark:bg-white"
              id="email"
              type="email"
              name="email"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md dark:bg-white"
              id="password"
              type="password"
              name="password"
              required
              minLength={6}
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition disabled:opacity-50"
            disabled={isPending}
          >
            {isPending ? 'Creating...' : 'Create Admin'}
          </button>
        </form>
        <div className="mt-4 text-center">
            <a href="/login" className="text-sm text-blue-600 hover:underline">
                Already have an account? Log in
            </a>
        </div>
      </div>
    </div>
  );
}
