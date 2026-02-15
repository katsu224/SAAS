'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserCircleIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const links = [
  { name: 'Settings', href: '/settings', icon: UserCircleIcon },
  { name: 'Websites', href: '/websites', icon: GlobeAltIcon },
];

export default function TenantSidenav({ tenantId }: { tenantId: string }) {
  const pathname = usePathname();

  return (
    <div className="flex w-full flex-col space-y-2 bg-white dark:bg-zinc-950 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
      {links.map((link) => {
        const LinkIcon = link.icon;
        const href = `/dashboard/tenants/${tenantId}${link.href}`;
        return (
          <Link
            key={link.name}
            href={href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 dark:hover:bg-zinc-800 dark:hover:text-blue-400 md:flex-none md:justify-start md:p-2 md:px-3
            ${pathname === href ? 'bg-sky-100 text-blue-600 dark:bg-zinc-800 dark:text-blue-400' : ''}
            `}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
