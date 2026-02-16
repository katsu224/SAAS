export default async function SiteDetailsLayout({ 
    children,
    params 
}: { 
    children: React.ReactNode;
    params: Promise<{ id: string }>
}) {
    // Ya no necesitamos traer las páginas (getPages) aquí si no vamos a pintar la barra lateral.
    // Simplemente pasamos el id por si algún componente hijo lo necesita en el layout general.
    const { id } = await params;

    return (
        // Quitamos la restricción flex/h-screen para que el layout fluya con el contenido hijo
        <div className="bg-white min-h-screen"> 
            
            {/* Como eliminamos el Sidebar (<aside>), el <main> ahora ocupa el 100% del espacio.
               Agregamos padding superior y lateral para que el contenido no quede pegado a los bordes.
            */}
            <main className="w-full h-full sm:p-8">
                 {children}
            </main>

        </div>
    );
}