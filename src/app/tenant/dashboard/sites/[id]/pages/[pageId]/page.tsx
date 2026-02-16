import { getPageBlocks, getWebsite } from '@/app/lib/actions';
import BuilderWorkspace from '@/app/ui/tenant/builder-workspace';
import { notFound } from 'next/navigation';
import pool from '@/lib/db';

async function getPageById(id: string) {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM pages WHERE id = $1', [id]);
    client.release();
    return result.rows[0];
}

export default async function PageEditor({ params }: { params: Promise<{ id: string, pageId: string }> }) {
    const { id, pageId } = await params;
    const siteId = id; 
    
    const page = await getPageById(pageId);
    if (!page) notFound();

    const website = await getWebsite(siteId);
    const blocks = await getPageBlocks(pageId);
    
    const cleanBaseUrl = (website?.base_url || 'http://localhost:4321').replace(/\/$/, "");
    const cleanSlug = page.slug.startsWith('/') ? page.slug : `/${page.slug}`;
    const secret = process.env.PREVIEW_SECRET || '';
    
    const previewUrl = `${cleanBaseUrl}${cleanSlug}?token=${secret}`;
    return (
        <BuilderWorkspace 
            page={page} 
            blocks={blocks} 
            siteId={siteId} 
            cleanBaseUrl={cleanBaseUrl} 
            cleanSlug={cleanSlug} 
            previewUrl={previewUrl} 
        />
    );
}