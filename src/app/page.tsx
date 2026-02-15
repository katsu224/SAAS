import Link from "next/link";
import { auth } from "@/auth";
import { logOut } from "@/app/lib/actions";

export default async function Home() {
  const session = await auth();
  const role = (session?.user as any)?.role;

  return (
    <div 
      suppressHydrationWarning
      className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black text-center px-4"
    >
      <div className="mb-8" suppressHydrationWarning>
         <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
          SAAS CMS <span className="text-blue-600">Pro</span>
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
          The ultimate multi-tenant content management system for your business.
        </p>
      </div>

      <div className="w-full max-w-md space-y-4">
        {session?.user ? (
            <div className="flex flex-col gap-4">
                <div className="p-4 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <p className="text-sm text-zinc-500 mb-2">Logged in as {session.user.email} ({role})</p>
                    <Link 
                    href={role === 'tenant' ? "/tenant/dashboard" : "/dashboard"}
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition text-center"
                    >
                    Go to Dashboard
                    </Link>
                </div>
                
                <form action={logOut}>
                    <button className="w-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition">
                        Sign Out
                    </button>
                </form>
            </div>
        ) : (
            <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/login"
                  className="flex-1 bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-bold py-3 px-6 rounded-lg transition text-center shadow-lg hover:shadow-xl"
                >
                  Iniciar Sesión
                </Link>
                <Link 
                  href="/register-admin-secret"
                  className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-900 dark:text-white font-bold py-3 px-6 rounded-lg transition text-center"
                >
                  Crear Cuenta (Admin)
                </Link>
            </div>
        )}
      </div>
      
      <div className="mt-12 text-sm text-zinc-400">
        <p>Protected by NextAuth.js & PostgreSQL</p>
      </div>
    </div>
  );
}
