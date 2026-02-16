'use client';

import { useReducer, useState, useEffect } from 'react';
import { savePageBlocks } from '@/app/lib/actions'; 
import { initialState, builderReducer } from './reducer';
import BlockList from './block-list';
import SchemaEditor from './schema-editor';
import { Block, BlockField } from './types';

export default function BlockBuilder({ pageId, initialBlocks }: { pageId: string, initialBlocks: Block[] }) {
    const [state, dispatch] = useReducer(builderReducer, {
        ...initialState,
        blocks: initialBlocks,
    });

    // ── ESTADOS PARA REDIMENSIONAR EL PANEL ──
    const [editorWidth, setEditorWidth] = useState(340); // Ancho inicial
    const [isResizing, setIsResizing] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing) return;
            // Calculamos el nuevo ancho restando la posición del mouse del borde derecho de la pantalla
            const newWidth = document.body.clientWidth - e.clientX;
            // Ponemos límites para que no sea ni muy pequeño ni ocupe toda la pantalla
            if (newWidth > 300 && newWidth < 800) {
                setEditorWidth(newWidth);
            }
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            document.body.style.cursor = 'default'; // Restaurar cursor
        };

        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'col-resize'; // Forzar cursor mientras se arrastra
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    // ── FUNCIONES DEL REDUCER ──
    const handleAddBlock = () => dispatch({ type: 'ADD_BLOCK', payload: { name: 'Nueva Sección' } });
    const handleUpdateName = (name: string) => state.selectedBlockId && dispatch({ type: 'UPDATE_BLOCK_NAME', payload: { id: state.selectedBlockId, name } });
    const handleAddField = (field: BlockField) => state.selectedBlockId && dispatch({ type: 'ADD_FIELD', payload: { blockId: state.selectedBlockId, field } });
    const handleRemoveField = (fieldKey: string) => state.selectedBlockId && dispatch({ type: 'REMOVE_FIELD', payload: { blockId: state.selectedBlockId, fieldKey } });
    const handleDeleteBlock = () => state.selectedBlockId && dispatch({ type: 'DELETE_BLOCK', payload: { id: state.selectedBlockId } });
    const handleReorder = (newBlocks: Block[]) => dispatch({ type: 'SET_BLOCKS', payload: newBlocks });
    const handleSelectBlock = (id: string) => dispatch({ type: 'SELECT_BLOCK', payload: { id } });
    const handleDeleteBlockId = (id: string) => dispatch({ type: 'DELETE_BLOCK', payload: { id } });

    const handleSave = async () => {
        try {
            await savePageBlocks(pageId, state.blocks);
            alert('¡Cambios guardados con éxito!'); 
        } catch (error) {
            console.error("Error al guardar:", error);
            alert('Hubo un error al guardar.');
        }
    };

    const selectedBlock = state.blocks.find(b => b.id === state.selectedBlockId);

    return (
        <div className="relative flex h-[calc(100vh-100px)] border rounded-2xl overflow-hidden border-zinc-200 bg-white shadow-sm">
            
            {/* Panel Izquierdo: Lista de Bloques */}
            <BlockList 
                blocks={state.blocks} 
                selectedBlockId={state.selectedBlockId} 
                onSelectBlock={handleSelectBlock}
                onAddBlock={handleAddBlock}
                onReorder={handleReorder}
                onDeleteBlock={handleDeleteBlockId}
            />
            
            {/* ── BARRA ARRASTRABLE (RESIZER) ── */}
            {selectedBlock && (
                <div 
                    onMouseDown={() => setIsResizing(true)}
                    className={`w-1.5 hover:w-2 cursor-col-resize z-50 flex flex-col justify-center items-center transition-all duration-150 ${isResizing ? 'bg-[#9D2B48] w-2' : 'bg-zinc-200 hover:bg-[#9D2B48]/50'}`}
                >
                    {/* Pequeño grip visual (los 3 puntitos) */}
                    <div className="h-8 w-0.5 flex flex-col justify-between items-center opacity-50">
                        <div className="w-0.5 h-0.5 rounded-full bg-zinc-600"></div>
                        <div className="w-0.5 h-0.5 rounded-full bg-zinc-600"></div>
                        <div className="w-0.5 h-0.5 rounded-full bg-zinc-600"></div>
                    </div>
                </div>
            )}

            {/* Panel Derecho: Editor de Esquema */}
            {selectedBlock ? (
                <div style={{ width: editorWidth }} className="flex-shrink-0 relative">
                    <SchemaEditor 
                        block={selectedBlock}
                        onUpdateName={handleUpdateName}
                        onAddField={handleAddField}
                        onUpdateField={(key, field) => state.selectedBlockId && dispatch({ type: 'UPDATE_FIELD', payload: { blockId: state.selectedBlockId, fieldKey: key, field } })}
                        onRemoveField={handleRemoveField}
                        onDeleteBlock={handleDeleteBlock}
                    />
                </div>
            ) : (
                <div className="w-80 border-l border-zinc-200 bg-zinc-50 flex flex-col items-center justify-center text-center p-8 flex-shrink-0">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-zinc-100">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-zinc-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.077-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.048 4.025a3 3 0 0 1-2.4-2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.077-.78-.22-1.128wZm0 0a15.998 15.998 0 0 1 3.388-1.62M6.75 6.75h.75v.75h-.75v-.75Zm0 0h.75V6h-.75v.75Zm0 0h.75V6h-.75v.75ZM6.75 6.75v.75h-.75v-.75h.75ZM10.5 6.75h.75v.75h-.75v-.75Zm0 0h.75V6h-.75v.75Zm0 0h.75V6h-.75v.75ZM10.5 6.75v.75h-3.75v-.75h.75Zm0 0v.75h-.75v-.75h.75ZM14.25 6.75h.75v.75h-.75v-.75Zm0 0h.75V6h-.75v.75Zm0 0h.75V6h-.75v.75ZM14.25 6.75v.75h-3.75v-.75h.75Z" />
                        </svg>
                    </div>
                    <h3 className="text-zinc-900 font-bold text-sm mb-1">Ningún bloque seleccionado</h3>
                    <p className="text-zinc-500 text-xs max-w-[200px]">Selecciona un bloque de la lista para editar su estructura y campos.</p>
                </div>
            )}

             {/* Botón Flotante de Guardar */}
             {/* El botón ahora flota siempre a 24px (right-6) del borde del panel izquierdo, empujado por el ancho del editor */}
             <div 
                className="absolute bottom-6 z-10 pointer-events-none transition-all duration-75"
                style={{ right: selectedBlock ? editorWidth + 24 : 320 + 24 }}
             >
                 <button 
                    onClick={handleSave}
                    className="pointer-events-auto bg-[#9D2B48] hover:bg-[#83223b] text-white px-6 py-3 rounded-xl font-bold shadow-xl shadow-[#9D2B48]/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                 >
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z" clipRule="evenodd" />
                     </svg>
                     <span>Guardar Cambios</span>
                 </button>
             </div>
        </div>
    );
}