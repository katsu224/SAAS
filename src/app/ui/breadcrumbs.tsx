// src/app/ui/breadcrumbs.tsx
import { clsx } from 'clsx';
import Link from 'next/link';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
  icon?: string; // ¡Añadimos soporte para íconos/emojis!
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Ruta de navegación" className="mb-6 block">
      <ol className="flex flex-wrap items-center text-sm md:text-base font-semibold">
        {breadcrumbs.map((breadcrumb, index) => {
          const isActive = breadcrumb.active;
          
          return (
            <li
              key={breadcrumb.href + index}
              className="flex items-center"
            >
              <Link 
                href={breadcrumb.href}
                aria-current={isActive ? 'page' : undefined}
                className={clsx(
                  'transition-all duration-200 flex items-center gap-1.5 px-3 py-1.5 rounded-md',
                  isActive 
                    ? 'bg-zinc-100 text-zinc-900 cursor-default pointer-events-none' 
                    : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
                )}
              >
                {/* Renderizamos el ícono si existe */}
                {breadcrumb.icon && (
                    <span className="text-lg leading-none">{breadcrumb.icon}</span>
                )}
                {breadcrumb.label}
              </Link>
              
              {index < breadcrumbs.length - 1 ? (
                <span 
                  className="mx-2 text-zinc-300 font-light select-none" 
                  aria-hidden="true" 
                >
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}