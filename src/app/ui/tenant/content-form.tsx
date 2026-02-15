'use client';

import { useState } from 'react';
import { updateBlockContent } from '@/app/lib/actions'; 
import ImageUploader from './image-uploader';
import { TrashIcon, PlusIcon, ChevronDownIcon, ChevronUpIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'; // Import icons

interface ContentFormProps {
    pageId: string;
    block: any;
}

// ... FieldRenderer remains the same ...
// Helper component for individual repeater items to handle their own collapse state
const RepeaterItem = ({ 
    item, 
    index, 
    subSchema, 
    onRemove, 
    onChange 
}: { 
    item: any; 
    index: number; 
    subSchema: any[]; 
    onRemove: () => void; 
    onChange: (key: string, val: any) => void;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    // Try to find a meaningful title for the collapsed state (e.g. first text field)
    const summaryTitle = subSchema.find(f => f.type === 'text')?.key;
    const itemTitle = summaryTitle ? item[summaryTitle] : `Item #${index + 1}`;

    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden transition-all hover:border-indigo-300">
            {/* Item Header */}
            <div 
                className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800/50 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-3">
                    <div className={`p-1 rounded-md transition-transform ${isOpen ? 'rotate-180 text-indigo-600' : 'text-zinc-400'}`}>
                        <ChevronDownIcon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                        {itemTitle || <span className="text-zinc-400 italic">New Item</span>}
                    </span>
                </div>
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                    className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                    title="Remove Item"
                >
                    <TrashIcon className="w-4 h-4" />
                </button>
            </div>

            {/* Item Body */}
            {isOpen && (
                <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 space-y-4 bg-white dark:bg-zinc-900">
                    {subSchema.map((subField: any) => (
                        <div key={subField.key}>
                            <label className="block text-xs font-bold mb-1.5 text-zinc-500 uppercase tracking-wider">
                                {subField.label}
                            </label>
                            <FieldRenderer 
                                field={subField}
                                value={item[subField.key]}
                                onChange={(val) => onChange(subField.key, val)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Recursive component for rendering fields
const FieldRenderer = ({ 
    field, 
    value, 
    onChange 
}: { 
    field: any; 
    value: any; 
    onChange: (val: any) => void; 
}) => {
    if (field.type === 'repeater') {
        const items = Array.isArray(value) ? value : [];
        
        const handleAddItem = () => {
             onChange([...items, {}]);
        };

        const handleRemoveItem = (index: number) => {
            const newItems = [...items];
            newItems.splice(index, 1);
            onChange(newItems);
        };

        const handleItemChange = (index: number, key: string, val: any) => {
            const newItems = [...items];
            newItems[index] = { ...newItems[index], [key]: val };
            onChange(newItems);
        };

        return (
            <div className="space-y-3">
                 {items.map((item: any, idx: number) => (
                    <RepeaterItem 
                        key={idx}
                        index={idx}
                        item={item}
                        subSchema={field.subSchema || []}
                        onRemove={() => handleRemoveItem(idx)}
                        onChange={(key, val) => handleItemChange(idx, key, val)}
                    />
                 ))}
                 <button 
                    onClick={handleAddItem}
                    className="w-full py-2.5 border-2 border-dashed border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 hover:bg-white dark:hover:bg-zinc-800 rounded-lg text-zinc-500 hover:border-indigo-400 hover:text-indigo-600 transition-all flex items-center justify-center gap-2 font-medium text-sm"
                 >
                     <PlusIcon className="w-4 h-4" /> 
                     Add {field.label} Item
                 </button>
            </div>
        );
    }

    if (field.type === 'image') {
        return (
            <ImageUploader 
                defaultValue={value}
                onUrlChange={onChange}
            />
        );
    }

    if (field.type === 'textarea') {
         return (
            <textarea
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-zinc-800/50 bg-white transition-shadow"
                placeholder={`Enter ${field.label.toLowerCase()}...`}
            />
        );
    }

    if (field.type === 'color') {
         return (
             <div className="flex items-center gap-3">
                <input
                    type="color"
                    value={value || '#000000'}
                    onChange={(e) => onChange(e.target.value)}
                    className="h-10 w-16 p-1 border border-zinc-200 rounded cursor-pointer"
                />
                <span className="text-sm font-mono text-zinc-500 bg-zinc-100 px-2 py-1 rounded">{value || '#000000'}</span>
             </div>
        );
    }

    // Default to text
    return (
        <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-zinc-800/50 bg-white transition-shadow"
             placeholder={`Enter ${field.label.toLowerCase()}...`}
        />
    );
};

export default function ContentForm({ pageId, block }: ContentFormProps) {
    const [content, setContent] = useState<Record<string, any>>(block.tenant_content || {});
    const [isSaving, setIsSaving] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (key: string, value: any) => {
        setContent(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        setMessage('');
        try {
            await updateBlockContent(block.id, content, pageId);
            setMessage('Saved successfully!');
             setTimeout(() => setMessage(''), 3000);
        } catch (e) {
            setMessage('Error saving content.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className={`bg-white dark:bg-zinc-900 rounded-xl shadow-sm border transition-all duration-200 ${isExpanded ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-zinc-200 dark:border-zinc-800 hover:border-indigo-300'}`}>
            
            {/* Header / Summary Card */}
            <div 
                className="p-6 flex items-center justify-between cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                         {/* Icon placeholder based on block layout type? For now generic */}
                         <div className="grid grid-cols-2 gap-0.5 w-6 h-6 opacity-80">
                            <div className="bg-current rounded-[1px]"></div>
                            <div className="bg-current rounded-[1px]"></div>
                            <div className="bg-current rounded-[1px]"></div>
                            <div className="bg-current rounded-[1px]"></div>
                         </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{block.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                             <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 rounded-full font-medium">
                                 {block.admin_schema.length} Fields
                             </span>
                             {block.admin_schema.some((f: any) => f.type === 'repeater') && (
                                 <span className="text-xs px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full font-medium flex items-center gap-1">
                                    Repeater
                                 </span>
                             )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button 
                        className={`text-sm font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${isExpanded ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300'}`}
                    >
                        {isExpanded ? 'Close Form' : 'Configure via Form'}
                        {isExpanded ? <ChevronUpIcon className="w-4 h-4" /> : <Cog6ToothIcon className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            {/* Expanded Form Area */}
            {isExpanded && (
                <div className="border-t border-zinc-200 dark:border-zinc-800 p-6 bg-gray-50/50 dark:bg-zinc-900/50 rounded-b-xl">
                     <p className="text-sm text-zinc-500 mb-6">
                        Configure the content for this block. Changes are saved directly to your site database.
                    </p>

                    <div className="space-y-6">
                        {block.admin_schema.length === 0 && (
                            <p className="text-sm text-zinc-500 italic">No fields configured for this block.</p>
                        )}
                        
                        {block.admin_schema.map((field: any) => (
                            <div key={field.key}>
                                <label className="block text-sm font-bold mb-1.5 text-zinc-700 dark:text-zinc-300">
                                    {field.label}
                                </label>
                                <FieldRenderer 
                                    field={field}
                                    value={content[field.key]}
                                    onChange={(val) => handleChange(field.key, val)}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-3">
                        <button 
                            onClick={() => setIsExpanded(false)}
                            className="px-4 py-2 text-zinc-500 hover:text-zinc-700 font-medium text-sm"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSave}
                            disabled={isSaving}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-green-700 disabled:opacity-50 shadow-sm hover:shadow transition-all flex items-center gap-2"
                        >
                            {isSaving ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Saving...
                                </>
                            ) : 'Save Updates'}
                        </button>
                    </div>

                    {message && (
                        <p className={`mt-4 text-center text-sm font-medium ${message.includes('Error') ? 'text-red-500' : 'text-green-600'}`}>
                            {message}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
