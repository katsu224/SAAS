import { BuilderState, BlockAction, Block } from './types';

export const initialState: BuilderState = {
    blocks: [],
    selectedBlockId: null,
};

export function builderReducer(state: BuilderState, action: BlockAction): BuilderState {
    switch (action.type) {
        case 'ADD_BLOCK':
            const newBlock: Block = {
                id: crypto.randomUUID(),
                name: action.payload.name,
                order_index: state.blocks.length,
                admin_schema: [],
                tenant_content: {}, // Inicializa vacío
            };
            return {
                ...state,
                blocks: [...state.blocks, newBlock],
                selectedBlockId: newBlock.id,
            };

        case 'UPDATE_BLOCK_NAME':
            return {
                ...state,
                blocks: state.blocks.map(b => 
                    b.id === action.payload.id ? { ...b, name: action.payload.name } : b
                ),
            };

        case 'ADD_FIELD':
            return {
                ...state,
                blocks: state.blocks.map(b => {
                    if (b.id === action.payload.blockId) {
                        return { ...b, admin_schema: [...b.admin_schema, action.payload.field] };
                    }
                    return b;
                }),
            };

         case 'UPDATE_FIELD':
            return {
                ...state,
                blocks: state.blocks.map(b => {
                    if (b.id === action.payload.blockId) {
                        const oldKey = action.payload.fieldKey;
                        const newKey = action.payload.field.key;
                        
                        // 1. Actualizamos el esquema
                        const newSchema = b.admin_schema.map(f => f.key === oldKey ? action.payload.field : f);
                        
                        // 2. PROTECCIÓN DE DATOS: Si la llave (Key) cambió, migramos el contenido
                        const newContent = { ...b.tenant_content };
                        if (oldKey !== newKey && newContent[oldKey] !== undefined) {
                            newContent[newKey] = newContent[oldKey]; // Movemos el valor a la nueva llave
                            delete newContent[oldKey];               // Borramos la llave vieja
                        }

                        return { ...b, admin_schema: newSchema, tenant_content: newContent };
                    }
                    return b;
                }),
            };

        case 'REMOVE_FIELD':
            return {
                ...state,
                blocks: state.blocks.map(b => {
                    if (b.id === action.payload.blockId) {
                        const keyToRemove = action.payload.fieldKey;

                        // PROTECCIÓN DE DATOS: Limpiamos la basura del contenido si se borra el campo
                        const newContent = { ...b.tenant_content };
                        delete newContent[keyToRemove];

                        return { 
                            ...b, 
                            admin_schema: b.admin_schema.filter(f => f.key !== keyToRemove),
                            tenant_content: newContent // Guardamos el contenido limpio
                        };
                    }
                    return b;
                }),
            };

        case 'REORDER_BLOCKS':
            const result = Array.from(state.blocks);
            const [removed] = result.splice(action.payload.startIndex, 1);
            result.splice(action.payload.endIndex, 0, removed);
            return {
                ...state,
                blocks: result.map((b, index) => ({ ...b, order_index: index })),
            };

        case 'SELECT_BLOCK':
            return {
                ...state,
                selectedBlockId: action.payload.id,
            };

        case 'DELETE_BLOCK':
            return {
                ...state,
                blocks: state.blocks.filter(b => b.id !== action.payload.id),
                selectedBlockId: state.selectedBlockId === action.payload.id ? null : state.selectedBlockId,
            };

        case 'SET_BLOCKS':
             return {
                ...state,
                blocks: action.payload,
            };

        default:
            return state;
    }
}