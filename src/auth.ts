import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import pool from '@/lib/db';
import bcrypt from 'bcrypt';
import type { User } from 'next-auth';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM admins WHERE email = $1', [email]);
    client.release();
    if (result.rows.length === 0) return undefined;
    
    // Map DB user to NextAuth User
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

// Separate function to get password hash for verification (not exposed in session)
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
        const parsedCredentials = z
          .object({ 
            email: z.string().email(), 
            password: z.string().min(6),
            role: z.enum(['admin', 'tenant']).optional().default('admin')
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password, role } = parsedCredentials.data;
          
          if (role === 'admin') {
            const user = await getUser(email); // Checks admins table
            if (!user) return null;
            const passwordHash = await getUserPasswordHash(email);
            if (!passwordHash) return null;
            if (await bcrypt.compare(password, passwordHash)) return { ...user, role: 'admin' };
          } else {
            // Tenant Logic
            const client = await pool.connect();
            try {
                const result = await client.query('SELECT * FROM tenants WHERE email = $1', [email]);
                const tenant = result.rows[0];
                if (!tenant) return null;
                if (tenant.status !== 'active') return null; // Only active tenants

                if (await bcrypt.compare(password, tenant.password_hash)) {
                    return {
                        id: tenant.id,
                        name: tenant.name,
                        email: tenant.email,
                        role: 'tenant'
                    };
                }
            } finally {
                client.release();
            }
          }
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});

export const { GET, POST } = handlers;
