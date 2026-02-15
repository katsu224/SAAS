import { Block, BlockField, BlockFieldType } from './types';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface SchemaEditorProps {
    block: Block;
    onUpdateName: (name: string) => void;
    onAddField: (field: BlockField) => void;
    onUpdateField: (key: string, field: BlockField) => void;
    onRemoveField: (key: string) => void;
    onDeleteBlock: () => void;
}

// Recursive component for editing fields
const FieldEditor = ({ 
    field, 
    onUpdate, 
    onRemove 
}: { 
    field: BlockField; 
    onUpdate: (updatedField: BlockField) => void; 
    onRemove: () => void; 
}) => {
    
    // Helper to add sub-field to a repeater
    const handleAddSubField = () => {
        const newSubField: BlockField = {
            key: `sub_${Date.now()}`,
            label: 'New Sub Field',
            type: 'text',
        };
        const currentSubSchema = field.subSchema || [];
        onUpdate({
            ...field,
            subSchema: [...currentSubSchema, newSubField]
        });
    };

    // Helper to update a sub-field
    const handleUpdateSubField = (index: number, updatedSub: BlockField) => {
        const currentSubSchema = field.subSchema ? [...field.subSchema] : [];
        currentSubSchema[index] = updatedSub;
        onUpdate({ ...field, subSchema: currentSubSchema });
    };

    // Helper to remove a sub-field
    const handleRemoveSubField = (index: number) => {
         const currentSubSchema = field.subSchema ? [...field.subSchema] : [];
         currentSubSchema.splice(index, 1);
         onUpdate({ ...field, subSchema: currentSubSchema });
    };

    return (
        <div className="p-3 bg-gray-50 dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800">
            <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono text-zinc-400">{field.key}</span>
                <button onClick={onRemove} className="text-zinc-400 hover:text-red-500">
                    <TrashIcon className="w-3 h-3" />
                </button>
            </div>
            
            <div className="space-y-2">
                <input
                    type="text"
                    value={field.label}
                    onChange={(e) => onUpdate({ ...field, label: e.target.value })}
                    placeholder="Label"
                    className="w-full p-1 text-sm border rounded dark:bg-zinc-950 dark:border-zinc-700"
                />
                <select
                    value={field.type}
                    onChange={(e) => onUpdate({ ...field, type: e.target.value as BlockFieldType })}
                    className="w-full p-1 text-sm border rounded dark:bg-zinc-950 dark:border-zinc-700"
                >
                    <option value="text">Text</option>
                    <option value="textarea">Long Text</option>
                    <option value="image">Image</option>
                    <option value="color">Color</option>
                    <option value="repeater">Repeater (List)</option>
                </select>

                {field.type === 'repeater' && (
                    <div className="ml-2 pl-2 border-l border-zinc-300 dark:border-zinc-700 mt-2">
                        <label className="text-xs font-semibold text-zinc-500 mb-1 block">Item Fields</label>
                        <div className="space-y-2">
                             {field.subSchema?.map((subField, idx) => (
                                <FieldEditor 
                                    key={subField.key}
                                    field={subField}
                                    onUpdate={(updated) => handleUpdateSubField(idx, updated)}
                                    onRemove={() => handleRemoveSubField(idx)}
                                />
                             ))}
                        </div>
                        <button 
                            onClick={handleAddSubField}
                            className="mt-2 text-xs text-blue-600 hover:underline flex items-center gap-1"
                        >
                            <PlusIcon className="w-3 h-3" /> Add Item Field
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default function SchemaEditor({ block, onUpdateName, onAddField, onUpdateField, onRemoveField, onDeleteBlock }: SchemaEditorProps) {
    const handleAddField = () => {
        const key = `field_${Date.now()}`;
        onAddField({
            key,
            label: 'New Field',
            type: 'text',
        });
    };

    return (
        <div className="w-80 border-l border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 overflow-y-auto h-full">
            <div className="mb-6">
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Block Name</label>
                <input
                    type="text"
                    value={block.name}
                    onChange={(e) => onUpdateName(e.target.value)}
                    className="w-full p-2 border rounded dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 font-medium"
                />
            </div>

            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                     <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider">Fields</label>
                     <button onClick={handleAddField} className="text-xs text-blue-600 hover:underline font-medium">
                        + Add Field
                     </button>
                </div>
                
                <div className="space-y-3">
                    {block.admin_schema.length === 0 && (
                        <p className="text-sm text-zinc-400 italic">No fields defined yet.</p>
                    )}
                    {block.admin_schema.map((field) => (
                        <FieldEditor 
                            key={field.key}
                            field={field}
                            onUpdate={(updatedField) => onUpdateField(field.key, updatedField)}
                            onRemove={() => onRemoveField(field.key)}
                        />
                    ))}
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                <button 
                    onClick={onDeleteBlock}
                    className="w-full py-2 px-4 bg-red-50 text-red-600 rounded hover:bg-red-100 flex items-center justify-center gap-2 text-sm font-medium"
                >
                    <TrashIcon className="w-4 h-4" />
                    Delete Block
                </button>
            </div>
        </div>
    );
}
