import { getTenantById } from '@/app/lib/actions';
import EditTenantForm from '@/app/ui/tenants/edit-form';

import Breadcrumbs from '@/app/ui/breadcrumbs';

export default async function SettingsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const tenant = await getTenantById(id);

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'Tenants', href: '/dashboard' },
                    { label: tenant.name, href: `/dashboard/tenants/${id}/settings` },
                    {
                        label: 'Settings',
                        href: `/dashboard/tenants/${id}/settings`,
                        active: true,
                    },
                ]}
            />
            <EditTenantForm tenant={tenant} />
        </main>
    );
}
