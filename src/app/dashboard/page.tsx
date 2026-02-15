import StatsCards from '@/app/ui/dashboard/stats-cards';
import TenantTable from '@/app/ui/tenants/table';
import CreateTenantForm from '@/app/ui/tenants/create-form';
import Search from '@/app/ui/search';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Suspense } from 'react';

export default async function DashboardPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  return (
    <main>
       <Breadcrumbs
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard', active: true },
        ]}
      />
      <h1 className="mb-8 text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Tenant Management
      </h1>
      
      <Suspense fallback={<div>Loading Stats...</div>}>
        <StatsCards />
      </Suspense>

      <div className="mt-8 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search tenants..." />
      </div>

      <div className="mt-4">
        <CreateTenantForm />
      </div>

      <Suspense fallback={<div>Loading Tenants...</div>}>
         <TenantTable query={query} status="" />
      </Suspense>
    </main>
  );
}
