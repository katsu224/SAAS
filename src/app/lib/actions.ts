'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const from = (formData.get('redirectTo') as string) || '/dashboard';
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    
    redirect(from);
  } catch (error) {
    if ((error as any).message === 'NEXT_REDIRECT') {
        throw error;
    }
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

import pool from '@/lib/db';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createAdmin(prevState: string | undefined, formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!name || !email || !password || password.length < 6) {
        return "Invalid fields.";
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const client = await pool.connect();

    try {
        await client.query(
            'INSERT INTO admins (name, email, password_hash) VALUES ($1, $2, $3)',
            [name, email, hashedPassword]
        );
    } catch (error: any) {
        if (error.code === '23505') { // Unique violation
            return "Email already exists.";
        }
        console.error("Create admin error:", error);
        return "Database error.";
    } finally {
        client.release();
    }

    revalidatePath('/');
    redirect('/login?message=AdminCreated');
}

import { signOut } from '@/auth';

export async function getTenants(query: string = '', status: string = '') {
    const client = await pool.connect();
    try {
        let sql = 'SELECT * FROM tenants WHERE (name ILIKE $1 OR email ILIKE $1)';
        const params: any[] = [`%${query}%`];

        if (status) {
            sql += ` AND status = $${params.length + 1}`;
            params.push(status);
        }

        sql += ' ORDER BY created_at DESC';

        const result = await client.query(sql, params);
        return result.rows;
    } finally {
        client.release();
    }
}

export async function createTenant(prevState: string | undefined, formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    if (!name || !email || !password || password.length < 6) return "Invalid fields";

    const hashedPassword = await bcrypt.hash(password, 10);
    const client = await pool.connect();
    try {
        await client.query(
            'INSERT INTO tenants (name, email, password_hash) VALUES ($1, $2, $3)',
            [name, email, hashedPassword]
        );
    } catch (e) {
        return "Error creating tenant";
    } finally {
        client.release();
    }
    revalidatePath('/dashboard');
    return "Success";
}

export async function updateTenant(id: string, prevState: string | undefined, formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    if (!name || !email) return "Invalid fields";

    const client = await pool.connect();
    try {
        if (password && password.length >= 6) {
             const hashedPassword = await bcrypt.hash(password, 10);
             await client.query(
                'UPDATE tenants SET name = $1, email = $2, password_hash = $3 WHERE id = $4',
                [name, email, hashedPassword, id]
            );
        } else {
            await client.query(
                'UPDATE tenants SET name = $1, email = $2 WHERE id = $3',
                [name, email, id]
            );
        }
    } catch (e) {
        return "Error updating tenant";
    } finally {
        client.release();
    }
    revalidatePath('/dashboard');
    revalidatePath(`/dashboard/tenants/${id}`);
    return "Success";
}

export async function getTenantWebsites(tenantId: string) {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM websites WHERE tenant_id = $1 ORDER BY created_at DESC', [tenantId]);
        return result.rows;
    } catch (error) {
        console.error("Error fetching websites:", error);
        return [];
    } finally {
        client.release();
    }
}

export async function createWebsite(tenantId: string, prevState: string | undefined, formData: FormData) {
    const name = formData.get('name') as string;
    const baseUrl = formData.get('base_url') as string;

    if (!name) return "Name is required.";

    const client = await pool.connect();
    try {
        await client.query(
            'INSERT INTO websites (tenant_id, name, base_url, status) VALUES ($1, $2, $3, $4)',
            [tenantId, name, baseUrl, 'draft']
        );
    } catch (e) {
        console.error("Error creating website:", e);
        return "Error creating website.";
    } finally {
        client.release();
    }
    revalidatePath(`/dashboard/tenants/${tenantId}/websites`);
    return "Success";
}

export async function getWebsite(siteId: string) {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM websites WHERE id = $1', [siteId]);
        return result.rows[0];
    } finally {
        client.release();
    }
}

export async function getPages(websiteId: string) {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM pages WHERE website_id = $1 ORDER BY created_at DESC', [websiteId]);
        return result.rows;
    } finally {
        client.release();
    }
}

export async function createPage(websiteId: string, prevState: string | undefined, formData: FormData) {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;

    if (!title || !slug) return "Title and Slug are required.";

    const client = await pool.connect();
    try {
        await client.query(
            'INSERT INTO pages (website_id, title, slug) VALUES ($1, $2, $3)',
            [websiteId, title, slug]
        );
    } catch (e: any) {
        if (e.code === '23505') { // Unique violation
            return "Slug already exists for this website.";
        }
        console.error("Error creating page:", e);
        return "Error creating page.";
    } finally {
        client.release();
    }
    revalidatePath(`/dashboard/sites/${websiteId}`);
    return "Success";
}

export async function savePageBlocks(pageId: string, blocks: any[]) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        // 1. Clear existing blocks for this page (Simplification: Delete all and re-insert)
        // In a production app with content, you'd want to update existing ones to preserve IDs if needed, 
        // but for a schema builder, full replacement is often acceptable or we can refine later.
        await client.query('DELETE FROM blocks WHERE page_id = $1', [pageId]);

        // 2. Insert new blocks
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            await client.query(
                'INSERT INTO blocks (page_id, name, order_index, admin_schema, tenant_content) VALUES ($1, $2, $3, $4, $5)',
                [pageId, block.name, i, JSON.stringify(block.admin_schema), '{}']
            );
        }

        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        console.error("Error saving blocks:", e);
        throw new Error("Failed to save blocks");
    } finally {
        client.release();
    }
    revalidatePath(`/dashboard/sites/${pageId}/builder`); // Adjust path if needed
}

export async function getPageBlocks(pageId: string) {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM blocks WHERE page_id = $1 ORDER BY order_index ASC', [pageId]);
        return result.rows;
    } finally {
        client.release();
    }
}

export async function getTenantAssignedWebsites(tenantId: string) {
    console.log('getTenantAssignedWebsites called with:', tenantId); // DEBUG
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM websites WHERE tenant_id = $1 ORDER BY created_at DESC', [tenantId]);
        console.log('getTenantAssignedWebsites result:', result.rows); // DEBUG
        return result.rows;
    } finally {
        client.release();
    }
}

export async function updateBlockContent(blockId: string, content: any, pageId: string) {
    const client = await pool.connect();
    try {
        await client.query(
            'UPDATE blocks SET tenant_content = $1 WHERE id = $2',
            [JSON.stringify(content), blockId]
        );
    } catch (error) {
        console.error("Error updating block content:", error);
        throw new Error("Failed to update content");
    } finally {
        client.release();
    }
    // Revalidate the page so the form updates if needed, though state handles it locally mostly
    revalidatePath(`/tenant/dashboard/sites/${pageId}/pages/${pageId}`); 
}

export async function toggleTenantStatus(id: string, currentStatus: string) {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    const client = await pool.connect();
    try {
        await client.query(
            'UPDATE tenants SET status = $1 WHERE id = $2',
            [newStatus, id]
        );
    } finally {
        client.release();
    }
    revalidatePath('/dashboard');
}

export async function getTenantById(id: string) {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM tenants WHERE id = $1', [id]);
        return result.rows[0];
    } finally {
        client.release();
    }
}

export async function logOut() {
    await signOut({ redirectTo: '/login' });
}
