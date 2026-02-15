import { getTenantById } from '@/app/lib/actions';
import TenantSidenav from '@/app/ui/tenants/sidenav';
import { notFound } from 'next/navigation';

export default async function Layout({ 
    children,
    params 
}: { 
    children: React.ReactNode;
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const tenant = await getTenantById(id);

    if (!tenant) notFound();

    return (
        <div className="flex h-full flex-col md:flex-row gap-6">
            <div className="w-full flex-none md:w-64">
                <div className="mb-4">
                     <h1 className="text-xl font-bold">{tenant.name}</h1>
                     <p className="text-sm text-zinc-500">{tenant.email}</p>
                </div>
                <TenantSidenav tenantId={id} />
            </div>
            <div className="flex-grow p-0 md:p-6 overflow-y-auto">
                {children}
            </div>
        </div>
    );
}
