
import { 
    ShoppingBagIcon, 
    RocketLaunchIcon, 
    BuildingOfficeIcon,
    CurrencyDollarIcon,
    MegaphoneIcon,
    UserGroupIcon,
    HomeModernIcon,
    CakeIcon,
    BriefcaseIcon,
    CodeBracketIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';

export default function UseCasesPage() {
    return (
        <article className="prose prose-slate prose-lg max-w-none">
            <header className="mb-12">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Casos de Uso Reales & Ejemplos Completos</h1>
                <p className="text-xl text-slate-500 leading-relaxed">
                    Este CMS no es solo para blogs. Su arquitectura agnóstica permite construir desde plataformas de e-commerce complejas hasta portafolios minimalistas.
                    Aquí encontrarás guías detalladas, schemas JSON listos para copiar y patrones de arquitectura para diferentes industrias.
                </p>
                <div className="flex gap-2 flex-wrap mt-4">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold">E-Commerce</span>
                    <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-bold">Landing Pages</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">Corporativo</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Real Estate</span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">Restaurantes</span>
                </div>
            </header>

            {/* --- E-COMMERCE --- */}
            <section id="ecommerce" className="mb-24 scroll-mt-24">
                <div className="flex items-center gap-4 mb-8 pb-4 border-b border-slate-200">
                    <div className="p-3 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
                        <ShoppingBagIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 m-0">E-Commerce Headless</h2>
                        <p className="text-slate-500 text-lg m-0">Integración con Shopify/Stripe + CMS para Marketing</p>
                    </div>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-12 mb-12">
                     <div>
                        <h3 className="text-xl font-bold text-slate-800 mb-4">El Desafío</h3>
                        <p className="text-slate-600 mb-4">
                            Las plataformas de e-commerce (Shopify, BigCommerce) son excelentes para gestionar el carrito y el checkout, pero horribles para crear landings ricas en contenido visual.
                        </p>
                        <h3 className="text-xl font-bold text-slate-800 mb-4">La Solución</h3>
                        <p className="text-slate-600">
                            Usar el CMS para gestionar la "vitrina" (Home, Landing de Producto, Lookbooks) y componentes de React hidratados para los botones de "Añadir al Carrito" que hablan directamente con la API del e-commerce.
                        </p>
                     </div>
                     <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                        <h4 className="font-bold text-slate-400 text-xs uppercase tracking-widest mb-4">Arquitectura Recomendada</h4>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-700">1</div>
                                <div>
                                    <strong className="block text-slate-900">CMS (Backend)</strong>
                                    <span className="text-slate-500 text-sm">Almacena textos de marketing, imágenes de lifestyle y el <code>product_id</code> externo.</span>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-700">2</div>
                                <div>
                                    <strong className="block text-slate-900">Frontend (Next.js/Astro)</strong>
                                    <span className="text-slate-500 text-sm">Pide el contenido al CMS al momento de construir la página (SSG/ISR).</span>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-700">3</div>
                                <div>
                                    <strong className="block text-slate-900">Browser (Client)</strong>
                                    <span className="text-slate-500 text-sm">Usa el <code>product_id</code> para pedir Precio y Stock en tiempo real a Shopify.</span>
                                </div>
                            </li>
                        </ul>
                     </div>
                </div>

                <div className="bg-slate-900 rounded-xl overflow-hidden shadow-xl border border-slate-800 mb-8">
                    <div className="flex items-center justify-between px-6 py-3 bg-slate-800 border-b border-slate-700">
                        <span className="text-indigo-400 font-mono font-bold">schema-product-hero.json</span>
                        <span className="text-xs text-slate-400">Modelado del Bloque</span>
                    </div>
                    <pre className="p-6 overflow-x-auto text-slate-300 text-sm">
                        <code>{`[
  {
    "name": "productId",
    "label": "ID de Producto (Shopify/Stripe)",
    "type": "text",
    "required": true,
    "helperText": "Ej: prod_8273x82"
  },
  {
    "name": "marketingTitle",
    "label": "Título de Marketing",
    "type": "text",
    "helperText": "Sobrescribe el nombre oficial del producto si es necesario"
  },
  {
    "name": "theme",
    "label": "Tema de Color",
    "type": "select",
    "options": [
        {"label": "Dark Mode", "value": "dark"},
        {"label": "Light Clean", "value": "light"},
        {"label": "Vibrant", "value": "vibrant"}
    ]
  },
  {
    "name": "features",
    "label": "Lista de Beneficios",
    "type": "repeater",
    "fields": [
        {"name": "icon", "type": "select", "options": [...]},
        {"name": "text", "type": "text"}
    ]
  }
]`}</code>
                    </pre>
                </div>

                <div className="bg-slate-900 rounded-xl overflow-hidden shadow-xl border border-slate-800">
                    <div className="flex items-center justify-between px-6 py-3 bg-slate-800 border-b border-slate-700">
                        <span className="text-blue-400 font-mono font-bold">ProductHero.jsx</span>
                        <span className="text-xs text-slate-400">Implementación Frontend (React)</span>
                    </div>
                    <pre className="p-6 overflow-x-auto text-slate-300 text-sm">
                        <code>{`import { useProductPrice } from '@/hooks/useShopify'; // Tu hook custom

export default function ProductHero({ data }) {
  // 1. Datos estáticos del CMS (Instantáneos, SEO-friendly)
  const { productId, marketingTitle, theme, features } = data;
  
  // 2. Datos dinámicos del E-commerce (Client-side)
  const { price, stock, isLoading } = useProductPrice(productId);

  const themeClasses = theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900';

  return (
    <section className={\`py-20 \${themeClasses}\`}>
      <div className="container mx-auto grid md:grid-cols-2 gap-12">
         {/* Marketing Content */}
         <div>
            <h1 className="text-5xl font-bold mb-6">{marketingTitle}</h1>
            <ul className="mb-8 space-y-2">
                {features.map((f, i) => (
                    <li key={i} className="flex gap-2">✅ {f.text}</li>
                ))}
            </ul>
            
            {/* Price & CTA */}
            <div className="flex items-center gap-4">
                <div className="text-2xl font-mono">
                    {isLoading ? <span className="animate-pulse">Loading...</span> : \`$\${price}\`}
                </div>
                <button 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-bold transition-all disabled:opacity-50"
                  disabled={stock === 0}
                >
                    {stock > 0 ? 'Añadir al Carrito' : 'Agotado'}
                </button>
            </div>
            {stock < 5 && stock > 0 && (
                <p className="text-red-500 text-sm mt-2">¡Solo quedan {stock} unidades!</p>
            )}
         </div>
      </div>
    </section>
  );
}`}</code>
                    </pre>
                </div>
            </section>

            {/* --- LANDING PAGES --- */}
            <section id="landing-pages" className="mb-24 scroll-mt-24">
                <div className="flex items-center gap-4 mb-8 pb-4 border-b border-slate-200">
                    <div className="p-3 bg-pink-600 rounded-xl shadow-lg shadow-pink-200">
                        <RocketLaunchIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 m-0">Landing Pages High-Performance</h2>
                        <p className="text-slate-500 text-lg m-0">Campañas PPC, Lanzamientos y Lead Magnets</p>
                    </div>
                </div>

                <p className="mb-6">
                    En marketing digital, la velocidad de iteración es clave. Un equipo de marketing debe poder duplicar una landing, cambiar el H1, cambiar la imagen de fondo y lanzar una prueba A/B en minutos, sin pedirle a un desarrollador que haga un deploy.
                </p>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                        <h3 className="text-base font-bold text-slate-700 m-0">Blueprint de Bloques Esenciales</h3>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">Conversion Driven</span>
                    </div>
                    <div className="p-6 grid gap-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center shrink-0 font-bold text-pink-600">1</div>
                            <div>
                                <h4 className="font-bold text-slate-800 m-0 text-lg">Hero Split con Formulario</h4>
                                <p className="text-sm text-slate-500 mt-1">
                                    Divide la pantalla: Valor a la izquierda, Formulario de captura a la derecha. 
                                    <br/><strong>Campos CMS:</strong> <code>headline</code>, <code>subheadline</code>, <code>formEndpoint</code>, <code>bgImage</code>.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                             <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center shrink-0 font-bold text-pink-600">2</div>
                             <div>
                                 <h4 className="font-bold text-slate-800 m-0 text-lg">Social Proof Grid</h4>
                                 <p className="text-sm text-slate-500 mt-1">
                                     Logos de empresas o Avatares de usuarios felices.
                                     <br/><strong>Campos CMS:</strong> <code>logos</code> (Repeater de imágenes), <code>grayscale</code> (Toggle).
                                 </p>
                             </div>
                         </div>
                         <div className="flex items-start gap-4">
                             <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center shrink-0 font-bold text-pink-600">3</div>
                             <div>
                                 <h4 className="font-bold text-slate-800 m-0 text-lg">FAQ Accordion</h4>
                                 <p className="text-sm text-slate-500 mt-1">
                                     Resuelve objeciones de venta antes de que ocurran.
                                     <br/><strong>Campos CMS:</strong> <code>questions</code> (Repeater: <code>question</code>, <code>answer</code>).
                                 </p>
                             </div>
                         </div>
                    </div>
                </div>
            </section>

             {/* --- REAL ESTATE --- */}
             <section id="real-estate" className="mb-24 scroll-mt-24">
                <div className="flex items-center gap-4 mb-8 pb-4 border-b border-slate-200">
                    <div className="p-3 bg-green-600 rounded-xl shadow-lg shadow-green-200">
                        <HomeModernIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 m-0">Real Estate & Propiedades</h2>
                        <p className="text-slate-500 text-lg m-0">Listados inmobiliarios, Tours Virtuales y Fichas Técnicas</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                     <div className="prose prose-slate">
                        <p>
                            Las webs inmobiliarias requieren datos estructurados muy específicos (Metros cuadrados, Nº Habitaciones, Certificado Energético).
                            Con nuestro CMS, puedes crear un bloque "PropertyDetails" que encapsule toda esta lógica.
                        </p>
                        <h4 className="flex items-center gap-2">
                            <MapPinIcon className="w-5 h-5 text-red-500"/> Integración de Mapas
                        </h4>
                        <p>
                            Puedes añadir campos `lat` y `lng` (números) en tu schema y usar librerías como Mapbox o Google Maps en el frontend para renderizar la ubicación exacta.
                        </p>
                     </div>
                     <div className="bg-slate-900 text-slate-300 p-6 rounded-2xl border border-slate-800 shadow-xl">
                        <h4 className="text-green-400 font-bold mb-4 font-mono text-xs uppercase">schema.json (Propiedad)</h4>
                        <pre className="text-xs overflow-x-auto leading-5">
{`{
  "type": "property-details",
  "content": {
    "price": 450000,
    "features": {
        "bedrooms": 3,
        "bathrooms": 2,
        "area_m2": 120,
        "garden": true
    },
    "location": {
        "lat": 40.4168,
        "lng": -3.7038,
        "address": "Calle Gran Vía, 42"
    },
    "virtualTourUrl": "https://matterport.com/..."
  }
}`}
                        </pre>
                     </div>
                </div>
            </section>

            {/* --- RESTAURANT --- */}
            <section id="restaurant" className="mb-24 scroll-mt-24">
                <div className="flex items-center gap-4 mb-8 pb-4 border-b border-slate-200">
                    <div className="p-3 bg-orange-500 rounded-xl shadow-lg shadow-orange-200">
                        <CakeIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 m-0">Restaurantes & Menús Digitales</h2>
                        <p className="text-slate-500 text-lg m-0">Cartas actualizables al instante, alérgenos y reservas.</p>
                    </div>
                </div>

                <p className="mb-8">
                    El dolor nº1 de los restaurantes es actualizar el PDF del menú. Con un CMS Headless, el menú es HTML vivo. Si se acaba el salmón, el chef (o manager) lo oculta desde el móvil en 10 segundos.
                </p>

                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                    <div className="grid md:grid-cols-[1fr_300px]">
                        <div className="p-8">
                            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-6 italic">La Trattoria - Menu (Frontend Render)</h3>
                            
                            <div className="mb-8">
                                <h4 className="text-orange-600 font-bold uppercase tracking-widest text-sm mb-4 border-b pb-2">Antipasti</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-baseline">
                                        <div>
                                            <h5 className="font-bold text-slate-800 text-lg">Bruschetta al Pomodoro</h5>
                                            <p className="text-slate-500 text-sm">Pan rústico, tomates cherry, albahaca y AOVE.</p>
                                        </div>
                                        <span className="font-mono text-slate-900 font-bold ml-4">12€</span>
                                    </div>
                                    <div className="flex justify-between items-baseline opacity-50">
                                        <div>
                                            <h5 className="font-bold text-slate-800 text-lg line-through">Carpaccio di Manzo</h5>
                                            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded font-bold ml-2">AGOTADO</span>
                                        </div>
                                        <span className="font-mono text-slate-900 font-bold ml-4">16€</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-50 border-l border-slate-200 p-6 text-sm">
                            <h4 className="font-bold text-slate-500 uppercase text-xs mb-4">Estructura de Datos</h4>
                            <p className="mb-4 text-slate-600">
                                Usamos un bloque "MenuSection" que contiene un repeater de "Dish".
                            </p>
                            <div className="space-y-2">
                                <div className="bg-white p-3 rounded border border-slate-200">
                                    <span className="block font-bold text-slate-800">Dish Object</span>
                                    <code className="text-xs text-slate-500 block mt-1">name: Text</code>
                                    <code className="text-xs text-slate-500 block">description: Text</code>
                                    <code className="text-xs text-slate-500 block">price: Number</code>
                                    <code className="text-xs text-slate-500 block">isSoldOut: Toggle</code>
                                    <code className="text-xs text-slate-500 block">allergens: MultiSelect</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* --- PORTFOLIO --- */}
             <section id="portfolio" className="mb-24 scroll-mt-24">
                <div className="flex items-center gap-4 mb-8 pb-4 border-b border-slate-200">
                    <div className="p-3 bg-teal-600 rounded-xl shadow-lg shadow-teal-200">
                        <BriefcaseIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 m-0">Portafolios Creativos</h2>
                        <p className="text-slate-500 text-lg m-0">Para diseñadores, arquitectos y fotógrafos.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                     <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <CodeBracketIcon className="w-5 h-5 text-teal-500"/>
                            El Bloque "ProjectCaseStudy"
                        </h3>
                        <p className="text-slate-600 mb-4 text-sm">
                            Un portafolio no es solo una galería. Es contar la historia de un proyecto. Este bloque permite mezclar imágenes de ancho completo, texto en dos columnas y videos.
                        </p>
                        <h4 className="font-bold text-slate-700 text-sm mb-2 mt-6">Campos Clave:</h4>
                        <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                            <li><strong>Client Name:</strong> Texto</li>
                            <li><strong>Services:</strong> Tags (UX, UI, Frontend)</li>
                            <li><strong>Year:</strong> Número</li>
                            <li><strong>Gallery:</strong> Repeater con opción de Layout (Grid, Masonry, Carousel)</li>
                        </ul>
                     </div>

                     <div className="bg-slate-900 rounded-2xl p-6 text-slate-300">
                        <h4 className="text-teal-400 font-bold mb-4 font-mono text-xs uppercase">Mejores Prácticas: Imágenes</h4>
                        <p className="text-sm mb-4">
                            En portafolios visuales, la carga de imágenes es crítica.
                        </p>
                        <ul className="space-y-3 text-sm">
                            <li className="flex gap-2">
                                <span className="text-teal-500">✓</span>
                                <span>Usa <code>Next/Image</code> o <code>Astro Image</code> para optimización automática (WebP/AVIF).</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-teal-500">✓</span>
                                <span>Añade un campo <code>blurDataURL</code> o <code>dominantColor</code> en el CMS si tu provider de imágenes lo soporta (ej: Cloudinary) para placeholders elegantes.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-teal-500">✓</span>
                                <span>Habilita Lazy Loading en todas las imágenes que no estén "Above the Fold".</span>
                            </li>
                        </ul>
                     </div>
                </div>
            </section>

        </article>
    );
}
