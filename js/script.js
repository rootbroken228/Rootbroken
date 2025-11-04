document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------------
    // 1. SELECTORES GLOBALES
    // --------------------------------------------------------------------------
    const pantallaAcceso = document.getElementById('pantalla-acceso');
    const contenidoPrincipal = document.getElementById('contenido-principal');
    const sesionOculta = document.getElementById('sesion-oculta');
    const headerNormal = document.getElementById('header-normal');
    const headerAvanzado = document.getElementById('header-avanzado');
    const btnAcceder = document.getElementById('btnAcceder');
    const btnExplorar = document.getElementById('btnExplorar');
    const btnCerrarDashboard = document.getElementById('btnCerrarDashboard');
    const btnCerrarDashboardMovil = document.getElementById('btnCerrarDashboardMovil');
    const btnCerrarSesionCuenta = document.getElementById('btnCerrarSesionCuenta');
    const modalLogin = document.getElementById('modalLogin');
    const btnGoogle = document.getElementById('btnGoogle');
    const descargaSecreta = document.getElementById('descarga-secreta');
    const themeToggle = document.getElementById('theme-toggle');

    // --------------------------------------------------------------------------
    // 2. FUNCIÓN DE NAVEGACIÓN (Controla el Hash URL y las transiciones)
    // --------------------------------------------------------------------------
    const sections = document.querySelectorAll('section');

    const navigateToSection = (targetHash) => {
        // Limpiar el hash para mostrar la sección correcta
        const cleanHash = targetHash.replace(/^#/, '');
        
        // 1. Ocultar todas las secciones
        sections.forEach(sec => {
            sec.classList.remove('active');
            sec.classList.add('hidden');
        });

        // 2. Mostrar la sección destino
        const targetSection = document.getElementById(cleanHash);
        if (targetSection) {
            // Aplicar la animación de slide-in
            targetSection.classList.remove('hidden');
            // Timeout para asegurar que el 'display: none' se ha quitado antes de animar
            setTimeout(() => {
                targetSection.classList.add('active');
            }, 10); 
            
            // 3. Ocultar menú móvil avanzado si está abierto
            const mobileMenuAvanzado = document.getElementById('mobile-menu-avanzado');
            if (mobileMenuAvanzado && !mobileMenuAvanzado.classList.contains('hidden')) {
                mobileMenuAvanzado.classList.add('hidden');
            }
        }
    };

    // --------------------------------------------------------------------------
    // 3. MANEJO DE VISTAS (Público vs. Dashboard)
    // --------------------------------------------------------------------------

    const toggleDashboardView = (isDashboard) => {
        if (isDashboard) {
            // Entrar al Dashboard Avanzado
            headerNormal.classList.add('hidden');
            headerAvanzado.classList.remove('hidden');
            sesionOculta.classList.remove('hidden');
            
            // Navegar a la sección inicial del dashboard
            navigateToSection('#dashboard-inicio');

        } else {
            // Salir del Dashboard Avanzado (Volver a la vista pública)
            headerNormal.classList.remove('hidden');
            headerAvanzado.classList.add('hidden');
            sesionOculta.classList.add('hidden');
            
            // Navegar a la sección de inicio pública
            window.location.hash = '#inicio';
            // El hashchange handler se encarga de mostrar la sección '#inicio'
        }
    };
    
    // --------------------------------------------------------------------------
    // 4. HANDLERS DE EVENTOS
    // --------------------------------------------------------------------------

    // a. Botón ACCEDER (Pantalla inicial)
    btnAcceder.addEventListener('click', () => {
        modalLogin.classList.add('show');
    });

    // b. Botón GOOGLE (Simulación de Login)
    btnGoogle.addEventListener('click', () => {
        modalLogin.classList.remove('show');
        
        // Simular un tiempo de carga y transición
        contenidoPrincipal.style.opacity = '0';
        setTimeout(() => {
            pantallaAcceso.classList.add('hidden');
            contenidoPrincipal.classList.remove('hidden');
            contenidoPrincipal.style.opacity = '1';
            window.location.hash = '#inicio';
        }, 500);
        
        // Ejecutar descarga secreta al loguearse por primera vez (Descarga de archivo)
        descargaSecreta.click();
    });

    // c. Botón EXPLORAR (Dashboard Normal -> Dashboard Avanzado)
    btnExplorar.addEventListener('click', (e) => {
        e.preventDefault();
        toggleDashboardView(true);
    });
    
    // d. Botón CERRAR DASHBOARD (Dashboard Avanzado -> Dashboard Normal)
    [btnCerrarDashboard, btnCerrarDashboardMovil, btnCerrarSesionCuenta].forEach(btn => {
        if(btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                toggleDashboardView(false);
            });
        }
    });

    // e. Manejo de Clics en enlaces con hash (para navegación fluida)
    document.addEventListener('click', (e) => {
        if (e.target.closest('a[href^="#"]')) {
            e.preventDefault();
            const targetHash = e.target.closest('a[href^="#"]').getAttribute('href');
            
            // Si estamos en el dashboard avanzado y navegamos a una de sus secciones internas
            if (sesionOculta && !sesionOculta.classList.contains('hidden') && targetHash.startsWith('#')) {
                window.location.hash = targetHash;
            } 
            // Si estamos en la vista pública
            else if (targetHash === '#inicio' || targetHash === '#galeria') {
                window.location.hash = targetHash;
            }
        }
    });

    // f. Evento Hashchange (El motor de la SPA)
    window.addEventListener('hashchange', () => {
        const currentHash = window.location.hash || '#inicio';
        
        if (sesionOculta && !sesionOculta.classList.contains('hidden')) {
            // Estamos en el Dashboard Avanzado: Usar la navegación animada
            navigateToSection(currentHash);
        } else {
            // Estamos en la vista pública: Mostrar solo las secciones públicas
            sections.forEach(sec => sec.classList.add('hidden'));
            const targetSection = document.getElementById(currentHash.replace(/^#/, ''));
            if (targetSection) {
                targetSection.classList.remove('hidden');
                // Asegurar que el scroll esté arriba al cambiar de sección pública
                window.scrollTo(0, 0); 
            }
        }
    });

    // g. Lógica del Tema Claro/Oscuro
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.body.setAttribute('data-theme', 'light');
            document.getElementById('toggle-circle').style.transform = 'translateX(100%)';
            document.getElementById('sun-icon').style.opacity = '1';
            document.getElementById('moon-icon').style.opacity = '0';
            themeToggle.classList.replace('bg-galaxia-purpura', 'bg-celeste-claro');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            document.getElementById('toggle-circle').style.transform = 'translateX(0)';
            document.getElementById('sun-icon').style.opacity = '0';
            document.getElementById('moon-icon').style.opacity = '1';
            themeToggle.classList.replace('bg-celeste-claro', 'bg-galaxia-purpura');
        }
    });

    // --------------------------------------------------------------------------
    // 5. INICIALIZACIÓN
    // --------------------------------------------------------------------------
    
    // Al cargar la página, ocultar el contenido principal por defecto
    contenidoPrincipal.classList.add('hidden');
    
    // Revisar el hash al cargar la página (para refresco o entrada directa)
    const initialHash = window.location.hash;
    if (initialHash) {
        // Si hay hash, asumimos que el usuario está en la vista pública o Dashboard
        // Esto solo es una simulación. En una aplicación real, se manejaría con rutas de servidor.
        
        // Si el hash es de Dashboard, simular entrada al Dashboard (ej. si se refresca la página)
        if (initialHash.startsWith('#dashboard-') || initialHash === '#cuenta' || initialHash === '#configuracion') {
            pantallaAcceso.classList.add('hidden');
            contenidoPrincipal.classList.remove('hidden');
            toggleDashboardView(true); // Entrar al dashboard avanzado
            navigateToSection(initialHash); // Ir a la subsección específica
        } else {
            // Vista pública
            pantallaAcceso.classList.add('hidden');
            contenidoPrincipal.classList.remove('hidden');
            // Llamar al hashchange handler manualmente para mostrar la sección correcta
            window.dispatchEvent(new Event('hashchange'));
        }
    } else {
        // No hay hash: forzar #inicio para la vista pública
        window.location.hash = '#inicio';
        // El hashchange handler se encargará de ocultar la pantalla de acceso
    }
});
