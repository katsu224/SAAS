// Definimos todos los tipos de campos posibles para un CMS robusto
export type BlockFieldType = 
    | 'text' 
    | 'textarea' 
    | 'richtext' // Añadido: Para editores WYSIWYG (negritas, enlaces)
    | 'image' 
    | 'color' 
    | 'repeater' 
    | 'select'   // Añadido: Para dropdowns (ej. elegir variante de diseño)
    | 'boolean'  // Añadido: Para switches (sí/no)
    | 'number'   // Añadido: Para cantidades, espaciados, etc.
    | 'url';     // Añadido: Para enlaces validados

// Interfaz para las opciones del campo 'select'
export interface SelectOption {
    label: string;
    value: string;
}

export interface BlockField {
    key: string;
    label: string;
    type: BlockFieldType;
    
    // MEJORA: Cambiamos de 'string' a 'any' para soportar 
    // booleanos (true/false), números (10), o arrays en repetidores.
    defaultValue?: any; 
    
    // MEJORAS DE UX Y VALIDACIÓN (Crucial para multi-tenant)
    placeholder?: string; // Texto tenue dentro del input vacío
    helpText?: string;    // Textito debajo del input para guiar al cliente ("Sube una imagen de 800x600px")
    required?: boolean;   // ¿Es obligatorio llenarlo para guardar?
    
    // PROPIEDADES ESPECÍFICAS POR TIPO DE CAMPO
    subSchema?: BlockField[]; // Solo se usa si type === 'repeater'
    options?: SelectOption[]; // Solo se usa si type === 'select'
    min?: number;             // Solo se usa si type === 'number'
    max?: number;             // Solo se usa si type === 'number'
}

export interface Block {
    id: string; // Temporary ID for UI or UUID from DB
    name: string; // e.g., "Hero Section"
    order_index: number;
    admin_schema: BlockField[];
    tenant_content: Record<string, any>;
}

export type BlockAction = 
    | { type: 'ADD_BLOCK'; payload: { name: string } }
    | { type: 'UPDATE_BLOCK_NAME'; payload: { id: string; name: string } }
    | { type: 'ADD_FIELD'; payload: { blockId: string; field: BlockField } }
    | { type: 'UPDATE_FIELD'; payload: { blockId: string; fieldKey: string; field: BlockField } }
    | { type: 'REMOVE_FIELD'; payload: { blockId: string; fieldKey: string } }
    | { type: 'REORDER_BLOCKS'; payload: { startIndex: number; endIndex: number } }
    | { type: 'SELECT_BLOCK'; payload: { id: string } }
    | { type: 'SET_BLOCKS'; payload: Block[] }
    | { type: 'DELETE_BLOCK'; payload: { id: string } };

export interface BuilderState {
    blocks: Block[];
    selectedBlockId: string | null;
}