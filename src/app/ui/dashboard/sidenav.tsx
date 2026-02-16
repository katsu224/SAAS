import Link from 'next/link';
import { PowerIcon, HomeIcon, Square3Stack3DIcon } from '@heroicons/react/24/outline';
import { logOut } from '@/app/lib/actions';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col bg-zinc-50 border-r border-zinc-200">
      
      {/* Área del Logo - Premium y minimalista */}
      <Link
        className="mb-4 flex h-20 items-center justify-start px-6 bg-white border-b border-zinc-200 hover:bg-zinc-50 transition-colors"
        href="/dashboard"
      >
        <div className="flex items-center gap-3 text-zinc-900" suppressHydrationWarning>
           {/* Ícono de la marca en caja magenta con sombra */}
           <div className="w-8 h-8 rounded-lg bg-[#9D2B48] flex items-center justify-center text-white shadow-md shadow-[#9D2B48]/30">
              <Square3Stack3DIcon className="w-5 h-5 stroke-2" />
           </div>
           <span className="text-xl font-black tracking-tight">SiteManager</span>
        </div>
      </Link>

      {/* Área de Enlaces de Navegación */}
      <div className="flex grow flex-row justify-between md:flex-col md:space-y-1 px-4">
        
        {/* Etiqueta de categoría (solo visible en escritorio) */}
        <div className="hidden md:block text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-3 mb-2 mt-4">
            Menú Principal 📌
        </div>

        {/* Enlace Activo (Panel Principal) */}
        <Link
            href="/dashboard"
            className="flex h-[42px] grow items-center justify-center gap-3 rounded-xl bg-[#9D2B48]/10 text-[#9D2B48] font-bold text-sm md:flex-none md:justify-start px-3 transition-colors shadow-sm"
        >
            <HomeIcon className="w-5 h-5 stroke-2" />
            <span className="hidden md:block">Panel Principal</span>
        </Link>

        {/* Espacio para futuros enlaces */}
        {/* <Link href="/otro-link" className="flex h-[42px] grow items-center justify-center gap-3 rounded-xl text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 font-medium text-sm md:flex-none md:justify-start px-3 transition-colors">
            <IconoAca className="w-5 h-5" />
            <span className="hidden md:block">Otro Enlace</span>
        </Link> 
        */}

        {/* Separador invisible para empujar el botón de salir hacia abajo */}
        <div className="hidden h-auto w-full grow md:block"></div>

        {/* Botón de Cerrar Sesión */}
        <form action={logOut} className="pb-4">
          <button className="flex h-[42px] w-full grow items-center justify-center gap-3 rounded-xl text-zinc-500 hover:bg-red-50 hover:text-red-600 font-medium text-sm md:flex-none md:justify-start px-3 transition-colors group">
            <PowerIcon className="w-5 h-5 group-hover:stroke-2" />
            <div className="hidden md:block group-hover:font-bold transition-all">Cerrar Sesión</div>
          </button>
        </form>
      </div>
    </div>
  );
}