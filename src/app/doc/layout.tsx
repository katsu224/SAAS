'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
    BookOpenIcon, 
    Bars3Icon,
    XMarkIcon
} from '@heroicons/react/24/outline';

export default function DocLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;
    const linkClass = (path: string) => `block transition-colors hover:text-[#9D2B48] ${isActive(path) ? 'text-[#9D2B48] font-bold' : ''}`;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-[#9D2B48] selection:text-white">
            
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                         <div className="w-8 h-8 bg-gradient-to-br from-[#9D2B48] to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                             <BookOpenIcon className="w-5 h-5 text-white" />
                         </div>
                         <Link href="/doc" className="font-bold text-xl tracking-tight text-slate-900">
                            CMS Docs
                         </Link>
                    </div>
                    {/* Mobile Menu Button */}
                    <button 
                        className="lg:hidden p-2 text-slate-600"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                    >
                        {isSidebarOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
                
                {/* Sidebar Navigation */}
                <aside className={`fixed inset-y-0 left-0 bg-white lg:bg-transparent z-40 w-64 lg:w-auto transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:block border-r border-slate-100 lg:border-0 pt-20 lg:pt-0 p-6 lg:p-0 shadow-xl lg:shadow-none overflow-y-auto ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                     <nav className="space-y-8 sticky top-24">
                         
                         <div>
                             <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Introducción</h5>
                             <ul className="space-y-3 text-sm font-medium text-slate-600">
                                 <li><Link href="/doc" className={linkClass('/doc')}>Inicio & Filosofía</Link></li>
                                 <li><Link href="/doc/concepts" className={linkClass('/doc/concepts')}>Conceptos Básicos</Link></li>
                             </ul>
                         </div>

                         <div>
                             <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Desarrollo</h5>
                             <ul className="space-y-3 text-sm font-medium text-slate-600">
                                 <li><Link href="/doc/api" className={linkClass('/doc/api')}>Referencia API</Link></li>
                                 <li><Link href="/doc/integration" className={linkClass('/doc/integration')}>Guías de Integración</Link></li>
                                 <li><Link href="/doc/modeling" className={linkClass('/doc/modeling')}>Modelo de Datos</Link></li>
                             </ul>
                         </div>

                         <div>
                             <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Avanzado</h5>
                             <ul className="space-y-3 text-sm font-medium text-slate-600">
                                 <li><Link href="/doc/recipes" className={linkClass('/doc/recipes')}>Recetas & Patrones</Link></li>
                                 <li><Link href="/doc/use-cases" className={linkClass('/doc/use-cases')}>Casos de Uso Reales</Link></li>
                             </ul>
                         </div>

                     </nav>
                </aside>

                {/* Overlay fo mobile */}
                {isSidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black/20 z-30 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                <main className="min-w-0">
                    {children}
                </main>
            </div>
        </div>
    );
}
