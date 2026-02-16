import { getTenants } from '@/app/lib/actions';
import { 
    UserGroupIcon, 
    ServerIcon, 
    GlobeAltIcon, 
    SparklesIcon 
} from '@heroicons/react/24/outline';

export default async function StatsCards() {
    const tenants = await getTenants();
    const activeTenants = tenants.filter((t: any) => t.status === 'active').length;

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Tarjeta 1: Total Tenants */}
            <div 
                suppressHydrationWarning
                className="group relative bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 transition-all duration-300 hover:shadow-lg hover:border-[#9D2B48]/30 hover:-translate-y-1 overflow-hidden"
            >
                {/* Resplandor decorativo que crece en hover */}
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-[#9D2B48]/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
                
                <div className="relative flex items-center justify-between mb-4">
                    <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                        Total Clientes 👥
                    </h3>
                    <div className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 group-hover:text-[#9D2B48] group-hover:bg-[#9D2B48]/10 group-hover:border-[#9D2B48]/20 transition-all shadow-sm">
                        <UserGroupIcon className="h-5 w-5" />
                    </div>
                </div>
                
                <div className="relative flex items-end gap-2">
                    <p className="text-4xl font-black text-zinc-900 tracking-tight">
                        {tenants.length}
                    </p>
                    <span className="text-sm font-medium text-zinc-400 mb-1">registrados</span>
                </div>
            </div>

            {/* Tarjeta 2: Active Tenants */}
            <div 
                suppressHydrationWarning
                className="group relative bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 transition-all duration-300 hover:shadow-lg hover:border-green-500/30 hover:-translate-y-1 overflow-hidden"
            >
                {/* Resplandor decorativo verde */}
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>

                <div className="relative flex items-center justify-between mb-4">
                    <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                        Activos 🟢
                    </h3>
                    <div className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 group-hover:text-green-600 group-hover:bg-green-50 group-hover:border-green-200 transition-all shadow-sm">
                        <ServerIcon className="h-5 w-5" />
                    </div>
                </div>
                
                <div className="relative flex items-end gap-2">
                    <p className="text-4xl font-black text-zinc-900 tracking-tight">
                        {activeTenants}
                    </p>
                    <span className="text-sm font-medium text-green-600 mb-1 bg-green-50 px-2 py-0.5 rounded-md">
                        Operativos
                    </span>
                </div>
            </div>

            {/* Tarjeta 3: Placeholder (Dominios) */}
            <div 
                className="group relative bg-zinc-50/50 rounded-2xl p-6 shadow-sm border border-zinc-200 border-dashed transition-all duration-300 hover:shadow-md hover:border-zinc-300 hover:-translate-y-1 overflow-hidden"
            >
                <div className="relative flex items-center justify-between mb-4">
                    <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                        Sitios Web 🌐
                    </h3>
                    <div className="w-10 h-10 rounded-full bg-white border border-zinc-100 flex items-center justify-center text-zinc-300 group-hover:text-zinc-500 transition-all shadow-sm">
                        <GlobeAltIcon className="h-5 w-5" />
                    </div>
                </div>
                
                <div className="relative flex items-center gap-2 h-[40px]">
                    <span className="text-xs font-bold text-zinc-400 bg-zinc-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                        <SparklesIcon className="w-4 h-4" />
                        Próximamente
                    </span>
                </div>
            </div>

            {/* Tarjeta 4: Placeholder (Uso de Sistema) */}
            <div 
                className="group relative bg-zinc-50/50 rounded-2xl p-6 shadow-sm border border-zinc-200 border-dashed transition-all duration-300 hover:shadow-md hover:border-zinc-300 hover:-translate-y-1 overflow-hidden"
            >
                <div className="relative flex items-center justify-between mb-4">
                    <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                        Estado del Sistema ⚡
                    </h3>
                    <div className="w-10 h-10 rounded-full bg-white border border-zinc-100 flex items-center justify-center text-zinc-300 group-hover:text-blue-500 transition-all shadow-sm">
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 group-hover:bg-blue-500 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.6)] transition-all"></div>
                    </div>
                </div>
                
                <div className="relative flex items-center gap-2 h-[40px]">
                    <span className="text-xs font-bold text-zinc-400 bg-zinc-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                        <SparklesIcon className="w-4 h-4" />
                        Próximamente
                    </span>
                </div>
            </div>

        </div>
    );
}