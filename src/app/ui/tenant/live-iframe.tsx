'use client';

import { useEffect, useState } from 'react';

export default function LiveIframe({ url }: { url: string }) {
    // Iniciamos con 0 para evitar error de hidratación (Date.now() es diferente en server y client)
    const [timestamp, setTimestamp] = useState(0);

    useEffect(() => {
        // Al montar, ponemos la fecha actual
        setTimestamp(Date.now());

        // Cuando recibe la señal de "guardar", actualiza la hora
        const handleRefresh = (event: any) => {
            console.log("🔄 [LiveIframe] Evento 'refresh-preview' recibido!", event);
            setTimestamp(Date.now());
        };

        window.addEventListener('refresh-preview', handleRefresh);
        console.log("✅ [LiveIframe] Listener 'refresh-preview' activado");
        
        return () => {
             console.log("❌ [LiveIframe] Listener removido");
             window.removeEventListener('refresh-preview', handleRefresh);
        }
    }, []);

    // Si el timestamp es 0 (SSR), no renderizamos el iframe o renderizamos un placeholder
    // para evitar el mismatch, o simplemente usamos la url limpia
    if (timestamp === 0) return <div className="w-full h-full bg-white animate-pulse" />;

    // Le inyectamos la hora a la URL para matar el caché del navegador
    // Verificamos si la URL ya tiene parámetros
    const separator = url.includes('?') ? '&' : '?';
    const cacheBusterUrl = `${url}${separator}t=${timestamp}`;

    console.log("🖼️ [LiveIframe] Renderizando iframe con SRC:", cacheBusterUrl);

    return (
        <iframe 
            key={timestamp} 
            src={cacheBusterUrl} 
            className="w-full h-full border-0 bg-white"
            title="Vista Previa en Vivo"
        />
    );
}