'use client';

import { useState } from 'react';
// IMPORTANTE: Asegúrate de que estas tres funciones existan en tu archivo actions.ts
import { updateBlockContent, updateBlockDraft, publishBlock } from '@/app/lib/actions'; 
import ImageUploader from './image-uploader';
import { 
    TrashIcon, 
    PlusIcon, 
    ChevronDownIcon, 
    ChevronUpIcon, 
    Cog6ToothIcon,
    Bars3BottomLeftIcon,
    SwatchIcon,
    PhotoIcon,
    DocumentTextIcon,
    CheckIcon,
    ListBulletIcon,
    HashtagIcon,
    LinkIcon,
    PowerIcon,
    EyeIcon,              // NUEVO
    CloudArrowUpIcon,     // NUEVO
    DocumentCheckIcon     // NUEVO
} from '@heroicons/react/24/outline';

interface ContentFormProps {
    pageId: string;
    block: any;
    websiteUrl?: string; // Para la vista previa dinámica
    pageSlug?: string;   // Para la vista previa dinámica
}

// Sub-componente para ítems individuales del repetidor
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

    const summaryTitle = subSchema.find((f: any) => f.type === 'text')?.key;
    const itemTitle = summaryTitle && item[summaryTitle] ? item[summaryTitle] : `Elemento #${index + 1}`;

    return (
        <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden transition-all hover:border-[#9D2B48]/30 shadow-sm group/item">
            {/* Header del ítem */}
            <div 
                className="flex items-center justify-between p-4 bg-zinc-50/50 hover:bg-zinc-50 cursor-pointer transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-3">
                    <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#9D2B48]' : 'text-zinc-400'}`}>
                        <ChevronDownIcon className="w-4 h-4 stroke-2" />
                    </div>
                    <span className="text-sm font-bold text-zinc-700">
                        {itemTitle}
                    </span>
                </div>
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                    className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    title="Eliminar ítem"
                >
                    <TrashIcon className="w-4 h-4" />
                </button>
            </div>

            {/* Cuerpo del ítem */}
            {isOpen && (
                <div className="p-6 border-t border-zinc-100 space-y-6 bg-white animate-in fade-in slide-in-from-top-2 duration-200">
                    {subSchema.map((subField: any) => (
                        <div key={subField.key}>
                            <label className="flex items-center gap-1 text-[11px] font-bold mb-2 text-zinc-500 uppercase tracking-widest">
                                {subField.label}
                                {subField.required && <span className="text-red-500">*</span>}
                            </label>
                            <FieldRenderer 
                                field={subField}
                                value={item[subField.key] ?? subField.defaultValue}
                                onChange={(val) => onChange(subField.key, val)}
                            />
                            {subField.helpText && (
                                <p className="mt-1.5 text-[11px] text-zinc-400">{subField.helpText}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Renderizador recursivo de campos
const FieldRenderer = ({ 
    field, 
    value, 
    onChange 
}: { 
    field: any; 
    value: any; 
    onChange: (val: any) => void; 
}) => {
    
    // 1. REPETIDOR
    if (field.type === 'repeater') {
        const items = Array.isArray(value) ? value : [];
        const handleAddItem = () => onChange([...items, {}]);
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
            <div className="space-y-4 pt-2">
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
                    className="w-full py-4 mt-2 border-2 border-dashed border-zinc-200 bg-zinc-50 hover:bg-[#9D2B48]/5 rounded-xl text-zinc-500 hover:border-[#9D2B48]/30 hover:text-[#9D2B48] transition-all flex items-center justify-center gap-2 font-bold text-[13px] shadow-sm group"
                 >
                     <PlusIcon className="w-5 h-5 transition-transform group-hover:rotate-90" /> 
                     Añadir elemento a {field.label}
                 </button>
            </div>
        );
    }

    // 2. IMAGEN
    if (field.type === 'image') {
        return (
            <div className="relative">
                <ImageUploader 
                    defaultValue={value}
                    onUrlChange={onChange}
                />
            </div>
        );
    }

    // 3. TEXTAREA & RICHTEXT
    if (field.type === 'textarea' || field.type === 'richtext') {
         return (
            <textarea
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                rows={field.type === 'richtext' ? 6 : 4}
                required={field.required}
                className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-[#9D2B48]/10 focus:border-[#9D2B48] bg-zinc-50/30 transition-all text-sm text-zinc-800 placeholder:text-zinc-400 outline-none resize-y"
                placeholder={field.placeholder || `Escribe el contenido de ${field.label.toLowerCase()}...`}
            />
        );
    }

    // 4. COLOR
    if (field.type === 'color') {
         return (
             <div className="flex items-center gap-4">
                <input
                    type="color"
                    value={value || '#000000'}
                    onChange={(e) => onChange(e.target.value)}
                    className="h-12 w-20 p-1 border border-zinc-200 rounded-xl cursor-pointer bg-white shadow-sm"
                />
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-tighter">Código HEX</span>
                    <span className="text-sm font-mono font-bold text-zinc-700 uppercase tracking-wider">
                        {value || '#000000'}
                    </span>
                </div>
             </div>
        );
    }

    // 5. SELECT
    if (field.type === 'select') {
        return (
            <select
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                required={field.required}
                className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-[#9D2B48]/10 focus:border-[#9D2B48] bg-zinc-50/30 transition-all text-sm text-zinc-800 outline-none cursor-pointer appearance-none"
            >
                <option value="" disabled>Selecciona una opción...</option>
                {(field.options || []).map((opt: any) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        );
    }

    // 6. BOOLEAN / TOGGLE
    if (field.type === 'boolean') {
        return (
            <label className="flex items-center gap-3 cursor-pointer w-max">
                <div className="relative">
                    <input
                        type="checkbox"
                        checked={!!value}
                        onChange={(e) => onChange(e.target.checked)}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#9D2B48]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#9D2B48]"></div>
                </div>
                <span className="text-sm font-bold text-zinc-700 select-none">
                    {value ? 'Activado' : 'Desactivado'}
                </span>
            </label>
        );
    }

    // 7. INPUTS GENÉRICOS (text, number, url)
    return (
        <input
            type={field.type === 'number' ? 'number' : field.type === 'url' ? 'url' : 'text'}
            value={value ?? ''}
            onChange={(e) => {
                const val = e.target.value;
                onChange(field.type === 'number' ? (val === '' ? '' : Number(val)) : val);
            }}
            min={field.min}
            max={field.max}
            required={field.required}
            className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-[#9D2B48]/10 focus:border-[#9D2B48] bg-zinc-50/30 transition-all text-sm text-zinc-800 placeholder:text-zinc-400 outline-none"
            placeholder={field.placeholder || `Ingresa ${field.label.toLowerCase()}...`}
        />
    );
};

export default function ContentForm({ pageId, block, websiteUrl = 'http://localhost:4321', pageSlug = '/' }: ContentFormProps) {
    // Carga inicial: Si hay borrador usa el borrador, si no usa lo publicado (tenant_content)
    const [content, setContent] = useState<Record<string, any>>(
        (block.draft_content && Object.keys(block.draft_content).length > 0) 
            ? block.draft_content 
            : block.tenant_content || {}
    );
    
    // Estados de carga separados
    const [isSavingDraft, setIsSavingDraft] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);
    
    const [isExpanded, setIsExpanded] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (key: string, value: any) => {
        setContent(prev => ({ ...prev, [key]: value }));
    };

    // ── FUNCIONES DE GUARDADO ──

    // 1. Guardar Borrador (Solo afecta a draft_content)
    const handleSaveDraft = async () => {
        setIsSavingDraft(true);
        setMessage('');
        try {
            console.log("💾 [ContentForm] Intentando guardar borrador para bloque:", block.id);
            console.log("📦 [ContentForm] Contenido a enviar:", content);
            
            await updateBlockDraft(block.id, content, pageId);
            
            console.log("✅ [ContentForm] Borrador guardado exitosamente en DB");
            setMessage('Borrador guardado 📝');
            
            // Disparamos el evento para que el iframe se recargue
            console.log("📣 [ContentForm] Disparando evento 'refresh-preview'...");
            window.dispatchEvent(new Event('refresh-preview'));
            
            setTimeout(() => setMessage(''), 3000);
        } catch (e) {
            console.error("❌ [ContentForm] Error al guardar borrador:", e);
            setMessage('Error al guardar borrador.');
        } finally {
            setIsSavingDraft(false);
        }
    };

    // 2. Publicar (Pasa de draft_content a tenant_content)
    const handlePublish = async () => {
        setIsPublishing(true);
        setMessage('');
        try {
            // Guardamos el borrador primero para asegurar que no se pierda nada
            await updateBlockDraft(block.id, content, pageId);
            // Luego lo pasamos a producción
            await publishBlock(block.id, pageId);
            setMessage('¡Publicado con éxito en la web! 🚀');
             setTimeout(() => setMessage(''), 4000);
        } catch (e) {
            setMessage('Error al publicar.');
        } finally {
            setIsPublishing(false);
        }
    };

    // 3. Vista Previa (Guarda borrador y abre en nueva pestaña)
    const handlePreview = () => {
        handleSaveDraft();
        // Construimos la URL limpia
        const cleanBaseUrl = websiteUrl.replace(/\/$/, "");
        const cleanSlug = pageSlug.startsWith('/') ? pageSlug : `/${pageSlug}`;
        // Abrimos con el parámetro preview
        window.open(`${cleanBaseUrl}${cleanSlug}?preview=true`, '_blank');
    };

    // Helper para determinar el icono según el tipo
    const getFieldIcon = (type: string) => {
        switch (type) {
            case 'color': return <SwatchIcon className="w-4 h-4 text-[#9D2B48]" />;
            case 'image': return <PhotoIcon className="w-4 h-4 text-[#9D2B48]" />;
            case 'textarea': 
            case 'richtext': return <DocumentTextIcon className="w-4 h-4 text-[#9D2B48]" />;
            case 'select': return <ListBulletIcon className="w-4 h-4 text-[#9D2B48]" />;
            case 'number': return <HashtagIcon className="w-4 h-4 text-[#9D2B48]" />;
            case 'url': return <LinkIcon className="w-4 h-4 text-[#9D2B48]" />;
            case 'boolean': return <PowerIcon className="w-4 h-4 text-[#9D2B48]" />;
            default: return <Bars3BottomLeftIcon className="w-4 h-4 text-[#9D2B48]" />;
        }
    };

    return (
        <div className={`relative bg-white rounded-2xl shadow-sm transition-all duration-500 overflow-hidden group ${isExpanded ? 'border-2 border-[#9D2B48] ring-8 ring-[#9D2B48]/5' : 'border border-zinc-200 hover:shadow-xl hover:border-zinc-300 hover:-translate-y-1'}`}>
            
            {/* Línea decorativa magenta animada */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-[#9D2B48] transition-transform origin-bottom duration-500 z-20 ${isExpanded ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'}`}></div>

            {/* Header / Resumen del Bloque */}
            <div 
                className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer relative z-10"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-zinc-50 group-hover:bg-[#9D2B48]/5 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:text-[#9D2B48] transition-all border border-zinc-100 shadow-inner shrink-0">
                         <Bars3BottomLeftIcon className="w-7 h-7" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-zinc-900 tracking-tight group-hover:text-[#9D2B48] transition-colors">{block.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                             <span className="text-[10px] px-2.5 py-1 bg-zinc-100 text-zinc-600 rounded-lg font-black uppercase tracking-widest border border-zinc-200">
                                 {block.admin_schema.length} Campos
                             </span>
                             {block.admin_schema.some((f: any) => f.type === 'repeater') && (
                                 <span className="text-[10px] px-2.5 py-1 bg-purple-50 text-purple-600 border border-purple-100 rounded-lg font-black uppercase tracking-widest">
                                    Multi-ítem
                                 </span>
                             )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button 
                        className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-sm ${isExpanded ? 'bg-[#9D2B48] text-white shadow-[#9D2B48]/20' : 'bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'}`}
                    >
                        {isExpanded ? 'Cerrar Edición' : 'Editar Contenido'}
                        {isExpanded ? <ChevronUpIcon className="w-4 h-4 stroke-2" /> : <Cog6ToothIcon className="w-4 h-4 stroke-2" />}
                    </button>
                </div>
            </div>

            {/* Área del Formulario Expandida */}
            {isExpanded && (
                <div className="border-t border-zinc-100 p-6 sm:p-10 bg-zinc-50/30 animate-in fade-in duration-500">
                     <p className="text-[15px] text-zinc-500 mb-10 leading-relaxed max-w-3xl">
                        Personaliza este bloque de contenido. Puedes guardar borradores y previsualizar los cambios antes de mandarlos a la web pública.
                    </p>

                    <div className="space-y-8">
                        {block.admin_schema.map((field: any) => (
                            <div key={field.key} className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-sm transition-all hover:shadow-md">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="p-1.5 bg-[#9D2B48]/5 rounded-lg">
                                        {getFieldIcon(field.type)}
                                    </div>
                                    <label className="text-sm font-black text-zinc-800 uppercase tracking-wide flex items-center gap-1">
                                        {field.label}
                                        {field.required && <span className="text-red-500" title="Campo obligatorio">*</span>}
                                    </label>
                                </div>
                                <FieldRenderer 
                                    field={field}
                                    value={content[field.key] ?? field.defaultValue}
                                    onChange={(val) => handleChange(field.key, val)}
                                />
                                {field.helpText && (
                                    <p className="mt-2 text-xs text-zinc-400 font-medium">💡 {field.helpText}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* ── FOOTER DE ACCIONES PROFESIONAL ── */}
                    <div className="mt-10 pt-8 border-t border-zinc-200 flex flex-col xl:flex-row items-center justify-between gap-6">
                        
                        {/* Mensajes de Estado */}
                        <div className="flex items-center gap-3 w-full xl:w-auto h-10">
                             {message && (
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold animate-in zoom-in duration-300 ${message.includes('Error') ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
                                    {message.includes('éxito') || message.includes('guardado') ? <CheckIcon className="w-4 h-4 stroke-2" /> : null}
                                    {message}
                                </div>
                            )}
                        </div>
                        
                        {/* Botonera Principal */}
                        <div className="flex flex-wrap items-center justify-end gap-3 w-full xl:w-auto">
                            
                            <button 
                                onClick={handleSaveDraft}
                                disabled={isSavingDraft || isPublishing}
                                className="px-5 py-2.5 text-zinc-600 bg-white border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 rounded-xl font-bold text-sm transition-all flex items-center gap-2 disabled:opacity-50"
                            >
                                {isSavingDraft ? <span className="w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin"></span> : <DocumentCheckIcon className="w-4 h-4" />}
                                Guardar Borrador
                            </button>

                            <button 
                                onClick={handlePreview}
                                disabled={isSavingDraft || isPublishing}
                                className="px-5 py-2.5 bg-zinc-900 hover:bg-black text-white rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50"
                            >
                                <EyeIcon className="w-4 h-4" />
                                Vista Previa
                            </button>

                            <button 
                                onClick={handlePublish}
                                disabled={isPublishing}
                                className="bg-[#4CAF50] hover:bg-[#43A047] text-white px-8 py-2.5 rounded-xl text-sm font-black shadow-lg shadow-green-200 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
                            >
                                {isPublishing ? (
                                    <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></span>
                                ) : (
                                    <CloudArrowUpIcon className="w-5 h-5 stroke-2" />
                                )}
                                Publicar Cambios
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}