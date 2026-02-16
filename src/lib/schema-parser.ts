// Archivo: lib/schema-parser.ts

export function hydrateBlockContent(schema: any[], realContent: Record<string, any> = {}): Record<string, any> {
    const result: Record<string, any> = {};

    schema.forEach(field => {
        // 1. Si el cliente ya guardó un dato real, lo usamos
        if (realContent[field.key] !== undefined && realContent[field.key] !== null && realContent[field.key] !== "") {
            result[field.key] = realContent[field.key];
            return;
        }

        // 2. Si está vacío, generamos un dato de ejemplo según el tipo
        switch (field.type) {
            case 'text':
                result[field.key] = `Ejemplo de ${field.label}`;
                break;
            case 'textarea':
            case 'richtext':
                result[field.key] = `Texto de ejemplo para ${field.label}. Este es un texto temporal porque el cliente aún no ha llenado este campo en el CMS.`;
                break;
            case 'image':
                const encodedLabel = encodeURIComponent(field.label || 'Imagen');
                result[field.key] = `https://via.placeholder.com/800x600/f4f4f5/9D2B48?text=${encodedLabel}`;
                break;
            case 'boolean':
                result[field.key] = false;
                break;
            case 'number':
                result[field.key] = field.min ?? 0;
                break;
            case 'repeater':
                // Si es un repetidor vacío, le creamos 1 elemento de prueba
                if (field.subSchema && field.subSchema.length > 0) {
                    result[field.key] = [hydrateBlockContent(field.subSchema, {})];
                } else {
                    result[field.key] = [];
                }
                break;
            default:
                result[field.key] = "";
        }
    });

    return result;
}