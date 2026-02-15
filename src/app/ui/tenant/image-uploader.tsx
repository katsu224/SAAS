'use client';

import { useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';

interface ImageUploaderProps {
    defaultValue?: string;
    onUrlChange: (url: string) => void;
}

export default function ImageUploader({ defaultValue, onUrlChange }: ImageUploaderProps) {
    const [imageUrl, setImageUrl] = useState(defaultValue || '');
    const [isUploading, setIsUploading] = useState(false);

    // Placeholder upload function. Replace with actual Cloudinary/S3 logic later.
    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        
        // Simulate upload delay
        setTimeout(() => {
            // Mock URL. In real implementation, formData -> fetch('/api/upload')
            const mockUrl = `https://via.placeholder.com/800x400?text=${encodeURIComponent(file.name)}`;
            setImageUrl(mockUrl);
            onUrlChange(mockUrl);
            setIsUploading(false);
        }, 1500);
    };

    return (
        <div className="space-y-2">
            {imageUrl ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-900">
                    <img src={imageUrl} alt="Uploaded" className="object-cover w-full h-full" />
                    <button 
                        type="button"
                        onClick={() => { setImageUrl(''); onUrlChange(''); }}
                        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 text-xs"
                    >
                        Remove
                    </button>
                    <input type="hidden" value={imageUrl} />
                </div>
            ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <PhotoIcon className="w-8 h-8 mb-2 text-zinc-400" />
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            {isUploading ? 'Uploading...' : 'Click to upload or drag image'}
                        </p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={isUploading} />
                </label>
            )}
             {/* Fallback text input for manual URL if needed */}
             {!imageUrl && (
                 <input 
                    type="text" 
                    placeholder="Or paste image URL..." 
                    className="w-full text-xs p-2 border rounded dark:bg-zinc-900 dark:border-zinc-800"
                    onChange={(e) => { setImageUrl(e.target.value); onUrlChange(e.target.value); }}
                />
             )}
        </div>
    );
}
