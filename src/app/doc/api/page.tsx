
import { 
    CommandLineIcon, 
    DevicePhoneMobileIcon, 
    GlobeAltIcon,
    ServerIcon,
    ShieldCheckIcon,
    CodeBracketIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function ApiPage() {
    return (
        <article className="prose prose-slate prose-lg max-w-none">
            <header className="mb-12">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">API Reference (v1)</h1>
                <p className="text-xl text-slate-500 leading-relaxed">
                    La API de Entrega es el corazón del sistema. Es RESTful, está cacheada en el Edge y devuelve JSON puro.
                    Diseñada para ser consumida por cualquier frontend (Next.js, Astro, Mobile Apps).
                </p>
                <div className="flex items-center gap-2 mt-4">
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded border border-green-200">Stable v1.0</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded border border-blue-200">HTTPS only</span>
                    <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2 py-1 rounded border border-purple-200">Rate Limit: 1000req/min</span>
                </div>
            </header>

            {/* MAIN ENDPOINT */}
            <section id="endpoints" className="mb-24 scroll-mt-24">
                <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-8 pb-2 border-b border-slate-100">
                    <ServerIcon className="w-8 h-8 text-[#9D2B48]" />
                    Endpoints Principales
                </h2>

                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">1. Obtener Página por Slug</h3>
                    <p className="mb-4 text-slate-600">
                        Este es el endpoint que usarás el 99% del tiempo. Devuelve todos los metadatos y bloques de una página específica.
                    </p>

                    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-800 mb-6">
                        <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
                            <span className="bg-green-500 text-slate-900 text-xs font-bold px-2 py-1 rounded">GET</span>
                            <span className="text-slate-400 font-mono text-sm">/api/v1/delivery/websites/<span className="text-yellow-400">{`{siteId}`}</span>/pages/<span className="text-yellow-400">{`{slug}`}</span></span>
                        </div>
                        <div className="p-6 overflow-x-auto">
                            <div className="flex gap-4 mb-4 border-b border-slate-700 pb-4">
                                <button className="text-white font-bold border-b-2 border-green-500 pb-1">cURL</button>
                                <button className="text-slate-500 hover:text-white transition">JavaScript</button>
                                <button className="text-slate-500 hover:text-white transition">Python</button>
                            </div>
                            <code className="text-sm text-green-400 font-mono block mb-4">
                                curl -X GET \<br/>
                                &nbsp;&nbsp;"https://tu-dominio-cms.com/api/v1/delivery/websites/site_123/pages/inicio?preview=false" \<br/>
                                &nbsp;&nbsp;-H "Accept: application/json"
                            </code>
                        </div>
                    </div>

                    <h4 className="font-bold text-slate-800 mt-6 mb-4">Query Parameters</h4>
                    <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-3 font-semibold">Param</th>
                                    <th className="px-6 py-3 font-semibold">Type</th>
                                    <th className="px-6 py-3 font-semibold">Description</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-100">
                                <tr>
                                    <td className="px-6 py-4 font-mono text-[#9D2B48]">preview</td>
                                    <td className="px-6 py-4"><code>boolean</code></td>
                                    <td className="px-6 py-4 text-slate-600">
                                        Si es <code>true</code>, devuelve datos del borrador (draft). Requiere validar token de sesión si activas seguridad estricta.
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-mono text-[#9D2B48]">locale</td>
                                    <td className="px-6 py-4"><code>string</code></td>
                                    <td className="px-6 py-4 text-slate-600">
                                        (Opcional) Código de idioma (ej: <code>en-US</code>). Si no existe traducción, hace fallback al idioma por defecto.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mb-12">
                     <h3 className="text-2xl font-bold text-slate-800 mb-4">2. Obtener Configuración del Sitio</h3>
                     <p className="mb-4 text-slate-600">
                         Devuelve datos globales como logo, colores, fuentes y menús de navegación. Útil para el <code>Layout.tsx</code>.
                     </p>
                     <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800">
                        <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
                            <span className="bg-green-500 text-slate-900 text-xs font-bold px-2 py-1 rounded">GET</span>
                            <span className="text-slate-400 font-mono text-sm">/api/v1/delivery/websites/<span className="text-yellow-400">{`{siteId}`}</span></span>
                        </div>
                     </div>
                </div>
            </section>

             {/* RESPONSE FORMAT */}
             <section id="format" className="mb-24 scroll-mt-24">
                <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-8 pb-2 border-b border-slate-100">
                    <CodeBracketIcon className="w-8 h-8 text-[#9D2B48]" />
                    Formato de Respuesta
                </h2>
                <p className="mb-6">
                    Todas las respuestas exitosas siguen el sobre (envelope) estandar `data`.
                </p>

                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-slate-900 p-6 rounded-2xl text-slate-300 font-mono text-sm overflow-x-auto border border-slate-800">
<pre>
{`{
  "data": {
    "id": "page_123",
    "slug": "inicio",
    "title": "Home Page",
    "seo": { ... },
    "blocks": [
       {
         "id": "blk_1",
         "type": "hero",
         "content": { ... }
       },
       {
         "id": "blk_2",
         "type": "features",
         "content": { ... }
       }
    ]
  },
  "meta": {
    "generated_at": 16798234,
    "version": "v1.2.0"
  }
}`}
</pre>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <strong className="text-slate-900 block mb-4">Estructura del Objeto Data</strong>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">seo</span>
                                <span className="text-sm text-slate-600">Objeto con title, description, ogImage. Listo para inyectar en <code>&lt;head&gt;</code>.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">blocks</span>
                                <span className="text-sm text-slate-600">Array ordenado. Tu frontend debe iterar este array y renderizar el componente correspondiente según <code>type</code>.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

             {/* ERRORS */}
             <section id="errors" className="mb-24 scroll-mt-24">
                <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-8 pb-2 border-b border-slate-100">
                    <ExclamationTriangleIcon className="w-8 h-8 text-[#9D2B48]" />
                    Manejo de Errores
                </h2>
                <div className="overflow-hidden rounded-xl border border-slate-200">
                    <table className="w-full text-sm text-left">
                         <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3">HTTP Code</th>
                                <th className="px-6 py-3">Error Code</th>
                                <th className="px-6 py-3">Significado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            <tr>
                                <td className="px-6 py-4 font-bold text-red-600">404 Not Found</td>
                                <td className="px-6 py-4 font-mono"><code>PAGE_NOT_FOUND</code></td>
                                <td className="px-6 py-4 text-slate-600">El slug solicitado no existe o no está publicado. Redirige a tu página 404.</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-bold text-orange-600">401 Unauthorized</td>
                                <td className="px-6 py-4 font-mono"><code>INVALID_TOKEN</code></td>
                                <td className="px-6 py-4 text-slate-600">Intentaste acceder con <code>preview=true</code> pero el token de seguridad es inválido o expiró.</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-bold text-slate-900">429 Too Many Requests</td>
                                <td className="px-6 py-4 font-mono"><code>RATE_LIMIT_EXCEEDED</code></td>
                                <td className="px-6 py-4 text-slate-600">Has superado las 1000 req/min. Implementa backoff exponencial.</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-bold text-slate-900">500 Internal Error</td>
                                <td className="px-6 py-4 font-mono"><code>SERVER_ERROR</code></td>
                                <td className="px-6 py-4 text-slate-600">Error inesperado en nuestra infraestructura. Reintenta más tarde.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

        </article>
    );
}
