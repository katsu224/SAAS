'use client';

import { useState } from 'react';
import { PhotoIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface ImageUploaderProps {
    defaultValue?: string;
    onUrlChange: (url: string) => void;
}

export default function ImageUploader({ defaultValue, onUrlChange }: ImageUploaderProps) {
    const [imageUrl, setImageUrl] = useState(defaultValue || '');
    const [isUploading, setIsUploading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // Lógica REAL de subida a Cloudinary
    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setErrorMsg('');
        
        // Preparamos los datos para Cloudinary
        const formData = new FormData();
        formData.append('file', file);
        
        // Obtiene el preset del archivo .env.local
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

        if (!uploadPreset || !cloudName) {
            setErrorMsg("Faltan variables de entorno de Cloudinary.");
            setIsUploading(false);
            return;
        }

        formData.append('upload_preset', uploadPreset);

        try {
            // Hacemos el POST directo a la API de Cloudinary
            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                { 
                    method: 'POST', 
                    body: formData 
                }
            );

            if (!res.ok) throw new Error("Fallo en la subida a Cloudinary");

            const data = await res.json();
            
            // data.secure_url contiene el link final de la imagen subida
            setImageUrl(data.secure_url);
            onUrlChange(data.secure_url);
            
        } catch (error) {
            console.error('Upload Error:', error);
            setErrorMsg("Error al subir la imagen. Intenta de nuevo.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-2">
            {imageUrl ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-gray-100 dark:bg-white group">
                    <img src={imageUrl} alt="Uploaded" className="object-cover w-full h-full" />
                    
                    {/* Overlay oscuro al hacer hover para ver mejor el botón */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                            type="button"
                            onClick={() => { setImageUrl(''); onUrlChange(''); }}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg transform transition-transform hover:scale-105"
                        >
                            Eliminar Imagen
                        </button>
                    </div>
                    <input type="hidden" value={imageUrl} />
                </div>
            ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-50/50 transition-colors relative overflow-hidden">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {isUploading ? (
                            <>
                                <ArrowPathIcon className="w-8 h-8 mb-2 text-[#9D2B48] animate-spin" />
                                <p className="text-sm font-bold text-[#9D2B48]">
                                    Subiendo imagen...
                                </p>
                            </>
                        ) : (
                            <>
                                <PhotoIcon className="w-8 h-8 mb-2 text-zinc-400 group-hover:text-[#9D2B48] transition-colors" />
                                <p className="text-sm text-zinc-500 font-medium">
                                    Haz clic para subir o arrastra la imagen
                                </p>
                                <p className="text-xs text-zinc-400 mt-1">PNG, JPG, WEBP (Max. 5MB)</p>
                            </>
                        )}
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={isUploading} />
                </label>
            )}
            
            {/* Mensaje de error visual */}
            {errorMsg && (
                <p className="text-xs font-bold text-red-500 mt-1 flex items-center gap-1">
                    <span>⚠️</span> {errorMsg}
                </p>
            )}

             {/* Fallback text input for manual URL */}
             {!imageUrl && !isUploading && (
                 <input 
                    type="text" 
                    placeholder="O pega la URL de una imagen aquí..." 
                    className="w-full text-xs p-3 border border-zinc-200 rounded-lg dark:bg-white dark:border-zinc-300 outline-none focus:ring-2 focus:ring-[#9D2B48]/20 focus:border-[#9D2B48] transition-all"
                    onChange={(e) => { setImageUrl(e.target.value); onUrlChange(e.target.value); }}
                />
             )}
        </div>
    );
}