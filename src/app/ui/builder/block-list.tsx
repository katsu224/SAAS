'use client';

import { Block } from './types';
import { 
    QueueListIcon, 
    ChevronUpIcon, 
    ChevronDownIcon, 
    TrashIcon,
    PlusIcon,
    Squares2X2Icon,
    Bars2Icon
} from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import { Reorder, AnimatePresence } from 'framer-motion';

interface BlockListProps {
    blocks: Block[];
    selectedBlockId: string | null;
    onSelectBlock: (id: string) => void;
    onAddBlock: () => void;
    onReorder: (newBlocks: Block[]) => void;
    onDeleteBlock: (id: string) => void;
}

export default function BlockList({ blocks, selectedBlockId, onSelectBlock, onAddBlock, onReorder, onDeleteBlock }: BlockListProps) {
    
    // Función para manejar el reordenamiento manual por flechas
    const moveBlock = (currentIndex: number, direction: 'up' | 'down') => {
        const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
        if (newIndex < 0 || newIndex >= blocks.length) return;

        const newBlocks = [...blocks];
        const [movedBlock] = newBlocks.splice(currentIndex, 1);
        newBlocks.splice(newIndex, 0, movedBlock);
        
        // Actualizamos el JSON con el nuevo orden
        onReorder(newBlocks.map((b, i) => ({ ...b, order_index: i })));
    };

    return (
        <div className="flex-grow p-8 bg-zinc-50 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-8 border-b border-zinc-200 pb-5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#9D2B48]/10 rounded-lg">
                            <Squares2X2Icon className="w-5 h-5 text-[#9D2B48]" />
                        </div>
                        <h2 className="text-xl font-bold text-zinc-800 tracking-tight">Estructura de la Página 📐</h2>
                    </div>
                    <button 
                        onClick={onAddBlock}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#9D2B48] text-white rounded-xl text-sm font-bold hover:bg-[#83223b] transition-all shadow-md shadow-[#9D2B48]/20 active:scale-95"
                    >
                        <PlusIcon className="w-4 h-4 stroke-2" />
                        Añadir Bloque
                    </button>
                </div>

                {/* Contenedor de Reordenamiento Animado */}
                <Reorder.Group 
                    axis="y" 
                    values={blocks} 
                    onReorder={(newOrder) => onReorder(newOrder.map((b, i) => ({ ...b, order_index: i })))}
                    className="space-y-4"
                >
                    <AnimatePresence>
                        {blocks.length === 0 ? (
                            <div className="text-center py-16 border-2 border-dashed border-zinc-300 rounded-2xl bg-white">
                                <QueueListIcon className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                                <p className="text-zinc-500 font-medium">No hay bloques. ¡Añade uno para empezar!</p>
                            </div>
                        ) : (
                            blocks.map((block, index) => (
                                <Reorder.Item 
                                    key={block.id} 
                                    value={block}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className={clsx(
                                        "relative group overflow-hidden rounded-2xl border transition-all duration-300 flex items-center gap-4 bg-white p-5 cursor-grab active:cursor-grabbing",
                                        selectedBlockId === block.id 
                                        ? "border-[#9D2B48] shadow-lg ring-4 ring-[#9D2B48]/5" 
                                        : "border-zinc-200 hover:shadow-md shadow-sm"
                                    )}
                                >
                                    {/* Línea decorativa magenta */}
                                    <div className={clsx(
                                        "absolute left-0 top-0 bottom-0 w-1.5 bg-[#9D2B48] transition-transform origin-bottom duration-300",
                                        selectedBlockId === block.id ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
                                    )}></div>

                                    {/* Tirador y Flechas */}
                                    <div className="flex items-center gap-2 border-r border-zinc-100 pr-4">
                                        <Bars2Icon className="w-5 h-5 text-zinc-300 mr-1" />
                                        <div className="flex flex-col gap-1">
                                            <button 
                                                disabled={index === 0}
                                                onClick={(e) => { e.stopPropagation(); moveBlock(index, 'up'); }}
                                                className="p-1 hover:bg-zinc-100 rounded text-zinc-400 hover:text-[#9D2B48] disabled:opacity-10"
                                            >
                                                <ChevronUpIcon className="w-4 h-4 stroke-2" />
                                            </button>
                                            <button 
                                                disabled={index === blocks.length - 1}
                                                onClick={(e) => { e.stopPropagation(); moveBlock(index, 'down'); }}
                                                className="p-1 hover:bg-zinc-100 rounded text-zinc-400 hover:text-[#9D2B48] disabled:opacity-10"
                                            >
                                                <ChevronDownIcon className="w-4 h-4 stroke-2" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Info del Bloque */}
                                    <div className="flex-grow cursor-pointer" onClick={() => onSelectBlock(block.id)}>
                                        <div className="flex justify-between items-center mb-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className={clsx("font-bold text-sm", selectedBlockId === block.id ? "text-[#9D2B48]" : "text-zinc-800")}>
                                                    {block.name}
                                                </h3>
                                                {/* MEJORA: Indicador de campos configurados */}
                                                <span className="text-[10px] font-semibold text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded-md">
                                                    {block.admin_schema.length} campo{block.admin_schema.length !== 1 && 's'}
                                                </span>
                                            </div>
                                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest bg-zinc-50 px-2 py-1 rounded border border-zinc-100">
                                                ID: {block.id.split('-')[0]}
                                            </span>
                                        </div>
                                        <p className="text-xs text-zinc-400 italic mt-1">Orden de renderizado: {block.order_index}</p>
                                    </div>

                                    <button 
                                        onClick={(e) => { e.stopPropagation(); onDeleteBlock(block.id); }}
                                        className="p-2 text-zinc-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                        title="Eliminar bloque"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </Reorder.Item>
                            ))
                        )}
                    </AnimatePresence>
                </Reorder.Group>
            </div>
        </div>
    );
}