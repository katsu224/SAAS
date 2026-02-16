
import { 
    CubeIcon, 
    TableCellsIcon, 
    ArrowsRightLeftIcon,
    DocumentTextIcon,
    ListBulletIcon,
    PuzzlePieceIcon
} from '@heroicons/react/24/outline';

export default function ModelingPage() {
    return (
        <article className="prose prose-slate prose-lg max-w-none">
            <header className="mb-12">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Modelado de Contenidos</h1>
                <p className="text-xl text-slate-500 leading-relaxed">
                    Aprende a estructurar tu información de manera lógica y reutilizable. En nuestro CMS, no piensas en "páginas", piensas en "sistemas de contenido".
                </p>
            </header>

            <section id="filosofia" className="mb-16 scroll-mt-24">
                <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">
                    <CubeIcon className="w-8 h-8 text-[#9D2B48]" />
                    La Filosofía de Bloques
                </h2>
                <p>
                    La mayoría de los CMS tradicionales (como WordPress) acoplan el contenido a su presentación. Tú escribes un post y el CMS decide cómo se ve (a menos que seas un experto en temas PHP). 
                    Aquí, adoptamos una filosofía <strong>Block-First</strong>.
                </p>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
                    <h3 className="text-blue-900 text-lg font-bold m-0 mb-2">¿Qué es un Bloque?</h3>
                    <p className="text-blue-800 m-0 text-base">
                        Un bloque es la unidad atómica de contenido. Puede ser tan simple como un "Texto" o tan complejo como una "Grilla de Productos con Filtros".
                        Un bloque <strong>NO sabe dónde se renderizará</strong>. Solo guarda datos puros.
                    </p>
                </div>

                <h3 className="text-2xl font-bold text-slate-800 mb-4">Anatomía de un Bloque</h3>
                <p className="mb-6">
                    Todo bloque en nuestro ecosistema sigue una estructura JSON predecible. Esto garantiza que tu frontend siempre sepa qué esperar.
                </p>

                <div className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-800 text-sm mb-8">
                    <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
                        <span className="text-sky-400 font-mono font-bold">anatomy.json</span>
                        <span className="text-slate-500 text-xs text-right">Estructura Universal</span>
                    </div>
                    <pre className="p-6 overflow-x-auto text-slate-300 leading-6">
                        <code>{`{
  // Identificador único (UUID) generado por el sistema
  "id": "123e4567-e89b-12d3-a456-426614174000",

  // El "Nombre del Contrato" entre CMS y Frontend
  // Tu código debe tener un componente que coincida con este string.
  "type": "hero-section",

  // Datos arbitrarios definidos por tu Schema
  // Aquí es donde vive la magia. Puede tener cualquier forma.
  "content": {
    "title": "El Futuro del SaaS",
    "subtitle": "Construye más rápido, escala mejor.",
    "backgroundImage": "https://cdn.tusitio.com/hero.jpg",
    "cta": {
      "label": "Empezar Gratis",
      "href": "/signup",
      "variant": "primary"
    },
    "features": ["Rápido", "Seguro", "Global"]
  }
}`}</code>
                    </pre>
                </div>
            </section>

            <section id="schemas" className="mb-16 scroll-mt-24">
                <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">
                    <TableCellsIcon className="w-8 h-8 text-[#9D2B48]" />
                    Diseñando tus Schemas
                </h2>
                <p>
                    Para que los editores puedan crear bloques, necesitas definir un <strong>Schema</strong>. Un Schema es como un plano o "blueprint" que le dice al CMS qué campos mostrar en el formulario de edición.
                </p>

                <div className="grid lg:grid-cols-2 gap-8 my-8">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800 mb-4">Tipos de Campos Disponibles</h3>
                        <ul className="space-y-4">
                            <li className="flex gap-4">
                                <div className="p-2 bg-slate-100 rounded-lg h-fit"><DocumentTextIcon className="w-6 h-6 text-slate-600"/></div>
                                <div>
                                    <strong className="block text-slate-900">Text & Rich Text</strong>
                                    <span className="text-slate-500 text-sm">Para títulos, párrafos o contenido HTML simple. Soporta validaciones (min/max length).</span>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="p-2 bg-slate-100 rounded-lg h-fit"><PhotoIcon className="w-6 h-6 text-slate-600"/></div>
                                <div>
                                    <strong className="block text-slate-900">Media (Imagen/Video)</strong>
                                    <span className="text-slate-500 text-sm">Sube archivos a Cloudinary/AWS S3 y guarda la URL optimizada.</span>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="p-2 bg-slate-100 rounded-lg h-fit"><ListBulletIcon className="w-6 h-6 text-slate-600"/></div>
                                <div>
                                    <strong className="block text-slate-900">Select & Toggle</strong>
                                    <span className="text-slate-500 text-sm">Para opciones de control (alineación, colores, visibilidad).</span>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="p-2 bg-slate-100 rounded-lg h-fit"><PuzzlePieceIcon className="w-6 h-6 text-slate-600"/></div>
                                <div>
                                    <strong className="block text-slate-900">Repeater (Array)</strong>
                                    <span className="text-slate-500 text-sm">La joya de la corona. Permite listas infinitas de sub-items (ej: slides, testimonios).</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Ejemplo de Definición de Schema</h3>
                        <pre className="text-xs bg-white p-4 rounded-xl border border-slate-200 overflow-x-auto text-slate-600 font-mono">
{`[
  {
    "name": "headline",
    "label": "Titular Principal",
    "type": "text",
    "required": true
  },
  {
    "name": "alignment",
    "label": "Alineación de Texto",
    "type": "select",
    "options": [
        { "label": "Izquierda", "value": "left" },
        { "label": "Centro", "value": "center" }
    ]
  },
  {
    "name": "gallery_images",
    "label": "Galería",
    "type": "repeater",
    "fields": [
        { "name": "src", "type": "image" },
        { "name": "caption", "type": "text" }
    ]
  }
]`}
                        </pre>
                    </div>
                </div>
            </section>

             <section id="relaciones" className="mb-16 scroll-mt-24">
                <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">
                    <ArrowsRightLeftIcon className="w-8 h-8 text-[#9D2B48]" />
                    Modelando Relaciones (Sites vs Pages)
                </h2>
                <p className="mb-6">
                    Entender la jerarquía es crucial. No todo es un "Bloque". Hay contenedores mayores.
                </p>

                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start border p-6 rounded-xl bg-white shadow-sm">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shrink-0 text-white font-bold text-2xl">
                            1
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">El Tenant (Organización)</h3>
                            <p className="text-slate-600 mt-2">
                                Es el nivel más alto. Representa a tu cliente o empresa. Un Tenant puede tener múltiples <strong>Sitios</strong>. 
                                <br/><em>Ejemplo: "Grupo Hotelero S.A." es el Tenant.</em>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 items-start border p-6 rounded-xl bg-white shadow-sm ml-0 md:ml-8 border-l-4 border-l-indigo-500">
                        <div className="w-16 h-16 bg-white border-2 border-indigo-100 rounded-2xl flex items-center justify-center shrink-0 text-indigo-600 font-bold text-2xl">
                            2
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">El Website (Sitio)</h3>
                            <p className="text-slate-600 mt-2">
                                Contenedor lógico de páginas y configuración global (Logo, Colores, Fuentes).
                                <br/><em>Ejemplo: "Hotel Cancún" y "Hotel Madrid" son dos sitios del mismo Tenant.</em>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 items-start border p-6 rounded-xl bg-white shadow-sm ml-0 md:ml-16 border-l-4 border-l-purple-500">
                        <div className="w-16 h-16 bg-white border-2 border-purple-100 rounded-2xl flex items-center justify-center shrink-0 text-purple-600 font-bold text-2xl">
                            3
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">La Page (Página)</h3>
                            <p className="text-slate-600 mt-2">
                                Una ruta específica (URL) dentro de un sitio. Contiene una lista ordenada de <strong>Bloques</strong>.
                                <br/><em>Ejemplo: "/habitaciones/suite-presidencial".</em>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

             <section id="estrategias" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">
                    Estrategias de Modelado: Atomic vs Monolithic
                </h2>
                <p className="mb-8">
                    Cuando crees tus bloques, te enfrentarás a una decisión: ¿Hago muchos bloques pequeños o pocos bloques gigantes?
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
                        <h3 className="text-green-900 font-bold text-lg mb-2">🟢 Estrategia Atómica (Recomendada)</h3>
                        <p className="text-green-800 text-sm mb-4">
                            Creas bloques pequeños y reutilizables: "Heading", "Paragraph", "Button", "Image". 
                        </p>
                        <ul className="text-sm list-disc pl-5 text-green-800 space-y-1">
                            <li><strong>Pros:</strong> Máxima flexibilidad. El editor construye como en Lego.</li>
                            <li><strong>Cons:</strong> Requiere más trabajo del editor para armar una sección compleja.</li>
                            <li><strong>Ideal para:</strong> Blogs, Páginas de contenido libre.</li>
                        </ul>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200">
                        <h3 className="text-orange-900 font-bold text-lg mb-2">🟠 Estrategia Monolítica (Secciones)</h3>
                        <p className="text-orange-800 text-sm mb-4">
                            Creas bloques que representan secciones enteras: "HeroSection", "PricingTable", "ContactForm".
                        </p>
                        <ul className="text-sm list-disc pl-5 text-orange-800 space-y-1">
                            <li><strong>Pros:</strong> Diseño consistente imposible de romper. Rápido de llenar.</li>
                            <li><strong>Cons:</strong> Poca libertad creativa. Si quieren mover el botón de lugar, te llaman a ti.</li>
                            <li><strong>Ideal para:</strong> Landing Pages, Homepages corporativas.</li>
                        </ul>
                    </div>
                </div>
            </section>

        </article>
    );
}

// Icon Helper for this file
function PhotoIcon(props: React.ComponentProps<'svg'>) {
        return (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
    )
}
