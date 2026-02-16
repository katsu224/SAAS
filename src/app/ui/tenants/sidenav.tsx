'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserCircleIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const links = [
  { name: 'Configuración', href: '/settings', icon: UserCircleIcon },
  { name: 'Sitios Web', href: '/websites', icon: GlobeAltIcon },
];

export default function TenantSidenav({ tenantId }: { tenantId: string }) {
  const pathname = usePathname();

  return (
    <div className="flex w-full flex-col bg-white p-4 rounded-2xl shadow-sm border border-zinc-200">
      
      {/* Encabezado del sub-menú para dar contexto visual */}
      <div className="mb-3 px-3 pt-2">
         <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
            Menú del Cliente 🏢
         </h3>
      </div>

      <div className="flex flex-col space-y-1.5">
        {links.map((link) => {
          const LinkIcon = link.icon;
          const href = `/dashboard/tenants/${tenantId}${link.href}`;
          
          // Lógica súper limpia para saber si estamos en esta página
          const isActive = pathname === href;

          return (
            <Link
              key={link.name}
              href={href}
              className={`flex h-[42px] items-center gap-3 rounded-xl px-4 text-sm transition-all duration-200 ${
                isActive 
                  ? 'bg-[#9D2B48]/10 text-[#9D2B48] font-bold shadow-sm pointer-events-none' // Estado Activo
                  : 'text-zinc-500 font-medium hover:bg-zinc-50 hover:text-zinc-900' // Estado Inactivo / Hover
              }`}
            >
              {/* El ícono se vuelve un poco más grueso si está activo */}
              <LinkIcon className={`w-5 h-5 ${isActive ? 'stroke-2' : ''}`} />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}