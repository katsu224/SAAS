-- Habilitar extensión UUID para mayor seguridad
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABLA ADMINS (Tú y tu equipo interno)
CREATE TABLE admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABLA TENANTS (Tus clientes / Los usuarios finales)
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL, -- Ej: "Sarah Miller"
    status VARCHAR(50) DEFAULT 'active', 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABLA WEBSITES (Los proyectos web de cada cliente)
CREATE TABLE websites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL, -- Ej: "Hotel Paradise"
    base_url VARCHAR(255), 
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. TABLA PAGES (Las rutas dentro de un website)
CREATE TABLE pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    website_id UUID NOT NULL REFERENCES websites(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL, -- Ej: "Inicio"
    slug VARCHAR(255) NOT NULL, -- Ej: "/home"
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (website_id, slug) -- Evita rutas duplicadas en la misma web
);

-- 5. TABLA BLOCKS (El motor dinámico de tu CMS)
CREATE TABLE blocks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
    admin_id UUID REFERENCES admins(id) ON DELETE SET NULL, -- Para saber si tú creaste este bloque
    
    name VARCHAR(255) NOT NULL, -- Ej: "Hero Principal"
    order_index INTEGER NOT NULL, -- El orden en la página (0, 1, 2...)
    
    -- LA ESTRUCTURA (Lo que tú configuras: los inputs)
    admin_schema JSONB NOT NULL DEFAULT '[]', 
    
    -- EL CONTENIDO (Lo que tu cliente llena: textos, fotos)
    tenant_content JSONB NOT NULL DEFAULT '{}',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);