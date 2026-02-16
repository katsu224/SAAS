import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { hydrateBlockContent } from '@/lib/schema-parser'; // Importamos nuestro parser mágico

export const dynamic = 'force-dynamic'; // <-- Desactiva caché
export const revalidate = 0;            // <-- Desactiva revalidación

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ websiteId: string; slug: string }> }
) {
  const { websiteId, slug } = await params;

  if (!websiteId || !slug) {
    return NextResponse.json({ error: 'Missing websiteId or slug' }, { status: 400 });
  }

  // 1. LÓGICA DE SEGURIDAD PARA VISTA PREVIA (ARQUITECTURA LIMPIA)
  const url = new URL(request.url);
  const wantsPreview = url.searchParams.get('preview') === 'true';
  let isPreview = false;

  if (wantsPreview) {
      const authHeader = request.headers.get('authorization');
      const expectedToken = `Bearer ${process.env.PREVIEW_SECRET}`;
      
      // Si piden preview pero no tienen el token correcto, rechazamos la petición
      if (authHeader !== expectedToken) {
          return NextResponse.json({ error: "Unauthorized Preview. Invalid Token." }, { status: 401 });
      }
      isPreview = true; // Token válido, activamos la vista previa
  }

  const client = await pool.connect();

  try {
    // 2. Consulta optimizada para obtener Página + Bloques en una sola petición
    const query = `
      SELECT 
        p.id, 
        p.title, 
        p.slug, 
        p.created_at,
        COALESCE(
          json_agg(
            json_build_object(
              'id', b.id,
              'name', b.name,
              'order', b.order_index,
              'schema', b.admin_schema,
              'content', b.tenant_content,
              'draft_content', b.draft_content
            ) ORDER BY b.order_index ASC
          ) FILTER (WHERE b.id IS NOT NULL), 
          '[]'
        ) as blocks
      FROM pages p
      LEFT JOIN blocks b ON p.id = b.page_id
      WHERE p.website_id = $1 AND (p.slug = $2 OR p.slug = '/' || $2)
      GROUP BY p.id
    `;

    const result = await client.query(query, [websiteId, slug]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }
    
    const rawPageData = result.rows[0];

    // ── POST-PROCESAMIENTO ──
    const blocks = rawPageData.blocks.map((block: any) => {
      const schema = block.schema || [];
      
      // LA MAGIA: Elegimos qué contenido usar según si estamos en Preview SEGURO o no
      const targetContent = isPreview ? block.draft_content : block.content;
      
      // Hidratamos y limpiamos usando el targetContent elegido
      const hydratedContent = hydrateBlockContent(schema, targetContent || {});
      
      // Función recursiva para limpiar las llaves de cualquier nivel
      const sanitizeKeys = (fields: any[], contentObj: any) => {
          const cleanObj: Record<string, any> = {};
          
          fields.forEach((field: any) => {
              const rawKey = field.key;
              const value = contentObj[rawKey];
              
              // Genera llave limpia basada en la etiqueta
              const prettyKey = field.label 
                  ? field.label.toLowerCase()
                      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Quita tildes
                      .replace(/[^a-z0-9]+/g, '_')
                      .replace(/^_+|_+$/g, '') 
                  : rawKey;

              if (field.type === 'repeater' && Array.isArray(value)) {
                  cleanObj[prettyKey] = value.map((item: any) => 
                      sanitizeKeys(field.subSchema || [], item)
                  );
              } else {
                  cleanObj[prettyKey] = value;
              }
          });
          return cleanObj;
      };

      // Aplicamos la limpieza de llaves al contenido ya hidratado
      const finalContent = sanitizeKeys(schema, hydratedContent);

      return {
          id: block.id,
          name: `${block.name}`,
          type: block.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '_'),
          order: block.order,
          content: finalContent
      };
    });

    return NextResponse.json(
      { 
        data: {
            id: rawPageData.id,
            title: rawPageData.title,
            slug: rawPageData.slug,
            created_at: rawPageData.created_at,
            blocks: blocks
        },
        meta: {
            generated_at: new Date().toISOString()
        }
      },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*', 
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Cache-Control': 'no-store, must-revalidate' 
        },
      }
    );
  } catch (error) {
    console.error('Headless API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    client.release();
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}