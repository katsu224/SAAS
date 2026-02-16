import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import pool from '@/lib/db';
import bcrypt from 'bcrypt';
import type { User } from 'next-auth';

// Helper: Obtener datos básicos del admin
async function getUser(email: string): Promise<User | undefined> {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM admins WHERE email = $1', [email]);
    client.release();
    
    if (result.rows.length === 0) return undefined;
    
    const dbUser = result.rows[0];
    return {
      id: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
    };
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

// Helper: Obtener el hash del admin
async function getUserPasswordHash(email: string): Promise<string | undefined> {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT password_hash FROM admins WHERE email = $1', [email]);
        return result.rows[0]?.password_hash;
    } finally {
        client.release();
    }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log("🔵 1. INTENTO DE LOGIN RECIBIDO:", credentials?.email, "| Rol enviado:", credentials?.role);

        // 1. Validar formato de los datos con Zod
        const parsedCredentials = z
          .object({ 
            email: z.string().email(), 
            password: z.string().min(6),
            role: z.enum(['admin', 'tenant']).optional().default('admin')
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
            console.log("🔴 2. FALLÓ LA VALIDACIÓN ZOD:", parsedCredentials.error.issues);
            return null;
        }

        const { email, password, role } = parsedCredentials.data;
        console.log(`🔵 3. VALIDACIÓN PASADA. Buscando en BD como: ${role.toUpperCase()}`);
          
        // ==========================================
        // LÓGICA PARA ADMIN
        // ==========================================
        if (role === 'admin') {
            const user = await getUser(email);
            if (!user) {
                console.log("🔴 4. ADMIN NO ENCONTRADO EN LA BD");
                return null;
            }
            
            const passwordHash = await getUserPasswordHash(email);
            if (!passwordHash) {
                console.log("🔴 4.1. ADMIN SIN HASH DE CONTRASEÑA");
                return null;
            }

            const match = await bcrypt.compare(password, passwordHash);
            if (!match) {
                console.log("🔴 5. CONTRASEÑA INCORRECTA PARA ADMIN");
                return null;
            }

            console.log("🟢 6. LOGIN EXITOSO DE ADMIN!");
            return { ...user, role: 'admin' };
        } 
        
        // ==========================================
        // LÓGICA PARA TENANT (CLIENTES)
        // ==========================================
        else {
            const client = await pool.connect();
            try {
                const result = await client.query('SELECT * FROM tenants WHERE email = $1', [email]);
                const tenant = result.rows[0];
                
                if (!tenant) {
                    console.log("🔴 4. TENANT NO ENCONTRADO EN LA BD");
                    return null;
                }
                
                if (tenant.status !== 'active') {
                    console.log(`🔴 5. EL TENANT EXISTE PERO SU ESTADO ES: ${tenant.status}`);
                    return null;
                }

                const match = await bcrypt.compare(password, tenant.password_hash);
                if (!match) {
                    console.log("🔴 6. CONTRASEÑA INCORRECTA PARA TENANT");
                    return null;
                }

                console.log("🟢 7. LOGIN EXITOSO DE TENANT!");
                return {
                    id: tenant.id,
                    name: tenant.name,
                    email: tenant.email,
                    role: 'tenant'
                };
            } finally {
                client.release();
            }
        }
      },
    }),
  ],
});

export const { GET, POST } = handlers;