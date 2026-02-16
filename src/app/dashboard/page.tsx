import StatsCards from '@/app/ui/dashboard/stats-cards';
import TenantTable from '@/app/ui/tenants/table';
import CreateTenantForm from '@/app/ui/tenants/create-form';
import Search from '@/app/ui/search';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Suspense } from 'react';
import { 
    BuildingOffice2Icon, 
    ChartPieIcon, 
    TableCellsIcon 
} from '@heroicons/react/24/outline';

export default async function DashboardPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  return (
    <div className="max-w-7xl mx-auto pb-12">
      
      {/* Breadcrumbs en Español con Emojis */}
      <div className="mb-6">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Panel Principal', href: '/dashboard', active: true, icon: '📊' },
          ]}
        />
      </div>
      
      {/* Header Premium con Resplandor Decorativo */}
      <header className="mb-10 relative bg-white p-8 rounded-2xl shadow-sm border border-zinc-200 overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 group">
          {/* Resplandor de fondo */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#9D2B48]/10 to-transparent rounded-full blur-3xl -translate-y-1/4 translate-x-1/3 pointer-events-none"></div>
          
          <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 bg-[#9D2B48]/10 text-[#9D2B48] border border-[#9D2B48]/20 rounded-md text-[10px] font-bold uppercase tracking-widest shadow-sm">
                      <BuildingOffice2Icon className="w-3 h-3" />
                      Administración
                  </span>
              </div>
              
              <h1 className="text-3xl font-bold text-zinc-900 mb-3 tracking-tight">
                  Gestión de Tenants 🏢
              </h1>
              
              <p className="text-sm text-zinc-500 max-w-xl leading-relaxed">
                  Supervisa el rendimiento general, administra los espacios de trabajo de tus clientes y gestiona las configuraciones desde este centro de control.
              </p>
          </div>
      </header>

      {/* Sección de Estadísticas con Carga Animada */}
      <section className="mb-10">
          <div className="flex items-center gap-2 mb-5 px-1">
              <div className="p-1.5 bg-[#9D2B48]/10 rounded-lg">
                  <ChartPieIcon className="w-5 h-5 text-[#9D2B48]" />
              </div>
              <h2 className="text-xl font-bold text-zinc-800">Resumen General</h2>
          </div>
          
          <Suspense fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-32 bg-zinc-50 border border-zinc-100 rounded-2xl animate-pulse shadow-sm"></div>
                  ))}
              </div>
          }>
            <StatsCards />
          </Suspense>
      </section>

    {/* Barra de Herramientas (Solo Búsqueda) */}
      <section className="mb-6 bg-white p-4 rounded-2xl shadow-sm border border-zinc-200 flex items-center justify-between relative z-20 transition-all hover:shadow-md">
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-2/5">
            {/* El buscador tiene espacio para respirar */}
            <Search placeholder="🔍 Buscar cliente por nombre o correo..." />
        </div>
        
        {/* Un detalle visual para equilibrar el lado derecho de la barra */}
        <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-4 py-2 bg-zinc-50 rounded-lg border border-zinc-100">
            Filtros rápidos ⚡
        </div>
      </section>

      {/* Sección del Formulario de Creación */}
      {/* Ahora tiene todo el ancho de la pantalla para lucir su diseño de 4 columnas */}
      <section className="mb-8 relative z-10">
        <CreateTenantForm />
      </section>

      {/* Sección de la Tabla */}
      <section className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
          <div className="border-b border-zinc-100 bg-zinc-50/50 p-4 px-6 flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-700 flex items-center gap-2 uppercase tracking-wider">
                  <TableCellsIcon className="w-4 h-4 text-zinc-400" />
                  Directorio de Clientes
              </h3>
          </div>
          
          <Suspense fallback={
              <div className="h-64 flex flex-col items-center justify-center gap-3 bg-zinc-50/30 animate-pulse">
                  <div className="w-10 h-10 border-4 border-zinc-200 border-t-[#9D2B48] rounded-full animate-spin"></div>
                  <p className="text-sm font-medium text-zinc-400">Cargando datos de inquilinos...</p>
              </div>
          }>
             <TenantTable query={query} status="" />
          </Suspense>
      </section>

    </div>
  );
}