import { Block } from './types';
import { QueueListIcon, ChevronUpIcon, ChevronDownIcon, TrashIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

interface BlockListProps {
    blocks: Block[];
    selectedBlockId: string | null;
    onSelectBlock: (id: string) => void;
    onAddBlock: () => void;
    onReorder: (startIndex: number, endIndex: number) => void;
    onDeleteBlock: (id: string) => void;
}

export default function BlockList({ blocks, selectedBlockId, onSelectBlock, onAddBlock, onReorder, onDeleteBlock }: BlockListProps) {
    return (
        <div className="flex-grow p-8 bg-gray-100 dark:bg-zinc-900 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold">Page Layout</h2>
                    <button 
                        onClick={onAddBlock}
                        className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 shadow-sm"
                    >
                        + Add Block
                    </button>
                </div>

                <div className="space-y-4">
                    {blocks.length === 0 && (
                        <div className="text-center py-12 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg">
                            <QueueListIcon className="w-12 h-12 text-zinc-400 mx-auto mb-2" />
                            <p className="text-zinc-500">This page is empty. Add a block to get started!</p>
                        </div>
                    )}
                    {blocks.map((block, index) => (
                        <div 
                            key={block.id}
                            className={clsx(
                                "p-4 rounded-lg border transition-all hover:shadow-md flex items-center gap-4",
                                selectedBlockId === block.id 
                                ? "bg-white dark:bg-zinc-950 border-blue-500 ring-1 ring-blue-500" 
                                : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
                            )}
                        >
                            <div className="flex flex-col gap-1">
                                <button 
                                    disabled={index === 0}
                                    onClick={(e) => { e.stopPropagation(); onReorder(index, index - 1); }}
                                    className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded disabled:opacity-30"
                                >
                                    <ChevronUpIcon className="w-4 h-4 text-zinc-500" />
                                </button>
                                <button 
                                    disabled={index === blocks.length - 1}
                                    onClick={(e) => { e.stopPropagation(); onReorder(index, index + 1); }}
                                    className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded disabled:opacity-30"
                                >
                                    <ChevronDownIcon className="w-4 h-4 text-zinc-500" />
                                </button>
                            </div>

                            <div 
                                className="flex-grow cursor-pointer"
                                onClick={() => onSelectBlock(block.id)}
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{block.name}</h3>
                                    <span className="text-xs text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                                        {block.admin_schema.length} Fields
                                    </span>
                                </div>
                                <div className="mt-2 text-xs text-zinc-500 truncate">
                                    {block.admin_schema.map(f => f.label).join(', ')}
                                </div>
                            </div>
                             <button 
                                onClick={(e) => { e.stopPropagation(); onDeleteBlock(block.id); }}
                                className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
