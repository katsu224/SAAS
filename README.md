<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/NextAuth.js-v5-000?style=for-the-badge&logo=auth0&logoColor=white" alt="NextAuth" />
</p>

<h1 align="center">🏗️ SaaS CMS Multi-Tenant</h1>

<p align="center">
  <strong>Plataforma CMS empresarial de próxima generación.</strong><br/>
  Crea, gestiona y escala múltiples sitios web desde una sola instalación.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-0.1.0-blue?style=flat-square" alt="Version" />
  <img src="https://img.shields.io/badge/estado-en_desarrollo-orange?style=flat-square" alt="Estado" />
  <img src="https://img.shields.io/badge/licencia-MIT-green?style=flat-square" alt="Licencia" />
</p>

---

## 📖 Tabla de Contenidos

- [Visión General](#-visión-general)
- [Arquitectura](#%EF%B8%8F-arquitectura-del-sistema)
- [Flujo de Autenticación](#-flujo-de-autenticación)
- [Modelo de Datos](#-modelo-de-datos)
- [Características](#-características-principales)
- [Stack Tecnológico](#%EF%B8%8F-stack-tecnológico)
- [Inicio Rápido](#-inicio-rápido)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Modelo de Negocio](#-modelo-de-negocio-saas)
- [Roadmap](#-roadmap)
- [Contribución](#-contribución)

---

## 🌟 Visión General

Este proyecto es una solución **SaaS** completa que permite a empresas y agencias lanzar sitios web profesionales sin escribir código. Cada cliente (tenant) obtiene su propio espacio aislado con un **Visual Builder** de arrastrar y soltar, gestión de contenido dinámica, y entrega de páginas optimizada para SEO.

> 💡 **¿Por qué este proyecto?** Combina la flexibilidad de un CMS headless con la facilidad de uso de un constructor visual, todo bajo un modelo multi-tenant que escala de 1 a 10,000 clientes sin cambiar la infraestructura.

### Propuesta de Valor

| Para quién             | Beneficio                                                      |
| ---------------------- | -------------------------------------------------------------- |
| 🏢 **Agencias**        | Revenden sitios web con marca blanca a sus clientes.           |
| 👨‍💼 **Emprendedores**   | Lanzan un SaaS vertical (CMS para dentistas, restaurantes...). |
| 🧑‍💻 **Desarrolladores** | Base de código limpia y extensible para construir sobre ella.  |

---

## 🏛️ Arquitectura del Sistema

La arquitectura está diseñada para ser **Stateless** y **Horizontalmente Escalable**. Cada capa tiene una responsabilidad única y puede escalar de forma independiente.

```mermaid
graph TD
    A["👤 Usuario Final"] --> B["🛡️ Middleware Next.js"]
    C["👮 Admin / Tenant"] --> B

    subgraph Frontend
        B --> D["💻 App Router - Server Components"]
        D --> E["🎨 Visual Builder - Client Components"]
    end

    subgraph Backend
        D --> F["⚡ Server Actions"]
        D --> G["🔌 API REST v1"]
        F --> H["🔐 NextAuth v5"]
        G --> H
    end

    subgraph Datos
        F --> I["📦 Prisma ORM"]
        G --> I
        I --> J[("🗄️ PostgreSQL")]
    end

    style A fill:#E8F5E9,stroke:#4CAF50,stroke-width:2px,color:#000
    style C fill:#E3F2FD,stroke:#2196F3,stroke-width:2px,color:#000
    style J fill:#FFF3E0,stroke:#FF9800,stroke-width:2px,color:#000
    style B fill:#FCE4EC,stroke:#E91E63,stroke-width:2px,color:#000
```

### Principios de Diseño

| Principio                  | Implementación                                                    |
| -------------------------- | ----------------------------------------------------------------- |
| **Separación de capas**    | Frontend, Backend y Datos desacoplados.                           |
| **Sin estado en memoria**  | Cada request es independiente — escala horizontal trivial.        |
| **Seguridad por defecto**  | Middleware protege TODAS las rutas antes de llegar al App Router. |
| **Tipo-seguro end-to-end** | TypeScript + Zod desde el formulario hasta la base de datos.      |

---

## 🔑 Flujo de Autenticación

El sistema soporta dos tipos de usuarios con flujos diferenciados:

```mermaid
sequenceDiagram
    participant U as 👤 Usuario
    participant M as 🛡️ Middleware
    participant A as 🔐 NextAuth
    participant DB as 🗄️ Base de Datos

    U->>M: Accede a /login
    M->>M: Verifica si es ruta pública
    M-->>U: Permite acceso al formulario

    U->>A: Envía email + contraseña
    A->>DB: Busca usuario por email
    DB-->>A: Retorna usuario + hash

    alt Credenciales válidas
        A->>A: Compara hash con bcrypt
        A-->>U: Sesión JWT creada
        Note over U,M: Cookie httpOnly con token
        U->>M: Navega a /dashboard
        M->>M: Verifica rol del JWT
        alt Es Admin
            M-->>U: Redirige a /dashboard
        else Es Tenant
            M-->>U: Redirige a /tenant/dashboard
        end
    else Credenciales inválidas
        A-->>U: Error de autenticación
    end
```

---

## 💾 Modelo de Datos

Relaciones principales entre las entidades del sistema:

```mermaid
erDiagram
    USER ||--o{ ORGANIZATION_MEMBER : "pertenece a"
    ORGANIZATION ||--o{ ORGANIZATION_MEMBER : "tiene"
    ORGANIZATION ||--o{ WEBSITE : "posee"
    WEBSITE ||--o{ PAGE : "contiene"
    PAGE ||--o{ BLOCK : "tiene"
    WEBSITE ||--o{ COLLECTION : "define"
    COLLECTION ||--o{ CONTENT_ITEM : "almacena"

    USER {
        uuid id PK
        string email UK
        string name
        string password_hash
        enum role "admin | tenant"
    }

    ORGANIZATION {
        uuid id PK
        string name
        string slug UK
    }

    WEBSITE {
        uuid id PK
        string name
        string subdomain UK
        string custom_domain
    }

    PAGE {
        uuid id PK
        string title
        string slug
        json meta_tags
    }

    BLOCK {
        uuid id PK
        string type
        int order
        json schema_def
        json content
    }

    COLLECTION {
        uuid id PK
        string name
        string slug
        json fields_schema
    }

    CONTENT_ITEM {
        uuid id PK
        json data
        enum status "draft | published"
    }
```

---

## ✨ Características Principales

<table>
  <tr>
    <td width="50%">
      <h3>🏢 Multi-Tenancy Real</h3>
      <p>Cada organización tiene su propio espacio aislado con subdominios dinámicos. La separación lógica de datos garantiza seguridad total entre clientes.</p>
      <ul>
        <li>Subdominios automáticos</li>
        <li>Dominio personalizado (Pro)</li>
        <li>Aislamiento total de datos</li>
      </ul>
    </td>
    <td width="50%">
      <h3>🎨 Visual Builder</h3>
      <p>Editor de arrastrar y soltar con preview en tiempo real. Los usuarios diseñan páginas complejas sin código.</p>
      <ul>
        <li>Bloques modulares (Hero, Cards, etc.)</li>
        <li>Schema dinámico por bloque</li>
        <li>Edición WYSIWYG en vivo</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🔐 Seguridad Enterprise</h3>
      <p>Autenticación robusta con NextAuth v5 y validación end-to-end con Zod.</p>
      <ul>
        <li>JWT con cookies httpOnly</li>
        <li>Roles granulares (Admin, Tenant)</li>
        <li>Middleware protector en todas las rutas</li>
      </ul>
    </td>
    <td width="50%">
      <h3>⚡ Alto Rendimiento</h3>
      <p>React Server Components, Edge Caching y renderizado híbrido para tiempos de carga sub-segundo.</p>
      <ul>
        <li>Server Components por defecto</li>
        <li>Streaming y Suspense</li>
        <li>Optimización automática de imágenes</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🔌 API REST Pública</h3>
      <p>Endpoints versionados para la entrega de contenido (Headless CMS). Ideal para frontends custom o apps móviles.</p>
      <ul>
        <li><code>GET /api/v1/delivery/websites/:id/pages/:slug</code></li>
        <li>Respuestas JSON estructuradas</li>
        <li>Soporte para colecciones dinámicas</li>
      </ul>
    </td>
    <td width="50%">
      <h3>📚 Documentación Integrada</h3>
      <p>Portal de documentación completo accesible desde <code>/doc</code> con guías, API reference, recetas y casos de uso.</p>
      <ul>
        <li>9 secciones de documentación</li>
        <li>Ejemplos de código prácticos</li>
        <li>Sidebar con navegación intuitiva</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🛠️ Stack Tecnológico

```mermaid
mindmap
  root(("🛠️ Tech Stack"))
    Frontend
      Next.js 16
      React 19
      Tailwind CSS 4
      Framer Motion
      Heroicons
    Backend
      Server Actions
      API Routes
      NextAuth v5
      Zod Validation
    Base de Datos
      PostgreSQL
      Prisma ORM
    Infraestructura
      Vercel Edge
      CDN Global
      SSL Automático
```

| Dependencia     | Versión  | Rol                                |
| --------------- | -------- | ---------------------------------- |
| `next`          | `16.1.6` | Framework fullstack con App Router |
| `react`         | `19.2.3` | Librería UI con Server Components  |
| `tailwindcss`   | `4.x`    | Sistema de diseño utility-first    |
| `next-auth`     | `5.x`    | Autenticación con JWT y sesiones   |
| `zod`           | `4.x`    | Validación de esquemas en runtime  |
| `framer-motion` | `12.x`   | Animaciones fluidas y transiciones |
| `bcrypt`        | `6.x`    | Hash seguro de contraseñas         |
| `pg`            | `8.x`    | Driver nativo de PostgreSQL        |

---

## 🚀 Inicio Rápido

### Prerrequisitos

- **Node.js** 18 o superior
- **PostgreSQL** 15+ (local o Docker)
- **Git**

### Instalación paso a paso

```bash
# 1️⃣  Clonar el repositorio
git clone https://github.com/tu-usuario/saas-cms.git
cd saas-cms

# 2️⃣  Instalar dependencias
npm install

# 3️⃣  Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de PostgreSQL y secretos

# 4️⃣  Inicializar la base de datos
npx prisma db push

# 5️⃣  Levantar el servidor de desarrollo
npm run dev
```

> 🎉 Abre tu navegador en **http://localhost:3000** y ¡listo!

### Variables de Entorno Requeridas

```env
# Base de datos
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/saas_cms"

# Autenticación
AUTH_SECRET="genera_un_string_aleatorio_aqui"

# (Opcional) Dominio base para multi-tenancy
NEXT_PUBLIC_ROOT_DOMAIN="localhost:3000"
```

---

## 📂 Estructura del Proyecto

```
SAASintento8/
├── 📄 README.md                    ← Estás aquí
├── 📄 package.json                 ← Dependencias y scripts
├── 📄 .env                         ← Variables de entorno (no versionado)
│
└── src/
    └── app/
        ├── 🏠 page.tsx             ← Landing page principal
        ├── 🎨 globals.css          ← Estilos globales (Tailwind)
        ├── 📐 layout.tsx           ← Layout raíz de la aplicación
        │
        ├── 🔐 login/              ← Página de inicio de sesión
        ├── 🛡️ register-admin-secret/ ← Registro de administradores
        │
        ├── 📊 dashboard/           ← Panel de administración global
        │   ├── tenants/            ← Gestión de organizaciones
        │   └── sites/              ← Gestión de sitios web
        │
        ├── 🏢 tenant/              ← Panel del tenant/cliente
        │   └── dashboard/
        │       └── sites/[id]/
        │           └── pages/[pageId]/ ← Visual Builder
        │
        ├── 🔌 api/
        │   └── v1/delivery/        ← API REST para entrega de contenido
        │
        ├── 📚 doc/                 ← Portal de documentación
        │   ├── architecture/       ← Arquitectura técnica
        │   ├── business/           ← Modelo de negocio
        │   ├── features/           ← Características principales
        │   ├── concepts/           ← Conceptos básicos
        │   ├── api/                ← Referencia de API
        │   ├── integration/        ← Guías de integración
        │   ├── modeling/           ← Modelo de datos
        │   ├── recipes/            ← Recetas y patrones
        │   └── use-cases/          ← Casos de uso reales
        │
        ├── 🧩 ui/                  ← Componentes reutilizables
        │   ├── builder/            ← Componentes del Visual Builder
        │   ├── dashboard/          ← Componentes del dashboard
        │   ├── tenant/             ← Componentes del panel tenant
        │   └── sites/              ← Componentes de gestión de sitios
        │
        └── 📦 lib/                 ← Utilidades (Auth, DB, Actions)
```

---

## 💰 Modelo de Negocio SaaS

La arquitectura Multi-Tenant permite servir a miles de clientes con infraestructura compartida, maximizando márgenes.

```mermaid
graph LR
    subgraph Tiers
        F["🆓 Freemium<br/>$0/mes<br/>1 sitio, marca de agua"]
        P["⭐ Pro<br/>$29/mes<br/>Dominio propio, 10K visitas"]
        A["🚀 Agency<br/>$99/mes<br/>Multi-sitio, marca blanca"]
    end

    F -->|"Conversión"| P
    P -->|"Upgrade"| A

    style F fill:#F5F5F5,stroke:#9E9E9E,stroke-width:2px,color:#000
    style P fill:#E8F5E9,stroke:#4CAF50,stroke-width:3px,color:#000
    style A fill:#E3F2FD,stroke:#2196F3,stroke-width:2px,color:#000
```

| Métrica                | Objetivo Año 1 | Objetivo Año 2 |
| ---------------------- | -------------- | -------------- |
| **Clientes Activos**   | 100            | 1,000          |
| **MRR**                | $2,900         | $29,000        |
| **Tasa de Conversión** | 5%             | 10%            |
| **Churn Mensual**      | < 5%           | < 3%           |

---

## 🗺️ Roadmap

- [x] ~~Arquitectura Multi-Tenant base~~
- [x] ~~Autenticación con NextAuth v5~~
- [x] ~~Visual Builder con bloques dinámicos~~
- [x] ~~API REST para entrega de contenido~~
- [x] ~~Portal de documentación completo~~
- [ ] Editor de estilos visual (colores, fuentes)
- [ ] Sistema de templates predefinidos
- [ ] Analíticas por sitio (visitas, páginas vistas)
- [ ] Facturación con Stripe
- [ ] Marketplace de bloques

---

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Sigue estos pasos:

```bash
# 1. Fork del repositorio
# 2. Crear rama de feature
git checkout -b feature/mi-nueva-funcionalidad

# 3. Hacer commit
git commit -m "feat: añadir nueva funcionalidad increíble"

# 4. Push y abrir PR
git push origin feature/mi-nueva-funcionalidad
```

> 📌 Usamos [Conventional Commits](https://www.conventionalcommits.org/) para los mensajes de commit.

---

<div align="center">
  <br/>

**Construido con ❤️ y ☕ por el equipo de desarrollo**

<sub>© 2026 SaaS CMS — Todos los derechos reservados</sub>

<br/><br/>

<a href="#%EF%B8%8F-saas-cms-multi-tenant">⬆️ Volver arriba</a>

</div>
