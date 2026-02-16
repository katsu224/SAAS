
import { 
    PencilSquareIcon, 
    UserGroupIcon, 
    EyeIcon, 
    SparklesIcon
} from '@heroicons/react/24/outline';

export default function FeaturesPage() {
    return (
        <article className="prose prose-slate prose-lg max-w-none">
            <header className="mb-12">
                <div className="flex items-center gap-3 text-sm font-bold text-[#9D2B48] uppercase tracking-wider mb-2">
                    <SparklesIcon className="w-5 h-5" />
                    Capacidades del Producto
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Funcionalidades Principales</h1>
                <p className="text-xl text-slate-500 leading-relaxed">
                    Descubre las herramientas que empoderan a tus usuarios para crear experiencias digitales sin escribir una sola línea de código.
                </p>
            </header>

            <section id="builder" className="mb-20 scroll-mt-24">
                <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-8 pb-2 border-b border-slate-100">
                    <PencilSquareIcon className="w-8 h-8 text-[#9D2B48]" />
                    Constructor Visual (No-Code)
                </h2>
                <p className="mb-6">
                    El corazón de la experiencia de usuario. Un editor WYSIWYG (What You See Is What You Get) que permite manipular bloques en tiempo real.
                </p>

                <div className="grid md:grid-cols-2 gap-8 my-8">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Edición de Campos Contextual</h3>
                        <p className="text-slate-600 text-sm">
                            Cada bloque expone un formulario lateral generado dinámicamente según su Schema. Textos, imágenes, enlaces y colores se editan al instante.
                        </p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Drag & Drop Intuitivo</h3>
                        <p className="text-slate-600 text-sm">
                            Reordena secciones completas arrastrando y soltando. La estructura de la página se actualiza en la base de datos automáticamente.
                        </p>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <PencilSquareIcon className="w-48 h-48" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 relative z-10">Live Preview Real</h3>
                    <p className="text-slate-300 relative z-10 max-w-lg mb-6">
                        A diferencia de otros CMS, nuestra vista previa renderiza los componentes reales de React/Next.js. No es una aproximación, es exactamente lo que verán tus usuarios.
                    </p>
                    <div className="relative z-10 inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/20">
                        <EyeIcon className="w-5 h-5 text-green-400" />
                        <span className="font-mono text-sm">Integración con iframe seguro</span>
                    </div>
                </div>
            </section>

             <section id="tenancy" className="mb-20 scroll-mt-24">
                <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-8 pb-2 border-b border-slate-100">
                    <UserGroupIcon className="w-8 h-8 text-[#9D2B48]" />
                    Gestión Multi-Tenant
                </h2>
                <p className="mb-6">
                    Diseñado desde el primer día para SaaS. Administra miles de clientes desde un solo panel maestro.
                </p>

                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-bold text-slate-700">Nivel de Jerarquía</th>
                                <th className="px-6 py-4 font-bold text-slate-700">Descripción</th>
                                <th className="px-6 py-4 font-bold text-slate-700">Permisos</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                             <tr>
                                <td className="px-6 py-4 font-mono font-bold text-purple-600">Super Admin</td>
                                <td className="px-6 py-4 text-slate-600">Tú (Dueño del SaaS). Ve todos los tenants, métricas globales y facturación.</td>
                                <td className="px-6 py-4 text-slate-600">Total (Read/Write All)</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-mono font-bold text-blue-600">Tenant Owner</td>
                                <td className="px-6 py-4 text-slate-600">Tu Cliente. Gestiona sus propios sitios y su equipo.</td>
                                <td className="px-6 py-4 text-slate-600">Scope: Organization Only</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-mono font-bold text-green-600">Editor</td>
                                <td className="px-6 py-4 text-slate-600">Empleado del Cliente. Solo puede editar contenido, no configuración.</td>
                                <td className="px-6 py-4 text-slate-600">Scope: Content Only</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </article>
    );
}
