'use server';

import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getUsers() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT id, email, name, created_at FROM admins');
    return result.rows;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  } finally {
    client.release();
  }
}

export async function testConnection() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT NOW()');
    revalidatePath('/');
    return { success: true, time: result.rows[0].now };
  } catch (error) {
    console.error('Connection error:', error);
    return { success: false, error: 'Connection failed' };
  } finally {
    client.release();
  }
}
