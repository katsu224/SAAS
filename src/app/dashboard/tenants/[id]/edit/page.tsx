import { getTenantById } from '@/app/lib/actions';
import EditTenantForm from '@/app/ui/tenants/edit-form';
import { notFound } from 'next/navigation';

export default async function EditTenantPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const tenant = await getTenantById(id);

    if (!tenant) {
        notFound();
    }

    return (
        <main>
            <h1 className="text-2xl font-bold mb-8">Edit Tenant</h1>
            <div className="max-w-xl">
                <EditTenantForm tenant={tenant} />
            </div>
        </main>
    )
}
