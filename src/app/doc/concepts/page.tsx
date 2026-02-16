
import { 
    CodeBracketIcon, 
    GlobeAltIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    TagIcon,
    ClockIcon,
    CheckBadgeIcon,
    PencilSquareIcon,
    ArchiveBoxIcon
} from '@heroicons/react/24/outline';

export default function ConceptsPage() {
    return (
        <article className="prose prose-slate prose-lg max-w-none">
            <header className="mb-12">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Conceptos Fundamentales</h1>
                <p className="text-xl text-slate-500 leading-relaxed">
                   Antes de escribir código, es vital entender el vocabulario del CMS. 
                   Aquí desglosamos la jerarquía de datos, el ciclo de vida del contenido y cómo se organizan los activos digitales.
                </p>
            </header>

            <section id="jerarquia" className="mb-24 scroll-mt-24">
                <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-8 pb-2 border-b border-slate-100">
                    <CodeBracketIcon className="w-8 h-8 text-[#9D2B48]" />
                    La Jerarquía de Datos
                </h2>
                
                <div className="space-y-12">
                     {/* SITE */}
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 flex-1 w-full">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="bg-indigo-100 p-3 rounded-xl"><GlobeAltIcon className="w-6 h-6 text-indigo-600"/></span>
                                <h3 className="text-2xl font-bold text-slate-900 m-0">1. Website (Sitio)</h3>
                            </div>
                            <p className="text-slate-600 mb-4">
                                El contenedor raíz. Un "Site" representa una propiedad digital única (ej: <code>hotel-cancun.com</code>).
                            </p>
                            <ul className="text-sm space-y-2 text-slate-500">
                                <li><strong>Propiedades Clave:</strong> <code>domain</code>, <code>favicon</code>, <code>global_css</code>.</li>
                                <li><strong>Uso:</strong> Configuración global (Navbars, Footers, SEO por defecto).</li>
                            </ul>
                        </div>
                        <div className="lg:w-1/3 bg-indigo-900 text-indigo-100 p-6 rounded-2xl font-mono text-xs">
{`{
  "id": "site_8273",
  "name": "Hotel Cancún Resort",
  "domains": ["cancun.hotel.com"],
  "settings": {
    "primaryColor": "#ff5500",
    "trackingId": "GA-12345"
  }
}`}
                        </div>
                    </div>

                    {/* PAGE */}
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 flex-1 w-full">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="bg-pink-100 p-3 rounded-xl"><DocumentDuplicateIcon className="w-6 h-6 text-pink-600"/></span>
                                <h3 className="text-2xl font-bold text-slate-900 m-0">2. Page (Página)</h3>
                            </div>
                            <p className="text-slate-600 mb-4">
                                Una ruta accesible vía URL. Las páginas pertenecen a un solo Sitio.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-xl border border-slate-100">
                                    <strong className="block text-slate-800 text-sm">Static Path</strong>
                                    <code className="text-xs text-slate-500">/about-us</code>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-slate-100">
                                    <strong className="block text-slate-800 text-sm">Dynamic Path</strong>
                                    <code className="text-xs text-slate-500">/blog/[slug]</code>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/3 bg-pink-900 text-pink-100 p-6 rounded-2xl font-mono text-xs">
{`{
  "id": "page_992",
  "siteId": "site_8273",
  "slug": "habitaciones",
  "seoTitle": "Nuestras Suites",
  "isPublished": true
}`}
                        </div>
                    </div>

                     {/* BLOCK */}
                     <div className="flex flex-col lg:flex-row gap-8 items-start">
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 flex-1 w-full">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="bg-emerald-100 p-3 rounded-xl"><CodeBracketIcon className="w-6 h-6 text-emerald-600"/></span>
                                <h3 className="text-2xl font-bold text-slate-900 m-0">3. Block (Bloque)</h3>
                            </div>
                            <p className="text-slate-600 mb-4">
                                Un fragmento de UI reutilizable. Las páginas son simplemente <strong>listas ordenadas de bloques</strong>.
                            </p>
                            <p className="text-sm text-slate-500">
                                Un bloque no tiene URL propia. Vive dentro de una página (o dentro de otro bloque, si anidas).
                            </p>
                        </div>
                        <div className="lg:w-1/3 bg-emerald-900 text-emerald-100 p-6 rounded-2xl font-mono text-xs">
{`{
  "id": "blk_772",
  "type": "HeroHeader",
  "order": 0,
  "content": { ... }
}`}
                        </div>
                    </div>
                </div>
            </section>

             <section id="workflow" className="mb-24 scroll-mt-24">
                <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-8 pb-2 border-b border-slate-100">
                    <ClockIcon className="w-8 h-8 text-[#9D2B48]" />
                    Ciclo de Vida del Contenido (Publishing)
                </h2>
                <p className="mb-8">
                    El CMS maneja dos estados para cada entidad (Página o Bloque): <strong>Draft</strong> (Borrador) y <strong>Published</strong> (Publicado).
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-lg shadow-yellow-100 border border-yellow-200 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">WIP</div>
                        <PencilSquareIcon className="w-8 h-8 text-yellow-500 mb-4"/>
                        <h3 className="font-bold text-slate-800 mb-2">1. Estado Draft</h3>
                        <p className="text-sm text-slate-600">
                            Cualquier cambio que el editor hace se guarda automáticamente en <code>draft_content</code>. Es invisible para la API pública, pero visible en "Preview Mode".
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg shadow-green-100 border border-green-200 relative overflow-hidden">
                        <CheckBadgeIcon className="w-8 h-8 text-green-500 mb-4"/>
                        <h3 className="font-bold text-slate-800 mb-2">2. Publish Action</h3>
                        <p className="text-sm text-slate-600">
                            Cuando el editor pulsa "Publicar", el sistema copia <code>draft_content</code> a <code>published_content</code>. Dispara webhooks (si hay) para regenerar caché ISR.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg shadow-slate-100 border border-slate-200 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-slate-200 text-slate-500 text-xs font-bold px-3 py-1 rounded-bl-xl">History</div>
                        <ArchiveBoxIcon className="w-8 h-8 text-slate-500 mb-4"/>
                        <h3 className="font-bold text-slate-800 mb-2">3. Historical Snapshot</h3>
                        <p className="text-sm text-slate-600">
                            Se crea una versión inmutable en el historial. Permite hacer "Rollback" si alguien rompe la producción.
                        </p>
                    </div>
                </div>
            </section>

             <section id="media" className="mb-24 scroll-mt-24">
                <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-8 pb-2 border-b border-slate-100">
                    <FolderIcon className="w-8 h-8 text-[#9D2B48]" />
                    Gestión de Archivos (Media Library)
                </h2>
                <p className="mb-8">
                    El CMS no guarda archivos en el servidor local. Delega en un proveedor de almacenamiento en la nube (Cloudinary o AWS S3).
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                     <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="bg-blue-100 p-2 rounded-lg h-fit"><TagIcon className="w-5 h-5 text-blue-600"/></div>
                            <div>
                                <strong className="block text-slate-900">Metadatos Inteligentes</strong>
                                <span className="text-slate-500 text-sm">Al subir una imagen, extraemos automáticamente dimensiones (width/height), formato y peso. Útiles para evitar Layout Shift (CLS).</span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-purple-100 p-2 rounded-lg h-fit"><FolderIcon className="w-5 h-5 text-purple-600"/></div>
                            <div>
                                <strong className="block text-slate-900">Carpetas Virtuales</strong>
                                <span className="text-slate-500 text-sm">Organiza assets por Campaña, Año o Tipo. Las carpetas son solo etiquetas lógicas, no físicas.</span>
                            </div>
                        </div>
                     </div>

                     <div className="bg-slate-900 rounded-2xl p-6 text-slate-300 text-sm font-mono">
                         <div className="mb-4 border-b border-slate-700 pb-2 text-xs text-slate-500 uppercase tracking-widest">Asset Object Response</div>
{`{
  "id": "asset_991",
  "url": "https://res.cloudinary.com/.../hero.jpg",
  "width": 1920,
  "height": 1080,
  "format": "jpg",
  "size_kb": 245,
  "alt_text": "Vista aérea del resort",
  "tags": ["hero", "summer_2024"]
}`}
                     </div>
                </div>
            </section>

        </article>
    );
}
