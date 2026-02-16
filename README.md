# 🚀 SaaS CMS Multi-Tenant Enterprise

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg) ![License](https://img.shields.io/badge/license-MIT-green.svg) ![Status](https://img.shields.io/badge/status-development-orange.svg)

> **Una plataforma CMS de próxima generación diseñada para la escalabilidad, rendimiento y experiencia de usuario premium.**

Este proyecto es una solución **SaaS (Software as a Service)** completa que permite la creación y gestión de múltiples sitios web (tenants) desde una única instalación. Construido con las tecnologías más modernas y robustas del ecosistema React.

---

## 🏗️ Arquitectura del Sistema

La arquitectura está diseñada para ser **Stateless** y **Horizontalmente Escalable**. Utilizamos un modelo de separación lógica de datos para garantizar la seguridad y el rendimiento entre clientes.

```mermaid
graph TD
    User[👤 Usuario Final]
    Admin[👮 Administrador]

    subgraph "Edge Network (CDN)"
        Middleware[🛡️ Middleware (Next.js)]
    end

    subgraph "Application Core"
        App[💻 Next.js App (Server & Client)]
        Auth[🔐 NextAuth.js (Auth)]
        API[🔌 API Routes / Actions]
    end

    subgraph "Data Layer"
        DB[(🗄️ PostgreSQL)]
        Prisma[🏗️ Prisma ORM]
    end

    User -->|Visita subdominio| Middleware
    Admin -->|Gestiona| Middleware
    Middleware -->|Enruta| App
    App --> Auth
    App --> API
    API --> Prisma
    Prisma --> DB

    style User fill:#f9f,stroke:#333,stroke-width:2px
    style Admin fill:#bbf,stroke:#333,stroke-width:2px
    style DB fill:#bfb,stroke:#333,stroke-width:2px
```

---

## ✨ Características Principales

### 🏢 Multi-Tenancy Real

Soporte nativo para múltiples organizaciones y sitios web utilizando **subdominios** dinámicos. Cada cliente tiene su propio espacio aislado pero compartiendo la misma infraestructura optimizada.

### 🎨 Visual Builder Avanzado

Un editor de contenido "arrastrar y soltar" que permite a los usuarios construir páginas complejas sin tocar una línea de código.

- **Bloques Reutilizables**: Hero, Features, Testimonials, etc.
- **Edición en Tiempo Real**: Lo que ves es lo que obtienes (WYSIWYG).

### 🔐 Seguridad de Grado Enterprise

- **Autenticación**: Integración completa con **NextAuth.js v5**.
- **Roles y Permisos**: Sistema granular (Admin, Editor, Viewer).
- **Protección de Datos**: Validación estricta con **Zod**.

### ⚡ Performance Extremo

- **Server Components**: Renderizado híbrido para máxima velocidad.
- **Edge Caching**: Contenido estático servido desde el borde.
- **Optimización de Imágenes**: Procesamiento automático con Next/Image.

---

## 🛠️ Stack Tecnológico

Este proyecto se basa en "The Modern Stack" para garantizar mantenibilidad y futuro.

| Categoría         | Tecnología                                                        | Descripción                    |
| ----------------- | ----------------------------------------------------------------- | ------------------------------ |
| **Core**          | ![Next.js](https://img.shields.io/badge/Next.js-15-black)         | Framework React de producción. |
| **Lenguaje**      | ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)     | Tipado estático para robustez. |
| **Estilos**       | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-cyan) | Diseño rápido y consistente.   |
| **Base de Datos** | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)    | Motor SQL relacional potente.  |
| **ORM**           | ![Prisma](https://img.shields.io/badge/Prisma-5-white)            | Acceso a datos tipo-seguro.    |
| **Auth**          | ![NextAuth](https://img.shields.io/badge/NextAuth.js-v5-purple)   | Autenticación flexible.        |

---

## 🚀 Guía de Inicio Rápido

Sigue estos pasos para levantar el entorno de desarrollo local.

### 1. Prerrequisitos

Asegúrate de tener instalado:

- Node.js 18+
- PostgreSQL (Local o Docker)

### 2. Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/saas-cms.git

# Entrar al directorio
cd saas-cms

# Instalar dependencias
npm install
```

### 3. Configuración de Entorno

Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/saas_db"
NEXTAUTH_SECRET="tu_secreto_super_seguro"
```

### 4. Base de Datos

```bash
# Sincronizar esquema de Prisma
npx prisma db push

# (Opcional) Poblar con datos de prueba
npm run seed
```

### 5. Ejecutar

```bash
npm run dev
```

Visita `http://localhost:3000` para ver la aplicación.

---

## 📂 Estructura del Proyecto

```
/src
  ├── /app           # Rutas y Páginas (App Router)
  │   ├── /api       # Endpoints de API
  │   ├── /doc       # Documentación interna
  │   ├── /tenant    # Rutas dinámicas para clientes
  │   └── page.tsx   # Landing page principal
  ├── /components    # Componentes React reutilizables
  ├── /lib           # Utilidades y configuración (Prisma, Auth)
  └── /types         # Definiciones de tipos TypeScript
```

---

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor, lee nuestras guías de contribución antes de enviar un PR.

1. Haz un Fork del proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Haz Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

<div align="center">
  <p>Construido con ❤️ por el equipo de Desarrollo</p>
  <p>© 2026 SaaS CMS Inc.</p>
</div>
