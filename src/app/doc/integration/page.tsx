
import { CpuChipIcon } from '@heroicons/react/24/outline';

export default function IntegrationPage() {
    return (
        <article className="prose prose-slate prose-lg max-w-none">
            <section id="integrations" className="mb-16 scroll-mt-24">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-8 pb-2 border-b border-slate-100">
                    <CpuChipIcon className="w-6 h-6 text-[#9D2B48]" />
                    Guías de Integración
                </h2>

                {/* ENTORNO */}
                <div id="env-setup" className="mb-12 scroll-mt-28">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">🔑 Configuración de Variables de Entorno (.env)</h3>
                    <p className="text-slate-600 mb-4">Asegúrate de tener estas variables configuradas en tu proyecto:</p>
                    
                    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800 text-sm mb-6">
                        <pre className="p-4 overflow-x-auto text-slate-300">
                            <code>{`AUTH_SECRET="KbNOfhdgxAQlw9TUk+jA2V+g=ERUBD+7HdJGSILC2"
# Conexión a tu nueva BD en Supabase
DATABASE_URL="postgresql://postgres:c3-CgYqQH-yVNQN@db.bfbjgefievbscdxudxtn.supabase.co:5432/postgres"

# El secreto compartido (Debe ser igual en el CMS y en tu Frontend)
PREVIEW_SECRET="ultra_secreto_9273"

# Cloudinary (Para subida de imágenes)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="tu_cloud_name"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="tu_preset_sin_firma"`}</code>
                        </pre>
                    </div>
                </div>

                {/* ASTRO */}
                <div id="astro" className="mb-12 scroll-mt-28">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-slate-800">🚀 Astro (Recomendado)</h3>
                        <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-full uppercase">SSR Required</span>
                    </div>
                    
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-amber-900 text-sm">
                        <strong className="block mb-2 font-bold">⚠️ Configuración Previa Obligatoria</strong>
                        Para que la vista previa funcione en tiempo real, Astro debe ejecutarse en modo servidor (SSR).
                        <br/>Edita tu archivo <code>astro.config.mjs</code>:
                    </div>

                    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800 text-sm mb-6">
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border-b border-slate-700">
                            <span className="text-xs text-slate-400 font-mono">astro.config.mjs</span>
                        </div>
                        <pre className="p-4 overflow-x-auto text-slate-300">
                            <code>{`import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node'; // O tu adaptador preferido (vercel, netlify)

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [tailwind()]
});`}</code>
                        </pre>
                    </div>

                    <h4 className="font-bold text-slate-800 mb-2">✅ PASO 4: Validación Segura del Token</h4>
                    <p className="text-sm text-slate-500 mb-4">Astro leerá el <code>?token=</code> del Iframe, lo validará contra el <code>PREVIEW_SECRET</code> y pedirá los datos al CMS.</p>
                    
                    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800 text-sm">
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border-b border-slate-700">
                            <span className="text-xs text-slate-400 font-mono">src/pages/room.astro</span>
                        </div>
                        <pre className="p-4 overflow-x-auto text-slate-300">
                            <code>{`---
import MainLayout from '../layouts/MainLayout.astro';
// ... tus otros imports

// 1. Astro lee el token de la URL (viene del Iframe del CMS)
const previewToken = Astro.url.searchParams.get("token");

// 2. Astro compara el token de la URL con su propio .env
const isPreview = previewToken === import.meta.env.PREVIEW_SECRET;

// 3. Preparamos la URL de la API (con nocache si es preview)
// IMPORTANTE: Reemplaza TU_ID con el ID real de tu website
const API_URL = \`http://localhost:3000/api/v1/delivery/websites/TU_ID/pages/room\${isPreview ? \`?preview=true&nocache=\${Date.now()}\` : ''}\`;

// 4. Preparamos los Headers. Si es preview, inyectamos la Autorización.
const fetchHeaders: HeadersInit = isPreview 
  ? { 
      'Cache-Control': 'no-cache',
      'Authorization': \`Bearer \${import.meta.env.PREVIEW_SECRET}\` // <-- Arquitectura Limpia
    } 
  : {};

let data = [];
let error = null;

try {
  // 5. Hacemos el fetch seguro
  const res = await fetch(API_URL, {
      cache: isPreview ? 'no-store' : 'force-cache',
      headers: fetchHeaders
  });

  if (!res.ok) throw new Error(\`API Error: \${res.status}\`);
  const json = await res.json();
  data = json.blocks || []; // Ajusta según tu estructura de respuesta
  
} catch (e) {
  console.error("Error fetching data:", e);
  error = e.message;
}
---

<MainLayout>
  {isPreview && (
    <div style="background:#9D2B48;color:white;text-align:center;padding:0.5rem;font-weight:bold;">
        MODO VISTA PREVIA
    </div>
  )}

  {error ? (
    <div class="p-4 bg-red-100 text-red-700 rounded-lg">Error: {error}</div>
  ) : (
    /* Renderiza tus bloques aquí */
    data.map(block => (
        <div class="mb-8">
            <h2 class="text-2xl font-bold">{block.content?.title}</h2>
            <!-- ... resto del componente -->
        </div>
    ))
  )}
</MainLayout>`}</code>
                        </pre>
                    </div>
                </div>

                {/* NEXT.JS */}
                <div id="nextjs" className="mb-12 scroll-mt-28">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">⚛️ Next.js (App Router)</h3>
                    <p className="text-sm text-slate-500 mb-4">Archivo: <code>app/[slug]/page.tsx</code></p>
                    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800 text-sm">
                        <pre className="p-4 overflow-x-auto text-slate-300">
                            <code>{`export default async function CMSPage({ 
params, 
searchParams 
}: { 
params: { slug: string },
searchParams: { preview?: string }
}) {
const isPreview = searchParams.preview === 'true';
const siteId = "TU_SITE_ID"; 

// En Next.js App Router, 'revalidate: 0' mata el caché
const res = await fetch(\`https://api...\`, {
cache: isPreview ? 'no-store' : 'force-cache',
next: { revalidate: isPreview ? 0 : 60 }
});

// ... resto del código
}`}</code>
                        </pre>
                    </div>
                </div>

                {/* REACT */}
                <div id="react" className="mb-12 scroll-mt-28">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">🌐 React / Vite (SPA)</h3>
                    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800 text-sm">
                        <pre className="p-4 overflow-x-auto text-slate-300">
                            <code>{`useEffect(() => {
const fetchCMS = async () => {
// ... lógica de fetch
};

fetchCMS();

// LISTENER MAGICO: Recarga cuando el CMS lo pide
const handleRefresh = () => fetchCMS();
window.addEventListener('refresh-preview', handleRefresh);
return () => window.removeEventListener('refresh-preview', handleRefresh);

}, [slug, isPreview]);`}</code>
                        </pre>
                    </div>
                </div>

                {/* VANILLA JS */}
                <div id="vanilla" className="scroll-mt-28">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">📜 Vanilla JS / HTML Nativo</h3>
                    <p className="text-sm text-slate-500 mb-4">Para sitios ultra-ligeros sin frameworks de construcción.</p>
                    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800 text-sm">
                        <pre className="p-4 overflow-x-auto text-slate-300">
                            <code>{`<!-- index.html -->
<div id="app"></div>

<script>
const params = new URLSearchParams(window.location.search);
const isPreview = params.get('preview') === 'true';
const siteId = "TU_SITE_ID";
const slug = window.location.pathname.replace('/', '') || 'home';

async function loadContent() {
    const timestamp = isPreview ? \`&t=\${Date.now()}\` : '';
    const url = \`https://api.tusitio.com/v1/...\${timestamp}\`;
    
    const res = await fetch(url);
    const { data } = await res.json();
    
    const app = document.getElementById('app');
    app.innerHTML = \`<h1>\${data.title}</h1>\`;
}

loadContent();

// Escuchar evento del CMS
window.addEventListener('refresh-preview', () => {
    console.log("Recargando...");
    loadContent();
});
</script>`}</code>
                        </pre>
                    </div>
                </div>

            </section>
        </article>
    );
}
