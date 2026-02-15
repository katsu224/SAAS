import { getPages } from '@/app/lib/actions';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default async function PagesTable({ websiteId }: { websiteId: string }) {
    const pages = await getPages(websiteId);

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 dark:bg-zinc-900 p-2 md:pt-0">
                    <table className="min-w-full text-gray-900 dark:text-gray-100">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Page Title</th>
                                <th scope="col" className="px-3 py-5 font-medium">Slug</th>
                                <th scope="col" className="px-3 py-5 font-medium">Status</th>
                                <th scope="col" className="px-3 py-5 font-medium">Created At</th>
                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-zinc-950">
                            {pages.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-zinc-500">
                                        No pages created yet.
                                    </td>
                                </tr>
                            ) : (
                                pages.map((page: any) => (
                                    <tr key={page.id} className="w-full border-b py-3 text-sm last-of-type:border-none border-gray-100 dark:border-zinc-800">
                                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                            <div className="flex items-center gap-3">
                                                <DocumentTextIcon className="w-5 h-5 text-zinc-500" />
                                                <p className="font-medium">{page.title}</p>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3 text-zinc-500">{page.slug}</td>
                                        <td className="whitespace-nowrap px-3 py-3">
                                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                                page.is_published 
                                                ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20' 
                                                : 'bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20'
                                            }`}>
                                                {page.is_published ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3 text-zinc-500">
                                            {new Date(page.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                            <Link 
                                                href={`/dashboard/sites/${websiteId}/pages/${page.id}/builder`}
                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                            >
                                                Edit Layout
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
