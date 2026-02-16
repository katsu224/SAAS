import Link from "next/link";
import { auth } from "@/auth";
import { logOut } from "@/app/lib/actions";
import { 
  CubeTransparentIcon, 
  BoltIcon, 
  ShieldCheckIcon,
  BookOpenIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

export default async function Home() {
  const session = await auth();
  const role = (session?.user as any)?.role;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col selection:bg-[#9D2B48]/20 selection:text-[#9D2B48]">
      
      {/* NAVEGACIÓN SUPERIOR (Opcional, muy sutil) */}
      <nav className="w-full px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
        <div className="font-black text-xl tracking-tighter text-gray-900">
          SAAS<span className="text-[#9D2B48]">CMS</span>
        </div>
        <Link 
          href="/doc" 
          className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#9D2B48] transition-colors"
        >
          <BookOpenIcon className="w-5 h-5" />
          Documentación
        </Link>
      </nav>

      {/* HERO SECTION */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-20 max-w-7xl mx-auto w-full">
        
        {/* Badge superior */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-[#9D2B48] text-sm font-bold mb-8 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-[#9D2B48] animate-pulse"></span>
          Sistema Headless v1.0
        </div>

        {/* Título Principal */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 text-center mb-6 max-w-4xl">
          El motor de contenido para <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9D2B48] to-[#c73b5f]">
            negocios escalables.
          </span>
        </h1>
        
        {/* Subtítulo */}
        <p className="text-xl text-gray-600 text-center max-w-2xl mb-12 leading-relaxed">
          Un CMS Multi-Tenant diseñado para desarrolladores y agencias. Crea, gestiona y distribuye contenido a cualquier plataforma mediante nuestra API ultra rápida conectada a PostgreSQL.
        </p>

        {/* ACCIONES DE USUARIO (NextAuth Logic) */}
        <div className="w-full max-w-md bg-white p-6 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 relative z-10">
          {session?.user ? (
            <div className="flex flex-col gap-4 text-center">
              <div className="mb-2">
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-3 border-2 border-white shadow-md">
                  <span className="text-2xl font-black text-gray-400">
                    {session.user.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg">¡Hola de nuevo!</h3>
                <p className="text-sm text-gray-500">Conectado como {session.user.email} <span className="uppercase text-xs font-bold text-[#9D2B48] bg-red-50 px-2 py-0.5 rounded-md ml-1">{role}</span></p>
              </div>
              
              <Link 
                href={role === 'tenant' ? "/tenant/dashboard" : "/dashboard"}
                className="group flex items-center justify-center gap-2 w-full bg-[#9D2B48] hover:bg-[#85233c] text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-[#9D2B48]/25"
              >
                Ir al Panel de Control
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <form action={logOut}>
                <button className="w-full text-gray-500 hover:text-red-600 text-sm font-semibold py-2 px-4 rounded-lg transition-colors">
                  Cerrar Sesión
                </button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Link 
                href="/login"
                className="group flex items-center justify-center gap-2 w-full bg-[#9D2B48] hover:bg-[#85233c] text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-[#9D2B48]/25"
              >
                Iniciar Sesión
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/doc"
                className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-bold py-3.5 px-6 rounded-xl transition-colors text-center flex items-center justify-center gap-2"
              >
                <BookOpenIcon className="w-5 h-5 text-gray-500" />
                Explorar Documentación
              </Link>
              
              <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                <Link 
                  href="/register-admin-secret"
                  className="text-xs text-gray-400 hover:text-gray-600 font-medium transition-colors"
                >
                  ¿Eres desarrollador? Crear cuenta Root
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* SECCIÓN DE BENEFICIOS */}
      <section className="w-full bg-white border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Beneficio 1 */}
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-14 w-14 bg-red-50 text-[#9D2B48] rounded-2xl flex items-center justify-center mb-6 shadow-sm ring-1 ring-[#9D2B48]/10">
                <CubeTransparentIcon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Arquitectura Multi-Tenant</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Gestiona múltiples clientes desde un solo panel. Cada inquilino tiene su propia base de datos aislada, garantizando privacidad absoluta y escalabilidad.
              </p>
            </div>

            {/* Beneficio 2 */}
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-14 w-14 bg-red-50 text-[#9D2B48] rounded-2xl flex items-center justify-center mb-6 shadow-sm ring-1 ring-[#9D2B48]/10">
                <BoltIcon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">API-First Ultra Rápida</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Entrega contenido estructurado (JSON) en milisegundos a Astro, Next.js, Flutter o cualquier plataforma que consuma REST. Totalmente desacoplado.
              </p>
            </div>

            {/* Beneficio 3 */}
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-14 w-14 bg-red-50 text-[#9D2B48] rounded-2xl flex items-center justify-center mb-6 shadow-sm ring-1 ring-[#9D2B48]/10">
                <ShieldCheckIcon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Seguridad Empresarial</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Protegido por NextAuth.js, con integración profunda a Supabase (PostgreSQL) y subida de imágenes asegurada por Cloudinary.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-gray-50 py-8 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-400 font-medium">
          Powered by Next.js, PostgreSQL & Tailwind CSS
        </p>
      </footer>

    </div>
  );
}