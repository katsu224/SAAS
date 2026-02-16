import { getTenantAssignedWebsites } from '@/app/lib/actions';
import Link from 'next/link';
import { auth } from '@/auth';
import { PlusIcon, GlobeAltIcon, Cog6ToothIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';

const StatusBadge = ({ status }: { status?: string }) => {
    const s = status || 'draft';
    const styles = {
        published: 'bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]', // Verde
        draft: 'bg-[#E3F2FD] text-[#1565C0] border border-[#BBDEFB]',     // Azul
        maintenance: 'bg-[#FFF9C4] text-[#F57F17] border border-[#FFF59D]' // Amarillo
    };
    return (
        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm ${styles[s as keyof typeof styles] || styles.draft}`}>
            {s}
        </span>
    );
};

export default async function TenantDashboardPage() {
  const session = await auth();
  
  let websites = [];
  if (session?.user?.id) {
    websites = await getTenantAssignedWebsites(session.user.id);
  }

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-8">
        <div>
            <h1 className="text-3xl font-bold text-zinc-900 mb-2 tracking-tight">Your Websites</h1>
            {/* Mejorado el contraste de text-zinc-500 a text-zinc-600 */}
            <p className="text-zinc-600 text-sm">Manage your assigned websites, edit pages, and update content blocks.</p>
        </div>
        <div className="relative group">
            <input 
                type="text" 
                placeholder="Search sites..." 
                className="pl-10 pr-4 py-2.5 border border-zinc-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#9D2B48]/20 focus:border-[#9D2B48] w-full sm:w-72 shadow-sm transition-all outline-none placeholder:text-zinc-400 text-zinc-800"
            />
            <svg className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3 group-focus-within:text-[#9D2B48] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {websites.map((site: any) => (
            <div key={site.id} className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden flex flex-col group hover:shadow-lg hover:border-[#9D2B48]/30 transition-all duration-300">
                {/* Visual Header / Thumbnail Placeholder */}
                <div className="h-44 bg-zinc-50 relative p-4 flex items-start justify-end overflow-hidden border-b border-zinc-100">
                    <StatusBadge status={site.status} />
                    
                    {/* Mock Browser Window Effect */}
                    <div className="absolute -bottom-2 left-6 right-6 bg-white rounded-t-xl shadow-[0_-4px_15px_-3px_rgba(0,0,0,0.05)] p-4 h-32 transform group-hover:-translate-y-2 transition-transform duration-500 border border-zinc-200/60">
                        <div className="flex items-center gap-1.5 mb-3 border-b border-zinc-100 pb-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                        </div>
                        <div className="space-y-2.5 opacity-70">
                             <div className="h-1.5 w-1/3 bg-zinc-200 rounded-full"></div>
                             <div className="h-1.5 w-2/3 bg-zinc-200 rounded-full"></div>
                             {/* Corregido el typo bg-whiterounded */}
                             <div className="h-12 bg-zinc-50 rounded-md mt-4 border border-zinc-100"></div>
                        </div>
                    </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-zinc-900 mb-1 line-clamp-1">{site.name}</h3>
                        <a href={`https://${site.base_url}`} target="_blank" rel="noreferrer" className="text-[13px] text-[#9D2B48] hover:text-[#7A2138] hover:underline font-semibold flex items-center gap-1.5 w-fit transition-colors">
                            {site.base_url || 'No URL assigned'}
                            <GlobeAltIcon className="w-3.5 h-3.5" />
                        </a>
                    </div>
                    
                    <p className="text-[13px] text-zinc-600 mb-6 flex-1 leading-relaxed line-clamp-2">
                        Main content platform for your digital presence. Manage structure and details here.
                    </p>

                    <div className="space-y-2.5 mt-auto">
                        <Link 
                            href={`/tenant/dashboard/sites/${site.id}`}
                            className="w-full py-2.5 px-4 bg-[#9D2B48] hover:bg-[#83223b] text-white rounded-lg font-semibold shadow-sm shadow-[#9D2B48]/20 transition-all flex items-center justify-center gap-2 text-sm group-hover:shadow-md"
                        >
                            <DocumentDuplicateIcon className="w-4 h-4" />
                            Manage Pages
                        </Link>
                        {/* Corregido el typo hover:bg-whitetransition-colors */}
                        <button className="w-full py-2.5 px-4 text-zinc-600 bg-white border border-zinc-200 rounded-lg font-semibold hover:text-zinc-900 hover:bg-zinc-50 hover:border-zinc-300 transition-all flex items-center justify-center gap-2 text-sm">
                             <Cog6ToothIcon className="w-4 h-4" />
                             Site Settings
                        </button>
                    </div>
                </div>
            </div>
        ))}

        {/* Request New Site Placeholder */}
        <button className="border-2 border-dashed border-zinc-300 rounded-2xl flex flex-col items-center justify-center p-8 text-zinc-500 hover:border-[#9D2B48]/60 hover:text-[#9D2B48] hover:bg-[#9D2B48]/5 transition-all min-h-[380px] group bg-white hover:shadow-md">
            {/* Corregido el typo bg-whitegroup-hover */}
            <div className="w-14 h-14 rounded-full bg-zinc-50 group-hover:bg-white flex items-center justify-center mb-5 transition-colors shadow-sm border border-zinc-200 group-hover:border-[#9D2B48]/30">
                <PlusIcon className="w-6 h-6 text-zinc-400 group-hover:text-[#9D2B48]" />
            </div>
            <span className="font-bold text-base mb-1.5 text-zinc-800 group-hover:text-[#9D2B48]">Request New Site</span>
            <span className="text-[13px] text-center max-w-[200px] text-zinc-500 leading-relaxed group-hover:text-[#9D2B48]/70">Contact your administrator to provision a new environment.</span>
        </button>
      </div>
    </div>
  );
}