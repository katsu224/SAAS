import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = (auth?.user as any)?.role;
      
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard'); // Admin Dashboard
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      const isOnTenant = nextUrl.pathname.startsWith('/tenant');
      
      // Protección de rutas para ADMIN
      if (isOnDashboard || isOnAdmin) {
        if (isLoggedIn && role === 'admin') return true;
        return false; // Redirige al login si no es admin
      }
      
      // Protección de rutas para TENANT (Clientes)
      if (isOnTenant) {
        if (isLoggedIn && role === 'tenant') return true;
        return false;
      }

      // Redirección inteligente si ya están logueados y entran a /login
      if (isLoggedIn) {
        if (nextUrl.pathname === '/login') {
             if (role === 'admin') return Response.redirect(new URL('/dashboard', nextUrl));
             if (role === 'tenant') return Response.redirect(new URL('/tenant/dashboard', nextUrl));
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  providers: [], // Vacío aquí, los providers se inyectan en auth.ts
} satisfies NextAuthConfig;