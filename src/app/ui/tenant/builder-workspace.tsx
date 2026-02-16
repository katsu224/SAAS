'use client';

import { useState } from 'react';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import ContentForm from '@/app/ui/tenant/content-form';
import LiveIframe from '@/app/ui/tenant/live-iframe';
import { PencilSquareIcon, ViewColumnsIcon, ArrowsPointingOutIcon, ComputerDesktopIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

export default function BuilderWorkspace({ page, blocks, siteId, cleanBaseUrl, cleanSlug, previewUrl }: any) {
    const [showPreview, setShowPreview] = useState(true);
    // NUEVO ESTADO: Controla si vemos la versión de PC o Celular
    const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

    return (
        <div className="flex h-[calc(100vh-64px)] w-full bg-zinc-50 overflow-hidden">
            
            {/* ── PANEL IZQUIERDO: FORMULARIO ── */}
            <div className={`${showPreview ? 'w-full md:w-[450px] lg:w-[500px]' : 'w-full max-w-4xl mx-auto'} flex-shrink-0 border-r border-zinc-200 bg-zinc-50 overflow-y-auto flex flex-col custom-scrollbar transition-all duration-500 ease-in-out`}>
                <div className="p-6 space-y-6 pb-32">
                    
                    <div className="flex items-center justify-between">
                        <Breadcrumbs
                            breadcrumbs={[
                                { label: 'Sitios', href: '/tenant/dashboard', icon: '🏠' },
                                { label: page.title, href: `/tenant/dashboard/sites/${siteId}/pages/${page.id}`, active: true, icon: '📄' },
                            ]}
                        />
                        <button 
                            onClick={() => setShowPreview(!showPreview)}
                            className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs font-bold text-zinc-600 hover:text-[#9D2B48] hover:border-[#9D2B48]/30 shadow-sm transition-all active:scale-95"
                        >
                            {showPreview ? <ArrowsPointingOutIcon className="w-4 h-4" /> : <ViewColumnsIcon className="w-4 h-4" />}
                            {showPreview ? 'Expandir Editor' : 'Ver Pantalla Dividida'}
                        </button>
                    </div>
                    
                    <header className="mb-6 relative bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#9D2B48]/10 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
                        <h1 className="text-2xl font-black text-zinc-900 tracking-tight relative z-10">{page.title}</h1>
                        <p className="text-sm text-zinc-500 mt-1 relative z-10">Edita los textos e imágenes aquí.</p>
                    </header>

                    <div className="flex items-center justify-between px-1 border-b border-zinc-200 pb-3">
                        <h2 className="text-sm font-bold text-zinc-800 flex items-center gap-2">
                            <PencilSquareIcon className="w-4 h-4 text-[#9D2B48]" /> Contenido de la página
                        </h2>
                    </div>

                    <div className="grid gap-5">
                        {blocks.length === 0 ? (
                            <div className="bg-white p-10 rounded-2xl border-2 border-dashed border-zinc-200 text-center shadow-sm">
                                <h3 className="text-lg font-bold text-zinc-900 mb-2">Aún no hay contenido</h3>
                            </div>
                        ) : (
                            blocks.map((block: any) => (
                                <ContentForm 
                                    key={block.id}
                                    pageId={page.id} 
                                    block={block} 
                                    websiteUrl={cleanBaseUrl} 
                                    pageSlug={cleanSlug} 
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* ── PANEL DERECHO: VISTA PREVIA (Con Celular/Desktop) ── */}
            {showPreview && (
                <div className="flex-1 bg-zinc-200/80 p-4 lg:p-8 flex flex-col relative hidden md:flex items-center justify-center overflow-hidden animate-in slide-in-from-right-8 duration-500">
                    
                    {/* Botones Flotantes: Celular o PC */}
                    <div className="absolute top-4 right-8 z-10 flex bg-white rounded-lg shadow-sm border border-zinc-200 p-1">
                        <button
                            onClick={() => setDevice('desktop')}
                            className={`p-2 rounded-md transition-all ${device === 'desktop' ? 'bg-zinc-100 text-[#9D2B48] shadow-inner' : 'text-zinc-400 hover:text-zinc-600'}`}
                            title="Vista Escritorio"
                        >
                            <ComputerDesktopIcon className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setDevice('mobile')}
                            className={`p-2 rounded-md transition-all ${device === 'mobile' ? 'bg-zinc-100 text-[#9D2B48] shadow-inner' : 'text-zinc-400 hover:text-zinc-600'}`}
                            title="Vista Celular"
                        >
                            <DevicePhoneMobileIcon className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Contenedor del Iframe animado */}
                    <div className={`transition-all duration-500 ease-in-out flex flex-col bg-white overflow-hidden shadow-2xl relative ${
                        device === 'mobile'
                        ? 'w-[375px] h-[812px] rounded-[3rem] border-[14px] border-zinc-900 mt-6 shadow-zinc-900/20' // Estilo iPhone
                        : 'w-full h-full rounded-xl border border-zinc-200' // Estilo Escritorio
                    }`}>

                        {/* Cabecera del navegador (solo visible en PC) */}
                        {device === 'desktop' && (
                            <div className="bg-zinc-100 border-b border-zinc-200 px-4 py-2.5 flex items-center gap-4 shrink-0">
                                <div className="flex gap-1.5 opacity-80">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                </div>
                                <div className="bg-white text-zinc-500 text-[11px] px-4 py-1.5 rounded-md font-mono flex-1 max-w-xl mx-auto text-center flex items-center justify-center gap-2 border border-zinc-200 shadow-sm overflow-hidden whitespace-nowrap">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0"></span>
                                    {previewUrl}
                                </div>
                            </div>
                        )}

                        {/* Muesca del iPhone (Solo visible en celular) */}
                        {device === 'mobile' && (
                            <div className="absolute top-0 inset-x-0 h-6 flex justify-center pointer-events-none z-50">
                                <div className="w-32 h-6 bg-zinc-900 rounded-b-2xl"></div>
                            </div>
                        )}

                        {/* El componente que carga la web */}
                        <div className="flex-1 w-full bg-white relative">
                            <LiveIframe url={previewUrl} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}