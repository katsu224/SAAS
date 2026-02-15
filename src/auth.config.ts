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
      
      if (isOnDashboard || isOnAdmin) {
        if (isLoggedIn && role === 'admin') return true;
        return false; // Redirect unauthenticated or wrong role
      }
      
      if (isOnTenant) {
        if (isLoggedIn && role === 'tenant') return true;
        return false;
      }

      if (isLoggedIn) {
        // Redirect logged-in users away from login page to their respective dashboards
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
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
