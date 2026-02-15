'use client';

import { useReducer, useEffect } from 'react';
import { savePageBlocks } from '@/app/lib/actions'; // We will create this
import { initialState, builderReducer } from './reducer'; // We created this
import BlockList from './block-list';
import SchemaEditor from './schema-editor';
import { Block, BlockField } from './types';

export default function BlockBuilder({ pageId, initialBlocks }: { pageId: string, initialBlocks: Block[] }) {
    const [state, dispatch] = useReducer(builderReducer, {
        ...initialState,
        blocks: initialBlocks,
    });

    const handleAddBlock = () => {
        dispatch({ type: 'ADD_BLOCK', payload: { name: 'New Section' } });
    };

    const handleUpdateName = (name: string) => {
        if (state.selectedBlockId) {
            dispatch({ type: 'UPDATE_BLOCK_NAME', payload: { id: state.selectedBlockId, name } });
        }
    };

    const handleAddField = (field: BlockField) => {
        if (state.selectedBlockId) {
            dispatch({ type: 'ADD_FIELD', payload: { blockId: state.selectedBlockId, field } });
        }
    };

    const handleRemoveField = (fieldKey: string) => {
        if (state.selectedBlockId) {
             dispatch({ type: 'REMOVE_FIELD', payload: { blockId: state.selectedBlockId, fieldKey } });
        }
    };
    
    const handleDeleteBlock = () => {
         if (state.selectedBlockId) {
             dispatch({ type: 'DELETE_BLOCK', payload: { id: state.selectedBlockId } });
        }
    }

    const handleSave = async () => {
        // Call server action
        await savePageBlocks(pageId, state.blocks);
        alert('Saved!'); // Temporary feedback
    };

    const handleReorder = (startIndex: number, endIndex: number) => {
        dispatch({ type: 'REORDER_BLOCKS', payload: { startIndex, endIndex } });
    };

    const handleSelectBlock = (id: string) => {
        dispatch({ type: 'SELECT_BLOCK', payload: { id } });
    };

     const handleDeleteBlockId = (id: string) => {
        dispatch({ type: 'DELETE_BLOCK', payload: { id } });
    };

    const selectedBlock = state.blocks.find(b => b.id === state.selectedBlockId);

    return (
        <div className="flex h-[calc(100vh-100px)] border rounded-lg overflow-hidden border-zinc-200 dark:border-zinc-800">
            <BlockList 
                blocks={state.blocks} 
                selectedBlockId={state.selectedBlockId} 
                onSelectBlock={handleSelectBlock}
                onAddBlock={handleAddBlock}
                onReorder={handleReorder}
                onDeleteBlock={handleDeleteBlockId}
            />
            {selectedBlock ? (
                <SchemaEditor 
                    block={selectedBlock}
                    onUpdateName={handleUpdateName}
                    onAddField={handleAddField}
                    onUpdateField={(key, field) => {
                         if (state.selectedBlockId) {
                             dispatch({ type: 'UPDATE_FIELD', payload: { blockId: state.selectedBlockId, fieldKey: key, field } });
                         }
                    }}
                    onRemoveField={handleRemoveField}
                    onDeleteBlock={handleDeleteBlock}
                />
            ) : (
                 <div className="w-80 border-l border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-8 flex items-center justify-center text-center text-zinc-500">
                    <p>Select a block to configure its schema.</p>
                </div>
            )}
             <div className="absolute bottom-6 right-6 z-10">
                 <button 
                    onClick={handleSave}
                    className="bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-700 dark:hover:bg-gray-200 px-6 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105"
                 >
                     Save Changes
                 </button>
             </div>
        </div>
    );
}
