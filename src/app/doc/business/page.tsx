
import { 
    BriefcaseIcon, 
    CurrencyDollarIcon, 
    ChartBarIcon, 
    GlobeAmericasIcon,
    BoltIcon
} from '@heroicons/react/24/outline';

export default function BusinessPage() {
    return (
        <article className="prose prose-slate prose-lg max-w-none">
            <header className="mb-12">
                <div className="flex items-center gap-3 text-sm font-bold text-[#9D2B48] uppercase tracking-wider mb-2">
                    <BriefcaseIcon className="w-5 h-5" />
                    Modelo de Negocio
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">SaaS & Escalabilidad</h1>
                <p className="text-xl text-slate-500 leading-relaxed">
                    Este proyecto no es solo código; es un negocio llave en mano. Diseñado para generar ingresos recurrentes (MRR) con márgenes altos.
                </p>
            </header>

            <section id="saas-model" className="mb-20 scroll-mt-24">
                <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-8 pb-2 border-b border-slate-100">
                    <CurrencyDollarIcon className="w-8 h-8 text-[#9D2B48]" />
                    Estrategia de Monetización B2B
                </h2>
                <p className="mb-6">
                    La arquitectura Multi-Tenant permite servir a miles de clientes con una sola instancia de infraestructura. Esto reduce drásticamente el costos operativos (COGS) y maximiza el beneficio.
                </p>

                <div className="grid md:grid-cols-3 gap-6 my-10">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-500 font-bold">1</div>
                        <h3 className="font-bold text-slate-900 mb-2">Freemium</h3>
                        <p className="text-slate-600 text-sm">
                            Permite crear 1 sitio gratis con marca de agua. Captura usuarios sin coste de servidor significativo (páginas estáticas).
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border-2 border-[#9D2B48] shadow-lg flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-[#9D2B48] text-white text-[10px] font-bold px-2 py-1 uppercase">Recomendado</div>
                        <div className="w-12 h-12 bg-[#9D2B48]/10 rounded-full flex items-center justify-center mb-4 text-[#9D2B48] font-bold">2</div>
                        <h3 className="font-bold text-slate-900 mb-2">Pro ($29/mes)</h3>
                        <p className="text-slate-600 text-sm">
                            Dominio personalizado, sin marca de agua, y hasta 10,000 visitas/mes. El sweet spot para PYMES.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-500 font-bold">3</div>
                        <h3 className="font-bold text-slate-900 mb-2">Agency ($99/mes)</h3>
                        <p className="text-slate-600 text-sm">
                            Multi-sitio y marca blanca. Permite a agencias revender tu plataforma a sus propios clientes.
                        </p>
                    </div>
                </div>
            </section>

             <section id="scalability" className="mb-20 scroll-mt-24">
                <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-8 pb-2 border-b border-slate-100">
                    <ChartBarIcon className="w-8 h-8 text-[#9D2B48]" />
                    Escalabilidad Técnica
                </h2>
                <div className="bg-slate-50 border-l-4 border-green-500 p-6 my-6">
                    <h3 className="text-green-900 text-lg font-bold m-0 mb-2">Stateless por diseño</h3>
                    <p className="text-green-800 m-0 text-base">
                        El backend no guarda estado en memoria. Puedes escalar horizontalmente de 1 a 100 ontenedores en segundos usando Serverless o Kubernetes.
                    </p>
                </div>
                <ul className="space-y-4">
                    <li className="flex gap-4 items-start">
                        <div className="mt-1 p-1 bg-blue-100 rounded"><GlobeAmericasIcon className="w-5 h-5 text-blue-600"/></div>
                        <div>
                            <strong className="block text-slate-900">Database Connection Pooling</strong>
                            <span className="text-slate-600">Usamos Prisma/Drizzle con PgBouncer para manejar miles de conexiones concurrentes sin saturar PostgreSQL.</span>
                        </div>
                    </li>
                    <li className="flex gap-4 items-start">
                        <div className="mt-1 p-1 bg-purple-100 rounded"><BoltIcon className="w-5 h-5 text-purple-600"/></div>
                        <div>
                            <strong className="block text-slate-900">CDN Caching</strong>
                            <span className="text-slate-600">Los assets (imágenes, JS) se sirven desde el borde (Vercel Edge Network), reduciendo la carga del servidor original en un 95%.</span>
                        </div>
                    </li>
                </ul>
            </section>

            <section id="whitelabel" className="mb-20 scroll-mt-24">
                <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-8 pb-2 border-b border-slate-100">
                    <BriefcaseIcon className="w-8 h-8 text-[#9D2B48]" />
                    Potencial White-Label
                </h2>
                <p className="mb-6">
                    El código está listo para ser "re-brandeado". Puedes vender licencias de este software a otras empresas que quieran montar su propio Wix o Squarespace de nicho.
                </p>
                <div className="p-6 bg-slate-900 rounded-xl text-slate-300">
                    <p className="italic">
                        "Imagina vender un constructor de webs específico para Dentistas, o para Restaurantes. Con este core, solo cambias los bloques predefinidos y tienes un SaaS vertical nuevo en semanas."
                    </p>
                </div>
            </section>

        </article>
    );
}
