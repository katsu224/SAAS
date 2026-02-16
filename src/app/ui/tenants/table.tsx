import { getTenants, toggleTenantStatus } from '@/app/lib/actions';
import { 
    PencilSquareIcon, 
    NoSymbolIcon, 
    CheckCircleIcon,
    UsersIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default async function TenantTable({
  query,
  status,
}: {
  query: string;
  status: string;
}) {
  const tenants = await getTenants(query, status);

  if (tenants.length === 0) {
      return (
          <div className="bg-white p-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mb-4 border border-zinc-100">
                  <UsersIcon className="w-8 h-8 text-zinc-300" />
              </div>
              <p className="text-zinc-900 font-bold text-lg mb-1">No se encontraron clientes</p>
              <p className="text-zinc-500 text-sm">Intenta ajustar tu búsqueda o crea un nuevo cliente.</p>
          </div>
      );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-zinc-50/80 border-y border-zinc-200">
          <tr>
            <th scope="col" className="px-6 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                Cliente
            </th>
            <th scope="col" className="px-6 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                Correo Electrónico
            </th>
            <th scope="col" className="px-6 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                Estado
            </th>
            <th scope="col" className="px-6 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                Fecha de Registro
            </th>
            <th scope="col" className="px-6 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider text-right">
                Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 bg-white">
          {tenants.map((tenant: any) => {
              const isActive = tenant.status === 'active';
              
              return (
                <tr 
                    key={tenant.id} 
                    className="transition-colors hover:bg-zinc-50/50 group"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-4">
                      {/* Avatar del cliente con tu color de marca */}
                      <div className="h-10 w-10 rounded-full bg-[#9D2B48]/10 border border-[#9D2B48]/20 flex items-center justify-center text-[#9D2B48] font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
                        {tenant.name.charAt(0).toUpperCase()}
                      </div>
                      <p className="font-bold text-zinc-900 text-sm">{tenant.name}</p>
                    </div>
                  </td>
                  
                  <td className="whitespace-nowrap px-6 py-4">
                      <span className="text-sm font-medium text-zinc-500">
                          {tenant.email}
                      </span>
                  </td>
                  
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold tracking-wide border shadow-sm ${
                        isActive 
                        ? 'bg-green-50 text-green-700 border-green-200' 
                        : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        {isActive ? 'Activo' : 'Suspendido'}
                    </span>
                  </td>
                  
                  <td className="whitespace-nowrap px-6 py-4">
                      <span className="text-sm text-zinc-500 font-medium bg-zinc-50 px-2.5 py-1 rounded-md border border-zinc-100">
                        {new Date(tenant.created_at).toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                        })}
                      </span>
                  </td>
                  
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                        
                        {/* Botón de Editar */}
                        <Link 
                            href={`/dashboard/tenants/${tenant.id}/settings`}
                            className="p-2 rounded-lg text-zinc-400 hover:text-[#9D2B48] hover:bg-[#9D2B48]/10 transition-all focus:outline-none focus:ring-2 focus:ring-[#9D2B48]/20"
                            title="Editar Cliente"
                        >
                            <PencilSquareIcon className="w-5 h-5 stroke-2" />
                        </Link>
                        
                        {/* Botón de Suspender/Activar */}
                        <form action={toggleTenantStatus.bind(null, tenant.id, tenant.status)}>
                            <button 
                                className={`p-2 rounded-lg transition-all focus:outline-none focus:ring-2 ${
                                    isActive 
                                    ? 'text-zinc-400 hover:text-red-600 hover:bg-red-50 focus:ring-red-200' 
                                    : 'text-zinc-400 hover:text-green-600 hover:bg-green-50 focus:ring-green-200'
                                }`}
                                title={isActive ? 'Suspender Cliente' : 'Activar Cliente'}
                            >
                                {isActive ? (
                                    <NoSymbolIcon className="w-5 h-5 stroke-2" />
                                ) : (
                                    <CheckCircleIcon className="w-5 h-5 stroke-2" />
                                )}
                            </button>
                        </form>
                    </div>
                  </td>
                </tr>
              );
          })}
        </tbody>
      </table>
    </div>
  );
}