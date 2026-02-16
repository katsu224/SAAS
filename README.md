This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Variables de Entorno (.env)

Asegúrate de agregar las siguientes variables a tu archivo `.env` en la raíz del proyecto para conectar los servicios correctamente:

```bash
AUTH_SECRET="KbNOfhdgxAQlw9TUk+jA2V+g=ERUBD+7HdJGSILC2"
# Conexión a tu nueva BD en Supabase
DATABASE_URL="postgresql://postgres:c3-CgYqQH-yVNQN@db.bfbjgefievbscdxudxtn.supabase.co:5432/postgres"

# El secreto compartido para Live Preview (CMS <-> Web)
PREVIEW_SECRET="ultra_secreto_9273"

# Cloudinary (Configuración de subida de imágenes - Paso 4)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="tu_cloud_name"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="tu_preset_sin_firma"
```

### Explicación de Variables

- **AUTH_SECRET**: Clave secreta para la encriptación de sesiones de Auth.js.
- **DATABASE_URL**: URL de conexión PostgreSQL (ej. Supabase).
- **PREVIEW_SECRET**: Clave privada compartida entre el CMS y el Frontend para autorizar vistas previas.
- **NEXT*PUBLIC_CLOUDINARY*...**: Credenciales públicas para la subida de imágenes directa desde el cliente.

## Integración con Frontend (Astro)

Para conectar el CMS con tu sitio en Astro y habilitar el **Live Preview**, sigue estos pasos:

### ✅ PASO 4: Que Astro valide y envíe el Token al Backend

Ahora le enseñaremos a Astro a leer ese `?token=` del Iframe, validarlo, y enviar la petición a la API de Next.js con el Header de Autorización.

**Archivo en tu proyecto Astro:** `src/pages/room.astro`

```typescript
import MainLayout from "../layouts/MainLayout.astro";
// ... tus otros imports

// 1. Astro lee el token de la URL (viene del Iframe del CMS)
const previewToken = Astro.url.searchParams.get("token");

// 2. Astro compara el token de la URL con su propio .env
const isPreview = previewToken === import.meta.env.PREVIEW_SECRET;

// 3. Preparamos la URL de la API (con nocache si es preview)
// IMPORTANTE: Reemplaza TU_ID con el ID real de tu website
const API_URL = `http://localhost:3000/api/v1/delivery/websites/TU_ID/pages/room${isPreview ? `?preview=true&nocache=${Date.now()}` : ""}`;

// 4. Preparamos los Headers. Si es preview, inyectamos la Autorización.
const fetchHeaders: HeadersInit = isPreview
  ? {
      "Cache-Control": "no-cache",
      Authorization: `Bearer ${import.meta.env.PREVIEW_SECRET}`, // <-- Arquitectura Limpia
    }
  : {};

let rooms = [];
// ... headerData y error

try {
  // 5. Hacemos el fetch seguro
  const res = await fetch(API_URL, {
    cache: isPreview ? "no-store" : "force-cache",
    headers: fetchHeaders,
  });

  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  const json = await res.json();

  // Asumiendo que la respuesta tiene la estructura de tus bloques
  rooms = json.blocks || []; // Ajusta según tu estructura de respuesta principal

  // ... resto de tu mapeo de bloques (rooms = rawData.map...)
} catch (error) {
  console.error("Error fetching data:", error);
}
```
