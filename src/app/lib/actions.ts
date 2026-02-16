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

export async function createAdmin(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const secretToken = formData.get('secretToken') as string; // <-- El token que viene de tu nuevo diseño

  // 1. 🚨 LA BARRERA DE SEGURIDAD 🚨
  const masterToken = process.env.ADMIN_REGISTRATION_SECRET;

  // Si no pusiste la variable en el .env, o si el usuario escribió mal la clave, lo rechazamos
  if (!masterToken || secretToken !== masterToken) {
    return '❌ Token de autorización inválido. Registro denegado.';
  }

  try {
    // 2. Encriptamos la contraseña para mayor seguridad
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insertamos en Supabase (asegurándonos de usar la tabla 'admins' en minúsculas)
    await pool.query(
      `INSERT INTO admins (name, email, password_hash) VALUES ($1, $2, $3)`,
      [name, email, hashedPassword]
    );

  } catch (error: any) {
    // 4. Capturamos el error específico de Postgres si el email ya existe
    if (error.code === '23505') { 
      return 'Ese correo electrónico ya está registrado.';
    }
    console.error('Error al crear admin en Supabase:', error);
    return 'Error interno del servidor.';
  }

  // 5. Si pasamos todas las validaciones y se guardó, lo mandamos al login
  redirect('/login');
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
        await client.query('BEGIN'); // Iniciamos transacción segura
        
        // 1. Obtener los IDs de los bloques que ya existen en la BD para esta página
        const existingRes = await client.query('SELECT id FROM blocks WHERE page_id = $1', [pageId]);
        const existingIds = existingRes.rows.map(row => row.id);
        
        // 2. Extraer los IDs de los bloques que vienen desde el frontend (el estado actual del builder)
        const incomingIds = blocks.map(b => b.id);

        // 3. BORRAR: Si un bloque estaba en la BD pero ya no viene del frontend (porque el Admin lo eliminó), lo borramos de verdad
        const idsToDelete = existingIds.filter(id => !incomingIds.includes(id));
        if (idsToDelete.length > 0) {
            await client.query('DELETE FROM blocks WHERE id = ANY($1::uuid[])', [idsToDelete]);
        }

        // 4. ACTUALIZAR o INSERTAR (Upsert seguro)
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            
            if (existingIds.includes(block.id)) {
                // SI EL BLOQUE YA EXISTÍA: Actualizamos nombre, orden y esquema. 
                // 🛑 ¡NO TOCAMOS tenant_content PARA NO BORRAR LOS DATOS DEL CLIENTE!
                await client.query(`
                    UPDATE blocks 
                    SET name = $1, order_index = $2, admin_schema = $3
                    WHERE id = $4
                `, [block.name, i, JSON.stringify(block.admin_schema), block.id]);
            } else {
                // SI ES UN BLOQUE NUEVO: Lo insertamos completo, inicializando el contenido vacío '{}'
                await client.query(`
                    INSERT INTO blocks (id, page_id, name, order_index, admin_schema, tenant_content)
                    VALUES ($1, $2, $3, $4, $5, '{}')
                `, [block.id, pageId, block.name, i, JSON.stringify(block.admin_schema)]);
            }
        }

        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        console.error("Error saving blocks:", e);
        throw new Error("Failed to save blocks");
    } finally {
        client.release();
    }
    
    // Revalidar para que los cambios se reflejen inmediatamente
    revalidatePath(`/dashboard/sites/${pageId}/builder`); 
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

export async function updateBlockDraft(blockId: string, content: any, pageId: string) {
    const client = await pool.connect();
    try {
        await client.query(
            'UPDATE blocks SET draft_content = $1 WHERE id = $2',
            [JSON.stringify(content), blockId]
        );
    } catch (error) {
        console.error("Error updating block draft:", error);
        throw new Error("Failed to update draft");
    } finally {
        client.release();
    }
    revalidatePath(`/dashboard/sites/${pageId}/builder`);
}

export async function publishBlock(blockId: string, pageId: string) {
    const client = await pool.connect();
    try {
        // Copy draft_content to tenant_content
        await client.query(`
            UPDATE blocks
            SET tenant_content = draft_content
            WHERE id = $1
        `, [blockId]);
    } catch (error) {
        console.error("Error publishing block:", error);
        throw new Error("Failed to publish block");
    } finally {
        client.release();
    }
    revalidatePath(`/dashboard/sites/${pageId}/builder`);
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
