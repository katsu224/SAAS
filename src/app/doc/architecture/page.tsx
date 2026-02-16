
import { 
    CpuChipIcon, 
    CircleStackIcon, 
    CloudIcon, 
    LockClosedIcon,
    BoltIcon
} from '@heroicons/react/24/outline';

export default function ArchitecturePage() {
    return (
        <article className="prose prose-slate prose-lg max-w-none">
            <header className="mb-12">
                <div className="flex items-center gap-3 text-sm font-bold text-[#9D2B48] uppercase tracking-wider mb-2">
                    <CpuChipIcon className="w-5 h-5" />
                    Ingeniería & Core
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Arquitectura del Sistema</h1>
                <p className="text-xl text-slate-500 leading-relaxed">
                    Un deep-dive técnico sobre cómo está construido el CMS. Stack moderno, desacoplado y diseñado para soportar millones de peticiones.
                </p>
            </header>

            <section id="stack" className="mb-20 scroll-mt-24">
                <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-8 pb-2 border-b border-slate-100">
                    Tech Stack (2025 Standard)
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center text-xs">▲</span>
                            Framework & Runtime
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex justify-between border-b border-slate-50 pb-2">
                                <span className="text-slate-600">Framework</span>
                                <span className="font-mono font-bold text-slate-900">Next.js 15 (App Router)</span>
                            </li>
                            <li className="flex justify-between border-b border-slate-50 pb-2">
                                <span className="text-slate-600">Language</span>
                                <span className="font-mono font-bold text-blue-600">TypeScript 5.x</span>
                            </li>
                            <li className="flex justify-between border-b border-slate-50 pb-2">
                                <span className="text-slate-600">Rendering</span>
                                <span className="font-mono font-bold text-slate-900">RSC + Server Actions</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-slate-600">Styling</span>
                                <span className="font-mono font-bold text-sky-500">Tailwind CSS v4</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <CircleStackIcon className="w-6 h-6 text-[#9D2B48]" />
                            Data & Backend
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex justify-between border-b border-slate-50 pb-2">
                                <span className="text-slate-600">Database</span>
                                <span className="font-mono font-bold text-slate-900">PostgreSQL 16</span>
                            </li>
                            <li className="flex justify-between border-b border-slate-50 pb-2">
                                <span className="text-slate-600">ORM</span>
                                <span className="font-mono font-bold text-green-600">Prisma / Drizzle</span>
                            </li>
                            <li className="flex justify-between border-b border-slate-50 pb-2">
                                <span className="text-slate-600">Auth</span>
                                <span className="font-mono font-bold text-purple-600">Auth.js (NextAuth v5)</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-slate-600">Validations</span>
                                <span className="font-mono font-bold text-slate-900">Zod</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section id="database" className="mb-20 scroll-mt-24">
                <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-8 pb-2 border-b border-slate-100">
                    <CircleStackIcon className="w-8 h-8 text-[#9D2B48]" />
                    Esquema de Base de Datos
                </h2>
                <p className="mb-6 text-slate-600">
                    El modelo de datos es relacional pero flexible. Usamos PostgreSQL con tipos JSONB para almacenar la estructura de bloques, lo que nos da lo mejor de SQL (integridad) y NoSQL (flexibilidad).
                </p>

                <div className="bg-[#1E293B] rounded-2xl overflow-hidden shadow-xl p-8 text-slate-300 font-mono text-xs md:text-sm">
<pre>{`
Table: Tenants (Organizations)
------------------------------
id (PK)       : UUID
name          : String
plan          : Enum (Free, Pro, Enterprise)
owner_id      : User Relation

      | 1
      |
      | N
Table: Websites
------------------------------
id (PK)       : UUID
tenant_id (FK): UUID
domain        : String (Unique)
theme_config  : JSONB (Colors, Fonts)

      | 1
      |
      | N
Table: Pages
------------------------------
id (PK)       : UUID
website_id(FK): UUID
slug          : String
seo_meta      : JSONB

      | 1
      |
      | N
Table: Blocks (The Magic ✨)
------------------------------
id (PK)       : UUID
page_id (FK)  : UUID
type          : String ("hero", "pricing")
content       : JSONB (Actual Data)
config        : JSONB (Styles)
order         : Integer
`}</pre>
                </div>
            </section>

             <section id="features" className="mb-20 scroll-mt-24">
                <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-8 pb-2 border-b border-slate-100">
                    <BoltIcon className="w-8 h-8 text-[#9D2B48]" />
                    Características Clave de Ingeniería
                </h2>
                
                <div className="grid gap-6">
                    <div className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                            <CloudIcon className="w-6 h-6 text-green-700" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-lg">Edge-Ready API</h3>
                            <p className="text-slate-600 text-sm mt-1">
                                Las rutas de la API (`/api/v1/...`) están diseñadas para ejecutarse en el Edge Runtime (Workers), minimizando la latencia global.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
                         <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                            <LockClosedIcon className="w-6 h-6 text-blue-700" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-lg">Row Level Security (Lógica)</h3>
                            <p className="text-slate-600 text-sm mt-1">
                                Aunque la base de datos es compartida, el Middleware y las Server Actions aplican filtros estrictos de `tenant_id` en cada consulta. Fuga de datos imposible.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </article>
    );
}
