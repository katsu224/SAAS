
import { 
    RocketLaunchIcon, 
    CpuChipIcon, 
    ShieldCheckIcon,
    BoltIcon,
    ServerStackIcon
} from '@heroicons/react/24/outline';

export default function IntroductionPage() {
    return (
        <article className="prose prose-slate prose-lg max-w-none">
            <div className="mb-16">
                <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-6">Documentación Oficial del CMS Headless</h1>
                <p className="text-2xl text-slate-500 leading-relaxed font-light">
                    Bienvenido a la guía definitiva. Has elegido una arquitectura moderna, desacoplada y diseñada para escalar.
                    Aquí gestionas el contenido puro; la visualización es problema de tu framework (Next.js, Astro, React).
                </p>
                
                <div className="flex gap-4 mt-8">
                    <a href="/doc/integration" className="bg-[#9D2B48] text-white px-6 py-3 rounded-full font-bold hover:bg-[#80223A] transition no-underline">
                        Empezar Integración &rarr;
                    </a>
                    <a href="/doc/modeling" className="bg-white border border-slate-300 text-slate-700 px-6 py-3 rounded-full font-bold hover:bg-slate-50 transition no-underline">
                        Aprender Conceptos
                    </a>
                </div>
            </div>

            <section id="filosofia" className="mb-24 scroll-mt-24">
                <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-8 pb-2 border-b border-slate-100">
                    <RocketLaunchIcon className="w-8 h-8 text-[#9D2B48]" />
                    Filosofía: Simplicidad Radical
                </h2>
                <p className="mb-6">
                    El mundo del CMS se ha dividido en dos extremos: los "Monolitos" pesados y lentos (WordPress, Drupal) y los "Headless" ultra-complejos y caros (Contentful, Sanity).
                </p>
                <p className="mb-8">
                    Nosotros ocupamos un tercer espacio: <strong>Potencia sin Complejidad</strong>.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 my-12">
                    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                         <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                             <ServerStackIcon className="w-32 h-32" />
                         </div>
                         <h3 className="text-2xl font-bold text-slate-900 mb-4">API-First</h3>
                         <p className="text-slate-600">
                             Todo es JSON. No generamos HTML, no inyectamos estilos, no tenemos "temas". Te damos los datos crudos en &lt;100ms para que tú construyas la experiencia perfecta.
                         </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                         <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                             <CpuChipIcon className="w-32 h-32" />
                         </div>
                         <h3 className="text-2xl font-bold text-slate-900 mb-4">Schema-less Flexible</h3>
                         <p className="text-slate-600">
                             Define tus propios bloques (Hero, Slider, Pricing) con JSON Schemas. No necesitas migraciones de base de datos ni desplegar backend para añadir un campo.
                         </p>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200 my-12 shadow-sm">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase tracking-wider font-bold">
                            <tr>
                                <th className="px-6 py-4">Característica</th>
                                <th className="px-6 py-4 text-[#9D2B48]">Nuestro CMS</th>
                                <th className="px-6 py-4 text-slate-400">WordPress</th>
                                <th className="px-6 py-4 text-slate-400">Contentful</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-100">
                            <tr>
                                <td className="px-6 py-4 font-bold text-slate-900">Architecture</td>
                                <td className="px-6 py-4 bg-red-50 text-red-900 font-bold">Headless Nativo</td>
                                <td className="px-6 py-4 text-slate-500">Monolito Acoplado</td>
                                <td className="px-6 py-4 text-slate-500">Headless Nativo</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-bold text-slate-900">Performance</td>
                                <td className="px-6 py-4 bg-red-50 text-red-900 font-bold">Extrema (JSON puro)</td>
                                <td className="px-6 py-4 text-slate-500">Lenta (PHP Render)</td>
                                <td className="px-6 py-4 text-slate-500">Rápida (CDN)</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-bold text-slate-900">Dev Experience</td>
                                <td className="px-6 py-4 bg-red-50 text-red-900 font-bold">React/Vue/Astro friendly</td>
                                <td className="px-6 py-4 text-slate-500">PHP/jQuery/Plugins</td>
                                <td className="px-6 py-4 text-slate-500">Excelente pero complejo</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-bold text-slate-900">Costo</td>
                                <td className="px-6 py-4 bg-red-50 text-red-900 font-bold">Predecible (Flat)</td>
                                <td className="px-6 py-4 text-slate-500">Variable (Hosting+Plugins)</td>
                                <td className="px-6 py-4 text-slate-500">Caro a escala</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

             <section id="arquitectura" className="mb-24 scroll-mt-24">
                <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-8 pb-2 border-b border-slate-100">
                    <BoltIcon className="w-8 h-8 text-[#9D2B48]" />
                    Visión General de Arquitectura
                </h2>
                <div className="bg-slate-900 p-8 rounded-3xl text-slate-300 font-mono text-sm leading-relaxed overflow-x-auto shadow-2xl">
                    <pre className="m-0">
{`
+---------------------+       +----------------------+       +-----------------------+
|   CMS DASHBOARD     |       |   API LAYER (Rust/Node) |       |   YOUR FRONTEND       |
|  (Next.js App)      |       |   (High Performance)    |       |   (Any Framework)     |
+---------------------+       +----------------------+       +-----------------------+
|                     |       |                      |       |                       |
|  1. Editor crea     | ----> |  2. Valida JSON      |       |  4. Fetch Data        |
|     Contenido       |       |     Schema           | <---- |     (GET /api/v1...)  |
|                     |       |                      |       |                       |
|  3. Guarda en DB    | <---- |  3. Persiste en PG   | ----> |  5. Render HTML       |
|     (PostgreSQL)    |       |     (Supabase)       |       |     (SSR/SSG/ISR)     |
|                     |       |                      |       |                       |
+---------------------+       +----------------------+       +-----------------------+
           ^                             ^                               ^
           |                             |                               |
    [ AUTH LAYER ]                [ CACHE LAYER ]                 [ CDN LAYER ]
    (NextAuth.js)                 (Redis / Edge)                  (Vercel / Netlify)
`}
                    </pre>
                </div>
                <p className="mt-8 text-slate-600">
                    La arquitectura está diseñada para ser <strong>tolerante a fallos</strong>. Si el dashboard del CMS cae, tu API de lectura sigue sirviendo contenido cacheado desde el Edge. Tu web nunca se rompe.
                </p>
            </section>

            <section id="seguridad" className="mb-24 scroll-mt-24">
                <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-8 pb-2 border-b border-slate-100">
                    <ShieldCheckIcon className="w-8 h-8 text-[#9D2B48]" />
                    Modelo de Seguridad (Tenancy)
                </h2>
                <p className="mb-6">
                    Somos un sistema <strong>Multi-Tenant</strong> real. Esto significa aislamiento lógico estricto de los datos.
                </p>
                <ul className="grid sm:grid-cols-2 gap-6">
                    <li className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                        <strong className="text-slate-900 block mb-2 text-lg">Aislamiento de Sitio</strong>
                        <span className="text-slate-600">Un sitio A no puede acceder a los assets, páginas o bloques del sitio B, incluso si pertenecen al mismo dueño.</span>
                    </li>
                    <li className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                        <strong className="text-slate-900 block mb-2 text-lg">Read-Only Public API</strong>
                        <span className="text-slate-600">La API de entrega es de solo lectura. Nadie puede modificar tu contenido sin un Token de Sesión de Admin válido.</span>
                    </li>
                    <li className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                        <strong className="text-slate-900 block mb-2 text-lg">Sanitización de HTML</strong>
                        <span className="text-slate-600">Los campos de RichText son sanitizados en el servidor para prevenir ataques XSS (Cross-Site Scripting).</span>
                    </li>
                    <li className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                        <strong className="text-slate-900 block mb-2 text-lg">Backups Automáticos</strong>
                        <span className="text-slate-600">Snapshot diario de la base de datos completa. Recuperación ante desastres (Point-in-time recovery).</span>
                    </li>
                </ul>
            </section>

        </article>
    );
}
