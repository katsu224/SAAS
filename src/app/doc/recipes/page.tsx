'use client';

import { 
    SwatchIcon, 
    ServerStackIcon,
    ShieldCheckIcon,
    GlobeAltIcon,
    DocumentMagnifyingGlassIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';

export default function RecipesPage() {
    return (
        <article className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {/* ENCABEZADO */}
            <header className="mb-16 border-b border-zinc-200 pb-10">
                <h1 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight mb-6">
                    Recetas Avanzadas & Patrones de Arquitectura
                </h1>
                <p className="text-xl text-zinc-600 leading-relaxed max-w-3xl mb-8">
                    Esta sección está diseñada para desarrolladores avanzados. Aquí exploramos cómo resolver problemas arquitectónicos complejos: Formularios, Autenticación, SEO técnico y Estrategias de Caché en un entorno Headless.
                </p>
                <div className="flex flex-wrap gap-3 text-sm font-semibold">
                    <span className="bg-purple-50 text-purple-700 ring-1 ring-purple-700/10 px-3.5 py-1.5 rounded-full">Animaciones</span>
                    <span className="bg-cyan-50 text-cyan-700 ring-1 ring-cyan-700/10 px-3.5 py-1.5 rounded-full">External APIs</span>
                    <span className="bg-emerald-50 text-emerald-700 ring-1 ring-emerald-700/10 px-3.5 py-1.5 rounded-full">SEO & Metadatos</span>
                    <span className="bg-red-50 text-red-700 ring-1 ring-red-700/10 px-3.5 py-1.5 rounded-full">Auth Guards</span>
                    <span className="bg-blue-50 text-blue-700 ring-1 ring-blue-700/10 px-3.5 py-1.5 rounded-full">i18n</span>
                </div>
            </header>

            {/* 1. ANIMACIONES */}
            <section id="animations" className="mb-24 scroll-mt-24">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-2.5 bg-purple-100 rounded-xl shadow-sm border border-purple-200">
                        <SwatchIcon className="w-6 h-6 text-purple-700" />
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900 m-0 tracking-tight">Animaciones Controladas por CMS</h2>
                </div>
                
                <p className="text-zinc-600 mb-8 text-lg">
                    Evita definir las animaciones de forma rígida en el código (hardcodear). Permite al editor de contenido decidir cómo entran los elementos en pantalla mediante un campo de selección (select) en el CMS.
                </p>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Código CMS */}
                    <div className="bg-zinc-950 rounded-2xl overflow-hidden shadow-xl shadow-zinc-200 border border-zinc-800 flex flex-col">
                         <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 ring-1 ring-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 ring-1 ring-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/20 ring-1 ring-green-500/50"></div>
                            </div>
                            <span className="text-xs text-zinc-400 font-mono font-medium">schema.json (CMS)</span>
                        </div>
                        <pre className="p-5 overflow-x-auto text-zinc-300 text-sm font-mono leading-relaxed flex-1">
                            <code>{`{
  "type": "select",
  "name": "animationType",
  "label": "Animación de Entrada",
  "options": [
    { "label": "Ninguna", "value": "none" },
    { "label": "Aparecer (Fade In)", "value": "fade-in" },
    { "label": "Deslizar Arriba", "value": "slide-up" },
    { "label": "Zoom", "value": "zoom-in" }
  ]
}`}</code>
                        </pre>
                    </div>

                    {/* Código Frontend */}
                    <div className="bg-zinc-950 rounded-2xl overflow-hidden shadow-xl shadow-zinc-200 border border-zinc-800 flex flex-col">
                         <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800">
                             <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 ring-1 ring-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 ring-1 ring-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/20 ring-1 ring-green-500/50"></div>
                            </div>
                            <span className="text-xs text-zinc-400 font-mono font-medium">Component.tsx (Frontend)</span>
                        </div>
                        <pre className="p-5 overflow-x-auto text-zinc-300 text-sm font-mono leading-relaxed flex-1">
                            <code>{`// Mapa de variantes (Tailwind o Framer Motion)
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

             {/* 2. EXTERNAL DATA */}
             <section id="external-data" className="mb-24 scroll-mt-24">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-2.5 bg-cyan-100 rounded-xl shadow-sm border border-cyan-200">
                        <ServerStackIcon className="w-6 h-6 text-cyan-700" />
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900 m-0 tracking-tight">Inyectando Datos Externos (Hydration)</h2>
                </div>
                
                <p className="text-zinc-600 mb-8 text-lg">
                    En ocasiones, necesitas mostrar información que NO reside en el CMS (clima, inventario, precios de criptomonedas). Utiliza el CMS para configurar <em>qué</em> mostrar, y tu código para obtener el <em>dato real</em> en tiempo de ejecución.
                </p>

                

                <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="bg-white p-8 rounded-2xl shadow-lg shadow-zinc-100 border border-zinc-200">
                        <h3 className="text-xl font-bold text-zinc-900 mb-3">Caso Práctico: Widget de Clima</h3>
                        <div className="space-y-4 text-zinc-600">
                            <p>
                                <strong className="text-zinc-900">Paso 1:</strong> Crea un bloque llamado "WeatherWidget" en el CMS con los campos: <code>city</code> (texto) y <code>units</code> (selector: metric/imperial).
                            </p>
                            <p>
                                <strong className="text-zinc-900">Paso 2:</strong> En tu frontend, al detectar un bloque de este tipo, no solo renderices el HTML estático; realiza una petición a la API de OpenWeatherMap utilizando la ciudad configurada.
                            </p>
                        </div>
                    </div>

                    <div className="bg-zinc-950 rounded-2xl overflow-hidden shadow-xl shadow-zinc-200 border border-zinc-800">
                        <div className="px-4 py-3 bg-zinc-900 border-b border-zinc-800">
                            <span className="text-cyan-400 font-bold font-mono text-xs uppercase tracking-wider">Astro Server Component</span>
                        </div>
                        <pre className="p-5 overflow-x-auto text-zinc-300 text-sm font-mono leading-relaxed">
                            <code>{`const { city, units } = Astro.props; 
const apiKey = import.meta.env.WEATHER_API_KEY;

// Fetch en el servidor (SSR/SSG)
const res = await fetch(
  \`https://api.weather.../weather?q=\${city}&units=\${units}\`
);
const data = await res.json();

// Renderiza con datos REALES
<div class="weather-card bg-blue-500 text-white p-5 rounded-xl">
  <h3 class="font-bold">Clima en {city}</h3>
  <p class="text-4xl font-mono">{Math.round(data.main.temp)}°</p>
</div>`}</code>
                        </pre>
                    </div>
                </div>
            </section>

            {/* 3. SEO & METADATA */}
            <section id="seo" className="mb-24 scroll-mt-24">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-2.5 bg-emerald-100 rounded-xl shadow-sm border border-emerald-200">
                        <DocumentMagnifyingGlassIcon className="w-6 h-6 text-emerald-700" />
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900 m-0 tracking-tight">SEO & Metadatos Dinámicos</h2>
                </div>
                
                <p className="text-zinc-600 mb-8 text-lg">
                    El SEO on-page se resuelve inyectando las etiquetas correctas en el <code>&lt;head&gt;</code> del documento. Nuestro CMS provee los campos necesarios, y tu framework (Next.js/Astro) se encarga de renderizarlos.
                </p>

                <div className="grid md:grid-cols-5 gap-8">
                     <div className="md:col-span-2 space-y-4">
                        <div className="bg-emerald-50/50 p-6 border border-emerald-100 rounded-2xl h-full">
                            <h3 className="font-bold text-emerald-900 mb-4 text-lg">Campos Base (Root del Schema)</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-emerald-800">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    <span><code className="bg-white px-1.5 py-0.5 rounded text-sm font-semibold">seo_title</code> <span className="text-sm opacity-80">(Máx 60 carácteres)</span></span>
                                </li>
                                <li className="flex items-center gap-3 text-emerald-800">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    <span><code className="bg-white px-1.5 py-0.5 rounded text-sm font-semibold">seo_description</code> <span className="text-sm opacity-80">(Máx 160)</span></span>
                                </li>
                                <li className="flex items-center gap-3 text-emerald-800">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    <span><code className="bg-white px-1.5 py-0.5 rounded text-sm font-semibold">og_image</code> <span className="text-sm opacity-80">(1200x630px)</span></span>
                                </li>
                                <li className="flex items-center gap-3 text-emerald-800">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    <span><code className="bg-white px-1.5 py-0.5 rounded text-sm font-semibold">noindex</code> <span className="text-sm opacity-80">(Toggle booleano)</span></span>
                                </li>
                            </ul>
                        </div>
                     </div>
                     <div className="md:col-span-3 bg-zinc-950 rounded-2xl overflow-hidden shadow-xl shadow-zinc-200 border border-zinc-800">
                        <div className="px-4 py-3 bg-zinc-900 border-b border-zinc-800">
                            <span className="text-emerald-400 font-bold font-mono text-xs uppercase tracking-wider">Next.js Metadata API</span>
                        </div>
                        <pre className="p-5 overflow-x-auto text-zinc-300 text-sm font-mono leading-relaxed">
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

            {/* 4. AUTH GUARDS */}
            <section id="auth-guards" className="mb-24 scroll-mt-24">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-2.5 bg-red-100 rounded-xl shadow-sm border border-red-200">
                        <ShieldCheckIcon className="w-6 h-6 text-red-700" />
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900 m-0 tracking-tight">Protección de Rutas (Auth Guards)</h2>
                </div>

                <p className="text-zinc-600 mb-8 text-lg">
                    Para crear secciones exclusivas (ej. "Miembros Premium"), utiliza un campo en el CMS para marcar páginas como protegidas y maneja la lógica de redirección a nivel de red usando Middleware.
                </p>

                

                <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="bg-red-50/50 border border-red-100 p-8 rounded-2xl h-full">
                        <h3 className="text-red-900 text-xl font-bold mb-3">Estrategia de Middleware</h3>
                        <p className="text-red-800 text-base leading-relaxed">
                            Añade un campo <code>visibility</code> (con opciones como "public", "private", "admin") a tus páginas en el CMS. 
                            <br/><br/>
                            Cuando el framework recibe una petición, el middleware verifica la visibilidad. Si detecta <code>private</code> y el usuario no posee una sesión activa (cookie), la petición se intercepta y redirige a <code>/login</code> de manera instantánea.
                        </p>
                    </div>

                    <div className="bg-zinc-950 text-zinc-300 rounded-2xl border border-zinc-800 overflow-hidden shadow-xl shadow-zinc-200 h-full">
                        <div className="px-4 py-3 bg-zinc-900 border-b border-zinc-800">
                            <span className="text-red-400 font-bold font-mono text-xs uppercase tracking-wider">middleware.ts (Next.js)</span>
                        </div>
                        <pre className="p-5 overflow-x-auto text-sm font-mono leading-relaxed">
<code>{`export async function middleware(req) {
  const slug = req.nextUrl.pathname;
  
  // Fetch ligero o caché de Redis en el Edge
  const pageMeta = await fetchPageMeta(slug); 
  
  if (pageMeta.visibility === 'private') {
    const session = await getSession(req);
    
    if (!session) {
       return NextResponse.redirect(
         new URL('/login', req.url)
       );
    }
  }
}`}</code>
                        </pre>
                    </div>
                </div>
            </section>

             {/* 5. FORMS */}
             <section id="forms" className="mb-24 scroll-mt-24">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-2.5 bg-orange-100 rounded-xl shadow-sm border border-orange-200">
                        <ArrowPathIcon className="w-6 h-6 text-orange-700" />
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900 m-0 tracking-tight">Manejo de Formularios Interactivos</h2>
                </div>
                
                <p className="text-zinc-600 mb-8 text-lg">
                    Los bloques de contenido suelen ser estáticos, pero los formularios requieren interactividad. La práctica recomendada es aislar e "hidratar" únicamente el componente del formulario.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 border border-zinc-200 rounded-2xl shadow-lg shadow-zinc-100">
                        <h3 className="text-xl font-bold text-zinc-900 mb-3">El Bloque "ContactForm"</h3>
                        <div className="text-zinc-600 space-y-4">
                            <p>
                                Define en el CMS propiedades como: <code>endpointUrl</code> (destino de los datos), <code>successMessage</code> (mensaje de éxito) y las etiquetas visuales.
                            </p>
                            <p>
                                En el frontend, renderiza un <strong>Client Component</strong> (ej. <code>&lt;ContactFormClient /&gt;</code>) que gestione el estado usando herramientas como <code>react-hook-form</code> o Server Actions nativas.
                            </p>
                        </div>
                    </div>
                     <div className="bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden shadow-xl shadow-zinc-200">
                        <div className="px-4 py-3 bg-zinc-900 border-b border-zinc-800">
                            <span className="text-orange-400 font-bold font-mono text-xs uppercase tracking-wider">Server Action (Next.js)</span>
                        </div>
<pre className="p-5 overflow-x-auto text-zinc-300 text-sm font-mono leading-relaxed">
<code>{`// actions.ts
'use server'
export async function submitContact(formData) {
  const email = formData.get('email');
  // Guardar en DB o procesar en SendGrid/Resend
  await db.contacts.create({ email });
  return { success: true };
}

// Client Component
<form action={submitContact}>
  <input name="email" type="email" required />
  <button type="submit">Enviar Mensaje</button>
</form>`}</code>
</pre>
                     </div>
                </div>
            </section>

             {/* 6. I18N */}
             <section id="i18n" className="mb-12 scroll-mt-24">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-2.5 bg-blue-100 rounded-xl shadow-sm border border-blue-200">
                        <GlobeAltIcon className="w-6 h-6 text-blue-700" />
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900 m-0 tracking-tight">Internacionalización (i18n)</h2>
                </div>
                
                <p className="text-zinc-600 mb-8 text-lg">
                    Implementar múltiples idiomas puede añadir complejidad a la arquitectura. Según el alcance del proyecto, recomendamos el enfoque de <strong>Sitios Paralelos</strong> o <strong>Propiedades Localizadas</strong>.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-blue-50/50 p-8 rounded-2xl border border-blue-100 hover:border-blue-300 transition-colors">
                        <h3 className="text-blue-900 font-bold text-xl mb-3">A: Sitios Paralelos</h3>
                        <p className="text-blue-800 text-base mb-5">
                            Creas <code>misitio.com</code> (ES) y <code>en.misitio.com</code> (EN) como dos instancias o "Sites" completamente independientes dentro del mismo Tenant.
                        </p>
                        <ul className="space-y-2 text-blue-800/80">
                            <li className="flex gap-2"><strong className="text-blue-900">Pros:</strong> Total libertad de estructura entre idiomas.</li>
                            <li className="flex gap-2"><strong className="text-blue-900">Contras:</strong> Mantener el contenido idéntico sincronizado requiere esfuerzo manual.</li>
                        </ul>
                    </div>

                    <div className="bg-indigo-50/50 p-8 rounded-2xl border border-indigo-100 hover:border-indigo-300 transition-colors">
                        <h3 className="text-indigo-900 font-bold text-xl mb-3">B: Propiedades Localizadas</h3>
                        <p className="text-indigo-800 text-base mb-5">
                            Duplicas los campos directamente en el esquema de la base de datos o JSON: <code>title_es</code> y <code>title_en</code>.
                        </p>
                        <ul className="space-y-2 text-indigo-800/80">
                            <li className="flex gap-2"><strong className="text-indigo-900">Pros:</strong> Todo gestionado en un solo bloque. La sincronización es automática.</li>
                            <li className="flex gap-2"><strong className="text-indigo-900">Contras:</strong> Los esquemas de datos se vuelven más grandes y complejos.</li>
                        </ul>
                    </div>
                </div>
            </section>
        </article>
    );
}