export type BlockFieldType = 'text' | 'textarea' | 'image' | 'color' | 'repeater';

export interface BlockField {
    key: string;
    label: string;
    type: BlockFieldType;
    defaultValue?: string;
    subSchema?: BlockField[]; // For repeater type
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
