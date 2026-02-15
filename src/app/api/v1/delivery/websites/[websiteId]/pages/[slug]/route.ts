import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ websiteId: string; slug: string }> }
) {
  const { websiteId, slug } = await params;

  if (!websiteId || !slug) {
    return NextResponse.json({ error: 'Missing websiteId or slug' }, { status: 400 });
  }

  const client = await pool.connect();

  try {
    // Optimized query to fetch Page + Blocks in one go
    // We use LEFT JOIN to ensure we get the page even if it has no blocks
    // We use inner SELECT or GROUP BY to aggregate blocks
    
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
              'content', b.tenant_content
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

    // Post-processing to clean and normalize content
    // 1. Remove "zombie" fields (content not in schema)
    // 2. Transform weird keys (field_123) to readable keys (field_label)
    const blocks = rawPageData.blocks.map((block: any) => {
        const cleanContent: Record<string, any> = {};
        const schema = block.schema || [];

        schema.forEach((field: any) => {
            const rawKey = field.key;
            const rawValue = block.content[rawKey];
            
            // Generate a pretty key from label (e.g., "Lista de Cuartos" -> "lista_de_cuartos")
            // Fallback to rawKey if label is missing
            const prettyKey = field.label 
                ? field.label.toLowerCase().trim().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '')
                : rawKey;

            // Handle Repeater keys recursively if needed, but for now just the top level
            if (field.type === 'repeater' && Array.isArray(rawValue)) {
                cleanContent[prettyKey] = rawValue.map((item: any) => {
                    const cleanItem: Record<string, any> = {};
                    (field.subSchema || []).forEach((sub: any) => {
                         const subPrettyKey = sub.key; // subKeys are usually manually defined (room_name), keep them or sanitize?
                         // In our current repeater logic, subKeys are like 'room_name', which is already good.
                         // But if they were generated, we might want to clean them too.
                         // For now, let's keep subKeys as is since they are usually 'room_name', 'room_image' etc.
                         cleanItem[subPrettyKey] = item[sub.key];
                    });
                    return cleanItem;
                });
            } else {
                cleanContent[prettyKey] = rawValue;
            }
        });

        return {
            id: block.id,
            name: `${block.name}`,
            type: block.name.toLowerCase().replace(/[^a-z0-9]+/g, '_'), // Slugify block name as type
            order: block.order,
            content: cleanContent
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
          'Access-Control-Allow-Origin': '*', // Public API
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Cache-Control': 'no-store, must-revalidate' // Disable cache for dev/testing
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
