import { getTenants, toggleTenantStatus } from '@/app/lib/actions';
import { PencilIcon, NoSymbolIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default async function TenantTable({
  query,
  status,
}: {
  query: string;
  status: string;
}) {
  const tenants = await getTenants(query, status);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 dark:bg-zinc-900 p-2 md:pt-0">
          <table className="min-w-full text-gray-900 dark:text-gray-100">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Name</th>
                <th scope="col" className="px-3 py-5 font-medium">Email</th>
                <th scope="col" className="px-3 py-5 font-medium">Status</th>
                <th scope="col" className="px-3 py-5 font-medium">Date</th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-zinc-950">
              {tenants.map((tenant: any) => (
                <tr key={tenant.id} className="w-full border-b py-3 text-sm last-of-type:border-none border-gray-100 dark:border-zinc-800">
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold">
                        {tenant.name[0]}
                      </div>
                      <p>{tenant.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{tenant.email}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        tenant.status === 'active' 
                        ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20' 
                        : 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20'
                    }`}>
                        {tenant.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {new Date(tenant.created_at).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                        <Link 
                            href={`/dashboard/tenants/${tenant.id}/settings`}
                            className="rounded-md border p-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
                        >
                            <PencilIcon className="w-4" />
                        </Link>
                         <form action={toggleTenantStatus.bind(null, tenant.id, tenant.status)}>
                            <button 
                                className={`rounded-md border p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 ${
                                    tenant.status === 'active' ? 'text-red-600' : 'text-green-600'
                                }`}
                                title={tenant.status === 'active' ? 'Suspend Tenant' : 'Activate Tenant'}
                            >
                                {tenant.status === 'active' ? (
                                    <NoSymbolIcon className="w-4" />
                                ) : (
                                    <CheckCircleIcon className="w-4" />
                                )}
                            </button>
                        </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
