import { Block, BlockField, BlockFieldType, SelectOption } from './types';
import { TrashIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SchemaEditorProps {
    block: Block;
    onUpdateName: (name: string) => void;
    onAddField: (field: BlockField) => void;
    onUpdateField: (key: string, field: BlockField) => void;
    onRemoveField: (key: string) => void;
    onDeleteBlock: () => void;
}

const fieldTypeLabels: Record<BlockFieldType, string> = {
    text: 'Texto corto',
    textarea: 'Texto largo',
    richtext: 'Texto Enriquecido',
    image: 'Imagen',
    color: 'Color',
    repeater: 'Repetidor (Lista)',
    select: 'Dropdown (Opciones)',
    boolean: 'Interruptor (Sí/No)',
    number: 'Número',
    url: 'Enlace (URL)'
};

// ── Componente Tooltip de Ayuda (?) ─────────────────────────────────────────
const InfoTooltip = ({ text }: { text: string }) => (
    <div className="group relative inline-flex items-center ml-1.5">
        <span className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-zinc-200 text-zinc-600 text-[9px] font-bold cursor-help group-hover:bg-[#9D2B48] group-hover:text-white transition-colors">
            ?
        </span>
        {/* Caja de texto emergente */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-zinc-900 text-white text-[10px] leading-relaxed rounded-md shadow-xl z-50 text-center font-normal pointer-events-none normal-case tracking-normal">
            {text}
            {/* Triangulito apuntando hacia abajo */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-zinc-900 rotate-45"></div>
        </div>
    </div>
);

// ── Field type badge icon ──────────────────────────────────────────────────
const TypePill = ({ type }: { type: BlockFieldType }) => {
    return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200">
            {fieldTypeLabels[type] ?? type}
        </span>
    );
};

// ── Recursive field editor ─────────────────────────────────────────────────
const FieldEditor = ({
    field,
    index,
    onUpdate,
    onRemove,
    nested = false,
}: {
    field: BlockField;
    index: number;
    onUpdate: (updatedField: BlockField) => void;
    onRemove: () => void;
    nested?: boolean;
}) => {
    
    // Generador seguro de IDs
    const generateId = () => typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID().split('-')[0] : Date.now().toString();

    const handleAddSubField = () => {
        const newSubField: BlockField = {
            key: `sub_${generateId()}`,
            label: 'Nuevo subcampo',
            type: 'text',
        };
        onUpdate({ ...field, subSchema: [...(field.subSchema ?? []), newSubField] });
    };

    const handleUpdateSubField = (idx: number, updated: BlockField) => {
        const next = [...(field.subSchema ?? [])];
        next[idx] = updated;
        onUpdate({ ...field, subSchema: next });
    };

    const handleRemoveSubField = (idx: number) => {
        const next = [...(field.subSchema ?? [])];
        next.splice(idx, 1);
        onUpdate({ ...field, subSchema: next });
    };

    // Funciones para manejar opciones del Select
    const handleAddOption = () => {
        const newOption: SelectOption = { label: '', value: '' };
        onUpdate({ ...field, options: [...(field.options ?? []), newOption] });
    };

    const handleUpdateOption = (idx: number, key: keyof SelectOption, value: string) => {
        const nextOpts = [...(field.options ?? [])];
        nextOpts[idx] = { ...nextOpts[idx], [key]: value };
        onUpdate({ ...field, options: nextOpts });
    };

    const handleRemoveOption = (idx: number) => {
        const nextOpts = [...(field.options ?? [])];
        nextOpts.splice(idx, 1);
        onUpdate({ ...field, options: nextOpts });
    };

    return (
        <div className={`rounded-xl border transition-all duration-200 ${nested ? 'border-zinc-200 bg-white shadow-none' : 'border-zinc-200 bg-white shadow-sm hover:shadow-md hover:border-[#9D2B48]/40'}`}>
            {/* ── Card header ── */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 bg-zinc-50/50 rounded-t-xl">
                <div className="flex items-center gap-2.5">
                    {!nested && (
                        <span className="w-5 h-5 rounded-full bg-zinc-900 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                            {index + 1}
                        </span>
                    )}
                    <TypePill type={field.type} />
                </div>
                <button
                    onClick={onRemove}
                    title="Eliminar campo"
                    className="w-6 h-6 rounded-lg flex items-center justify-center text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                    <TrashIcon className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* ── Card body ── */}
            <div className="px-4 py-4 space-y-4">
                {/* Etiqueta y Llave Técnica */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
    <label className="flex items-center text-[11px] font-bold text-zinc-800 uppercase tracking-wider mb-1">
        Etiqueta
        <InfoTooltip text="El nombre visual que el cliente verá cuando esté llenando la información." />
    </label>
    <input
        type="text"
        value={field.label}
        onChange={(e) => {
            const newLabel = e.target.value;
            // Verificamos si la key actual sigue siendo la fea autogenerada (empieza por campo_ o sub_)
            const isDefaultKey = field.key.startsWith('campo_') || field.key.startsWith('sub_') || field.key === '';
            
            // Función para limpiar el texto: minúsculas, sin tildes, espacios por '_'
            const cleanKey = newLabel
                .toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Quita tildes
                .replace(/[^a-z0-9]/g, '_') // Cambia caracteres raros/espacios por '_'
                .replace(/^_+|_+$/g, '') // Quita guiones bajos al inicio o final
                .replace(/_+/g, '_'); // Evita guiones bajos dobles (__w)

            onUpdate({ 
                ...field, 
                label: newLabel,
                // Si la key era la autogenerada, la sobreescribimos con la versión limpia de la etiqueta
                ...(isDefaultKey ? { key: cleanKey || `campo_${Date.now()}` } : {})
            });
        }}
        placeholder="Ej. Título Principal"
        className="w-full px-2.5 py-1.5 text-sm font-medium text-black border border-zinc-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#9D2B48]/20 focus:border-[#9D2B48] transition-all placeholder:text-zinc-500"
    />
</div>
                    <div>
                        <label className="flex items-center text-[11px] font-bold text-zinc-800 uppercase tracking-wider mb-1">
                            ID / Key
                            <InfoTooltip text="Identificador técnico único para guardar en la base de datos (sin espacios)." />
                        </label>
                        <input
                            type="text"
                            value={field.key}
                            onChange={(e) => onUpdate({ ...field, key: e.target.value.toLowerCase().replace(/\s+/g, '_') })}
                            placeholder="ej_titulo"
                            className="w-full px-2.5 py-1.5 text-sm font-mono text-zinc-700 border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#9D2B48]/20 focus:border-[#9D2B48] transition-all placeholder:text-zinc-400"
                        />
                    </div>
                </div>

                {/* Tipo de Campo y Required */}
                <div className="flex gap-3 items-end">
                    <div className="flex-1">
                        <label className="flex items-center text-[11px] font-bold text-zinc-800 uppercase tracking-wider mb-1">
                            Tipo de campo
                            <InfoTooltip text="Define si el campo será texto, una imagen, una lista desplegable, etc." />
                        </label>
                        <select
                            value={field.type}
                            onChange={(e) => onUpdate({ ...field, type: e.target.value as BlockFieldType })}
                            className="w-full px-2.5 py-1.5 text-sm font-medium text-black border border-zinc-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#9D2B48]/20 focus:border-[#9D2B48] transition-all cursor-pointer"
                        >
                            {Object.entries(fieldTypeLabels).map(([val, label]) => (
                                <option key={val} value={val}>{label}</option>
                            ))}
                        </select>
                    </div>
                    <label className="flex items-center gap-2 pb-1.5 cursor-pointer group">
                        <input 
                            type="checkbox" 
                            checked={field.required ?? false}
                            onChange={(e) => onUpdate({ ...field, required: e.target.checked })}
                            className="w-4 h-4 text-[#9D2B48] rounded border-zinc-300 focus:ring-[#9D2B48]"
                        />
                        <span className="flex items-center text-[11px] font-bold text-zinc-600 uppercase tracking-wider group-hover:text-zinc-900 transition-colors">
                            Obligatorio
                            <InfoTooltip text="Si se marca, el cliente no podrá guardar la página si deja este campo vacío." />
                        </span>
                    </label>
                </div>

                {/* Textos de ayuda (Opcionales) */}
                {(field.type === 'text' || field.type === 'textarea' || field.type === 'url' || field.type === 'number') && (
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-100">
                        <div>
                            <label className="flex items-center text-[10px] font-bold text-zinc-600 mb-1">
                                Placeholder
                                <InfoTooltip text="Texto gris de ejemplo que aparece dentro del input cuando está vacío." />
                            </label>
                            <input
                                type="text"
                                value={field.placeholder ?? ''}
                                onChange={(e) => onUpdate({ ...field, placeholder: e.target.value })}
                                placeholder="Ej: Escribe aquí..."
                                className="w-full px-2.5 py-1 text-xs text-black border border-zinc-200 rounded-md bg-white focus:border-[#9D2B48] focus:ring-1 focus:ring-[#9D2B48] outline-none placeholder:text-zinc-500"
                            />
                        </div>
                        <div>
                            <label className="flex items-center text-[10px] font-bold text-zinc-600 mb-1">
                                Texto de ayuda
                                <InfoTooltip text="Mensaje pequeño debajo del input para dar instrucciones adicionales al cliente." />
                            </label>
                            <input
                                type="text"
                                value={field.helpText ?? ''}
                                onChange={(e) => onUpdate({ ...field, helpText: e.target.value })}
                                placeholder="Ej: Máx. 5 palabras"
                                className="w-full px-2.5 py-1 text-xs text-black border border-zinc-200 rounded-md bg-white focus:border-[#9D2B48] focus:ring-1 focus:ring-[#9D2B48] outline-none placeholder:text-zinc-500"
                            />
                        </div>
                    </div>
                )}

                {/* ── LÓGICA CONDICIONAL POR TIPO DE CAMPO ── */}

                {/* 1. Opciones para 'select' */}
                {field.type === 'select' && (
                    <div className="mt-3 pt-3 border-t border-zinc-100 bg-zinc-50/50 -mx-4 px-4 pb-3">
                        <div className="flex justify-between items-center mb-3">
                            <span className="flex items-center text-[11px] font-bold text-zinc-800 uppercase tracking-wider">
                                Opciones del Dropdown
                                <InfoTooltip text="Agrega las opciones que el cliente podrá elegir (Ej. Etiqueta: 'Rojo', Valor: 'red-500')." />
                            </span>
                            <button onClick={handleAddOption} className="text-[10px] font-bold text-[#9D2B48] hover:text-[#83223b]">
                                + Añadir Opción
                            </button>
                        </div>
                        <div className="space-y-2">
                            {(field.options ?? []).map((opt, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={opt.label}
                                        onChange={(e) => handleUpdateOption(idx, 'label', e.target.value)}
                                        placeholder="Etiqueta (Ej. Centro)"
                                        className="w-1/2 px-2 py-1.5 text-xs text-black border border-zinc-200 rounded-md placeholder:text-zinc-500 focus:border-[#9D2B48] focus:ring-1 focus:ring-[#9D2B48] outline-none"
                                    />
                                    <input
                                        type="text"
                                        value={opt.value}
                                        onChange={(e) => handleUpdateOption(idx, 'value', e.target.value)}
                                        placeholder="Valor (Ej. center)"
                                        className="w-1/2 px-2 py-1.5 text-xs font-mono text-zinc-700 border border-zinc-200 rounded-md placeholder:text-zinc-400 focus:border-[#9D2B48] focus:ring-1 focus:ring-[#9D2B48] outline-none"
                                    />
                                    <button onClick={() => handleRemoveOption(idx)} className="text-zinc-400 hover:text-red-600 bg-white border border-zinc-200 rounded-md px-1.5 hover:bg-red-50 transition-colors">
                                        <XMarkIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            {(field.options ?? []).length === 0 && (
                                <p className="text-[10px] text-zinc-500 italic bg-white p-2 rounded border border-dashed border-zinc-200 text-center">No hay opciones definidas. Añade una arriba.</p>
                            )}
                        </div>
                    </div>
                )}

                {/* 2. Opciones para 'number' */}
                {field.type === 'number' && (
                    <div className="flex gap-3 pt-3 border-t border-zinc-100">
                         <div>
                            <label className="flex items-center text-[10px] font-bold text-zinc-600 mb-1">
                                Mínimo
                                <InfoTooltip text="El valor numérico más bajo permitido." />
                            </label>
                            <input
                                type="number"
                                value={field.min ?? ''}
                                onChange={(e) => onUpdate({ ...field, min: e.target.value ? Number(e.target.value) : undefined })}
                                placeholder="Ej: 0"
                                className="w-full px-2.5 py-1 text-xs text-black border border-zinc-200 rounded-md focus:border-[#9D2B48] outline-none placeholder:text-zinc-500"
                            />
                        </div>
                        <div>
                            <label className="flex items-center text-[10px] font-bold text-zinc-600 mb-1">
                                Máximo
                                <InfoTooltip text="El valor numérico más alto permitido." />
                            </label>
                            <input
                                type="number"
                                value={field.max ?? ''}
                                onChange={(e) => onUpdate({ ...field, max: e.target.value ? Number(e.target.value) : undefined })}
                                placeholder="Ej: 100"
                                className="w-full px-2.5 py-1 text-xs text-black border border-zinc-200 rounded-md focus:border-[#9D2B48] outline-none placeholder:text-zinc-500"
                            />
                        </div>
                    </div>
                )}

                {/* 3. Repeater sub-fields */}
                {field.type === 'repeater' && (
                    <div className="mt-2 pt-3 border-t border-zinc-100">
                        <div className="flex items-center justify-between mb-3">
                            <span className="flex items-center text-[11px] font-bold text-zinc-800 uppercase tracking-wider">
                                Subcampos
                                <InfoTooltip text="Los campos que se repetirán dentro de esta lista (Ej. Nombre, Foto, Comentario)." />
                            </span>
                            <button
                                onClick={handleAddSubField}
                                className="flex items-center gap-1 text-[11px] font-bold text-[#9D2B48] hover:text-[#83223b] bg-white border border-[#9D2B48]/20 hover:border-[#9D2B48] px-2 py-1 rounded-md transition-colors shadow-sm"
                            >
                                <PlusIcon className="w-3 h-3 stroke-2" /> Añadir
                            </button>
                        </div>
                        <div className="space-y-3">
                            {(field.subSchema ?? []).length === 0 && (
                                <p className="text-xs text-zinc-500 font-medium text-center py-4 bg-zinc-50 rounded-lg border border-dashed border-zinc-200">
                                    Añade subcampos para este repetidor
                                </p>
                            )}
                            {field.subSchema?.map((subField, idx) => (
                                <FieldEditor
                                    key={subField.key}
                                    field={subField}
                                    index={idx}
                                    onUpdate={(updated) => handleUpdateSubField(idx, updated)}
                                    onRemove={() => handleRemoveSubField(idx)}
                                    nested
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// ── Main SchemaEditor ──────────────────────────────────────────────────────
export default function SchemaEditor({
    block,
    onUpdateName,
    onAddField,
    onUpdateField,
    onRemoveField,
    onDeleteBlock,
}: SchemaEditorProps) {
    
    const handleAddField = () => {
        const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID().split('-')[0] : Date.now().toString();
        const key = `campo_${id}`;
        onAddField({ key, label: '', type: 'text' });
    };

    return (
        <div className="w-full flex flex-col h-full border-l border-zinc-200 bg-white font-sans shadow-[-4px_0_24px_-10px_rgba(0,0,0,0.05)]">
            
            {/* ── Panel header (Blanco y Limpio) ── */}
            <div className="bg-white border-b border-zinc-200 px-5 py-5 flex-shrink-0">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-[#9D2B48]"></div>
                    <p className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">
                        Editor de Estructura
                    </p>
                </div>
                <h2 className="text-zinc-900 text-lg font-black leading-tight tracking-tight">
                    Configurar Esquema
                </h2>
            </div>

            {/* ── Scrollable body ── */}
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-7 bg-zinc-50/30">
                
                {/* Nombre del Bloque */}
                <section>
                    <label className="flex items-center text-[11px] font-bold text-zinc-800 uppercase tracking-wider mb-2">
                        Nombre del bloque
                        <InfoTooltip text="Es el nombre interno que te ayudará a identificar esta sección en la lista izquierda." />
                    </label>
                    <input
                        type="text"
                        value={block.name}
                        onChange={(e) => onUpdateName(e.target.value)}
                        placeholder="Ej. Sección Hero"
                        className="w-full px-3.5 py-2.5 text-sm font-bold text-black border border-zinc-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#9D2B48]/20 focus:border-[#9D2B48] transition-all shadow-sm placeholder:text-zinc-500"
                    />
                </section>

                <div className="border-t border-zinc-200" />

                {/* Campos */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <span className="text-[11px] font-black text-zinc-900 uppercase tracking-wider">
                                Campos del Bloque
                            </span>
                            {block.admin_schema.length > 0 && (
                                <span className="text-[10px] font-bold bg-[#9D2B48]/10 text-[#9D2B48] rounded-md px-1.5 py-0.5">
                                    {block.admin_schema.length}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={handleAddField}
                            className="flex items-center gap-1.5 text-[11px] font-bold text-white bg-[#9D2B48] hover:bg-[#83223b] px-3 py-2 rounded-lg shadow-md shadow-[#9D2B48]/20 transition-all active:scale-95"
                        >
                            <PlusIcon className="w-3.5 h-3.5 stroke-2" />
                            Añadir campo
                        </button>
                    </div>

                    {block.admin_schema.length === 0 ? (
                        <div className="py-10 text-center rounded-2xl border-2 border-dashed border-zinc-200 bg-white shadow-sm">
                            <div className="w-10 h-10 rounded-full bg-[#9D2B48]/5 flex items-center justify-center mx-auto mb-3">
                                <PlusIcon className="w-5 h-5 text-[#9D2B48]" />
                            </div>
                            <p className="text-sm text-zinc-900 font-bold">Bloque vacío</p>
                            <p className="text-[11px] text-zinc-500 mt-1 max-w-[200px] mx-auto leading-relaxed">Añade tu primer campo (como un Título o Imagen) para empezar.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {block.admin_schema.map((field, idx) => (
                                <FieldEditor
                                    key={field.key}
                                    field={field}
                                    index={idx}
                                    onUpdate={(updatedField) => onUpdateField(field.key, updatedField)}
                                    onRemove={() => onRemoveField(field.key)}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>

            {/* ── Footer ── */}
            <div className="flex-shrink-0 px-5 py-5 border-t border-zinc-200 bg-zinc-50">
                <button
                    onClick={onDeleteBlock}
                    className="w-full py-3 px-4 rounded-xl border border-red-200 bg-white text-red-600 hover:bg-red-50 hover:border-red-300 flex items-center justify-center gap-2 text-sm font-bold transition-all shadow-sm"
                >
                    <TrashIcon className="w-4 h-4 stroke-2" />
                    Eliminar este Bloque
                </button>
            </div>
        </div>
    );
}