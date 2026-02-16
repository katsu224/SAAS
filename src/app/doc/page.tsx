
import { 
    RocketLaunchIcon, 
    CpuChipIcon, 
    ShieldCheckIcon,
    BoltIcon,
    ServerStackIcon,
    SparklesIcon,
    BriefcaseIcon,
    BookOpenIcon
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
                
                <div className="flex flex-wrap gap-4 mt-8">
                    <a href="/doc/integration" className="bg-[#9D2B48] text-white px-6 py-3 rounded-full font-bold hover:bg-[#80223A] transition no-underline">
                        Empezar Integración &rarr;
                    </a>
                    <a href="/doc/modeling" className="bg-white border border-slate-300 text-slate-700 px-6 py-3 rounded-full font-bold hover:bg-slate-50 transition no-underline">
                        Aprender Conceptos
                    </a>
                </div>
            </div>

            <section id="explorar" className="mb-24 scroll-mt-24">
                 <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-8 pb-2 border-b border-slate-100">
                    <BookOpenIcon className="w-8 h-8 text-[#9D2B48]" />
                    Explora la Documentación
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <a href="/doc/features" className="group block bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-[#9D2B48]/30 transition-all no-underline">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <SparklesIcon className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#9D2B48] transition-colors">Features</h3>
                        <p className="text-slate-600 text-sm">
                            Descubre el Constructor Visual, Multi-Tenancy y Previews en tiempo real.
                        </p>
                    </a>

                    <a href="/doc/architecture" className="group block bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-[#9D2B48]/30 transition-all no-underline">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <CpuChipIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#9D2B48] transition-colors">Arquitectura</h3>
                        <p className="text-slate-600 text-sm">
                            Deep-dive técnico: Next.js 15, PostgreSQL, Edge Caching y Seguridad.
                        </p>
                    </a>

                    <a href="/doc/business" className="group block bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-[#9D2B48]/30 transition-all no-underline">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <BriefcaseIcon className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#9D2B48] transition-colors">Negocio SaaS</h3>
                        <p className="text-slate-600 text-sm">
                            Estrategias de monetización, escalabilidad y potencial White-Label.
                        </p>
                    </a>
                </div>
            </section>

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
        </article>
    );
}
