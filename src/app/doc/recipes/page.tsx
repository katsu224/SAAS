
import { 
    CodeBracketIcon, 
    SwatchIcon, 
    PhotoIcon,
    ServerStackIcon,
    CubeTransparentIcon,
    ShieldCheckIcon,
    GlobeAltIcon,
    MegaphoneIcon,
    DocumentMagnifyingGlassIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';

export default function RecipesPage() {
    return (
        <article className="prose prose-slate prose-lg max-w-none">
            <header className="mb-12">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Recetas Avanzadas & Patrones de Arquitectura</h1>
                <p className="text-xl text-slate-500 leading-relaxed">
                    Esta sección es para el desarrollador "Senior". Aquí exploramos cómo resolver problemas complejos: Formularios, Autenticación, SEO técnico y Estrategias de Caché.
                </p>
                <div className="flex flex-wrap gap-2 mt-4 text-sm font-bold">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">Animaciones</span>
                    <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full">External APIs</span>
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">SEO & Metatags</span>
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">Auth Guards</span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">i18n</span>
                </div>
            </header>

            {/* ANIMATIONS */}
            <section id="animations" className="mb-20 scroll-mt-24">
                <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-100">
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <SwatchIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 m-0">Animaciones Controladas por CMS</h2>
                </div>
                
                <p className="mb-4">
                    No hardcodees las animaciones. Permite al editor de contenido decidir cómo entran los elementos en pantalla usando un campo `select`.
                </p>

                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800 text-sm">
                         <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                            <span className="text-xs text-slate-400 font-mono">schema.json (CMS)</span>
                        </div>
                        <pre className="p-4 overflow-x-auto text-slate-300">
                            <code>{`{
  "type": "select",
  "name": "animationType",
  "label": "Animation Entry",
  "options": [
    { "label": "None", "value": "none" },
    { "label": "Fade In", "value": "fade-in" },
    { "label": "Slide Up", "value": "slide-up" },
    { "label": "Zoom In", "value": "zoom-in" }
  ]
}`}</code>
                        </pre>
                    </div>

                    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800 text-sm">
                         <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                            <span className="text-xs text-slate-400 font-mono">Component.tsx (Frontend)</span>
                        </div>
                        <pre className="p-4 overflow-x-auto text-slate-300">
                            <code>{`// Mapa de variantes (ej. Framer Motion o Tailwind)
const animations = {
  'none': '',
  'fade-in': 'animate-fade-in opacity-0 fill-mode-forwards',
  'slide-up': 'animate-slide-up translate-y-10 opacity-0',
  'zoom-in': 'animate-zoom-in scale-95 opacity-0'
};

export default function HeroContent({ data }) {
  const animClass = animations[data.animationType] || '';

  return (
    <div className={\`hero-container \${animClass}\`}>
      <h1>{data.title}</h1>
    </div>
  );
}`}</code>
                        </pre>
                    </div>
                </div>
            </section>

             {/* EXTERNAL DATA */}
             <section id="external-data" className="mb-20 scroll-mt-24">
                <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-100">
                    <div className="p-2 bg-cyan-100 rounded-lg">
                        <ServerStackIcon className="w-6 h-6 text-cyan-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 m-0">Inyectando Datos Externos (Hydration)</h2>
                </div>
                
                <p className="mb-6">
                    A veces necesitas mostrar datos que NO están en el CMS (clima, stock, precios de cripto). Usa el CMS para configurar <em>qué</em> mostrar, y tu código para obtener el <em>dato real</em>.
                </p>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
                    <h3 className="font-bold text-slate-800 mb-2">Caso: Widget de Clima</h3>
                    <p className="text-sm text-slate-600 mb-4">
                        1. Crea un bloque "WeatherWidget" en el CMS con campos: `city` (texto) y `units` (metric/imperial).<br/>
                        2. En tu frontend, cuando encuentres un bloque de tipo "WeatherWidget", no solo renderices el HTML, haz un fetch a la API de OpenWeatherMap usando la `city` configurada.
                    </p>
                </div>

                <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800 text-sm">
                        <pre className="p-4 overflow-x-auto text-slate-300">
                            <code>{`// Astro Server Component Example
const { city, units } = Astro.props; // Datos del CMS
const apiKey = import.meta.env.WEATHER_API_KEY;

// Fetch server-side al construir la página (SSG/SSR)
const weatherRes = await fetch(\`https://api.weather.../weather?q=\${city}&units=\${units}&appid=\${apiKey}\`);
const weatherData = await weatherRes.json();

// Renderiza con datos REALES
<div class="weather-card bg-blue-500 text-white p-4 rounded-lg">
  <h3 class="font-bold">Weather in {city}</h3>
  <p class="text-4xl font-mono">{Math.round(weatherData.main.temp)}°</p>
</div>`}</code>
                        </pre>
                    </div>
            </section>

            {/* SEO & METADATA */}
            <section id="seo" className="mb-20 scroll-mt-24">
                <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-100">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                        <DocumentMagnifyingGlassIcon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 m-0">SEO & Metadata Dinámica</h2>
                </div>
                
                <p className="mb-6">
                    El SEO on-page se resuelve inyectando las etiquetas correctas en el <code>&lt;head&gt;</code>. Nuestro CMS provee los campos, tu framework los renderiza.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                     <div className="space-y-4">
                        <div className="bg-white p-4 border border-slate-200 rounded-xl">
                            <strong className="block text-slate-800 mb-1">Campos Recomendados (Root del Schema)</strong>
                            <ul className="text-sm text-slate-600 list-disc pl-4 space-y-1">
                                <li><code>seo_title</code> (Texto, Max 60 chars)</li>
                                <li><code>seo_description</code> (Texto, Max 160 chars)</li>
                                <li><code>og_image</code> (Imagen, 1200x630px)</li>
                                <li><code>noindex</code> (Toggle, Default false)</li>
                            </ul>
                        </div>
                     </div>
                     <div className="bg-slate-900 rounded-xl p-6 text-slate-300 text-sm">
                        <span className="text-emerald-400 font-bold font-mono text-xs uppercase mb-2 block">Next.js Metadata API</span>
                        <pre className="overflow-x-auto">
                            <code>{`export async function generateMetadata({ params }) {
  const page = await getPageFromCMS(params.slug);
  
  return {
    title: page.seo_title || page.title,
    description: page.seo_description,
    openGraph: {
      images: [page.og_image],
    },
    robots: {
      index: !page.noindex,
      follow: !page.noindex,
    },
  }
}`}</code>
                        </pre>
                     </div>
                </div>
            </section>

            {/* AUTH GUARDS */}
            <section id="auth-guards" className="mb-20 scroll-mt-24">
                <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-100">
                    <div className="p-2 bg-red-100 rounded-lg">
                        <ShieldCheckIcon className="w-6 h-6 text-red-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 m-0">Protección de Rutas (Auth Guards)</h2>
                </div>

                <p className="mb-6">
                    ¿Quieres crear una sección de "Miembros Premium"? Puedes usar un campo en el CMS para marcar páginas como protegidas y manejar la lógica en el Middleware.
                </p>

                <div className="bg-red-50 border-l-4 border-red-500 p-6 my-6">
                    <h3 className="text-red-900 text-lg font-bold m-0 mb-2">Estrategia de Middleware</h3>
                    <p className="text-red-800 m-0 text-base">
                        Añade un campo <code>visibility</code> ("public", "private", "admin") a tus páginas en el CMS.
                        Cuando tu frontend hace fetch de la página, si detecta <code>visibility: "private"</code> y el usuario no tiene cookie de sesión, redirige a <code>/login</code> inmediatamente.
                    </p>
                </div>

                <pre className="bg-slate-900 text-slate-300 p-6 rounded-xl overflow-x-auto text-sm">
<code>{`// middleware.ts (Next.js) example concept
export async function middleware(req) {
  const slug = req.nextUrl.pathname;
  // Fetch ligero solo para chequear permisos (o usar caché de redis edge)
  const pageMeta = await fetchPageMeta(slug); 
  
  if (pageMeta.visibility === 'private') {
    const session = await getSession(req);
    if (!session) {
       return NextResponse.redirect(new URL('/login', req.url));
    }
  }
}`}</code>
                </pre>
            </section>

             {/* FORMS */}
             <section id="forms" className="mb-20 scroll-mt-24">
                <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-100">
                    <div className="p-2 bg-orange-100 rounded-lg">
                        <ArrowPathIcon className="w-6 h-6 text-orange-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 m-0">Manejo de Formularios (Forms)</h2>
                </div>
                
                <p className="mb-6">
                    Los bloques son estáticos, pero los formularios necesitan interactividad. La mejor forma es "hidratar" solo el formulario.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-2">El Bloque "ContactForm"</h3>
                        <p className="text-sm text-slate-600 mb-4">
                            Define en el CMS: `endpointUrl` (a dónde enviar los datos), `successMessage` (texto al enviar) y campos de configuración visual.
                            <br/><br/>
                            En el frontend, renderiza un componente Cliente <code>&lt;ContactFormClient /&gt;</code> que use <code>react-hook-form</code> o acciones nativas de HTML.
                        </p>
                    </div>
                     <div className="bg-slate-900 p-6 rounded-xl text-slate-300 text-sm">
                        <span className="text-orange-400 font-bold font-mono text-xs uppercase mb-2 block">Server Action (Next.js)</span>
<pre className="overflow-x-auto">
<code>{`// actions.ts
'use server'
export async function submitContact(formData) {
    const email = formData.get('email');
    // Guardar en DB o enviar email via Resend/SendGrid
    await db.contacts.create({ email });
    return { success: true };
}

// Client Component
<form action={submitContact}>
  <input name="email" type="email" required />
  <button type="submit">Enviar</button>
</form>`}</code>
</pre>
                     </div>
                </div>
            </section>

             {/* I18N */}
             <section id="i18n" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-100">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <GlobeAltIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 m-0">Internacionalización (i18n)</h2>
                </div>
                
                <p className="mb-6">
                    Soportar múltiples idiomas puede complicar la arquitectura. Recomendamos el enfoque de <strong>"Sitios Paralelos"</strong> o <strong>"Propiedades Localizadas"</strong>.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                        <h3 className="text-blue-900 font-bold text-lg mb-2">Estrategia A: Sitios Paralelos</h3>
                        <p className="text-blue-800 text-sm mb-4">
                            Creas <code>misitio.com</code> (ES) y <code>en.misitio.com</code> (EN) como dos "Sites" distintos en el Tenant.
                        </p>
                        <ul className="text-sm list-disc pl-5 text-blue-800 space-y-1">
                            <li><strong>Pros:</strong> Total libertad de estructura entre idiomas.</li>
                            <li><strong>Cons:</strong> Mantener contenido sincronizado es manual.</li>
                        </ul>
                    </div>

                    <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200">
                        <h3 className="text-indigo-900 font-bold text-lg mb-2">Estrategia B: Propiedades Localizadas</h3>
                        <p className="text-indigo-800 text-sm mb-4">
                            Duplicas los campos en el Schema: <code>title_es</code>, <code>title_en</code>.
                        </p>
                        <ul className="text-sm list-disc pl-5 text-indigo-800 space-y-1">
                            <li><strong>Pros:</strong> Todo en un solo bloque. Sincronización perfecta.</li>
                            <li><strong>Cons:</strong> Schemas más grandes y pesados.</li>
                        </ul>
                    </div>
                </div>
            </section>

        </article>
    );
}
