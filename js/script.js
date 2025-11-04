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
    const modalLogin = document.getElementById('modalLogin');
    const btnGoogle = document.getElementById('btnGoogle');
    const descargaSecreta = document.getElementById('descarga-secreta');
    const themeToggle = document.getElementById('theme-toggle');

    // Selectores para cerrar sesión
    const btnCerrarDashboard = document.getElementById('btnCerrarDashboard');
    const btnCerrarDashboardMovil = document.getElementById('btnCerrarDashboardMovil');
    const btnCerrarSesionCuenta = document.getElementById('btnCerrarSesionCuenta');

    // --------------------------------------------------------------------------
    // 2. FUNCIÓN DE NAVEGACIÓN ANIMADA (Dashboard) - CORRECCIÓN CLAVE
    // --------------------------------------------------------------------------
    const allSections = document.querySelectorAll('section');

    const navigateToSection = (targetHash) => {
        const cleanHash = targetHash.replace(/^#/, '');
        const targetSection = document.getElementById(cleanHash);

        // 1. Ocultar y desanimar todas las secciones del Dashboard
        allSections.forEach(sec => {
            if (sec.classList.contains('animated-section')) {
                // Quitar 'active' primero para que la animación de salida (si existiera)
                // o la transición simple se aplique antes de ocultar con display: none
                sec.classList.remove('active'); 
                
                // Usamos un pequeño delay para evitar el 'bug' de superposición
                setTimeout(() => {
                    sec.classList.add('hidden');
                }, 400); // 400ms es seguro, la animación CSS es de 500ms
            }
        });
        
        // 2. Mostrar la sección destino y aplicar la animación
        if (targetSection && targetSection.classList.contains('animated-section')) {
            targetSection.classList.remove('hidden');
            // Timeout pequeño para forzar la re-pintura y aplicar la animación slideIn
            setTimeout(() => {
                targetSection.classList.add('active');
            }, 50); 
            
            // Ocultar menú móvil avanzado si está abierto
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
            
            // Forzar navegación al inicio del dashboard
            window.location.hash = '#dashboard-inicio';
        } else {
            // Salir del Dashboard Avanzado (Volver a la vista pública)
            headerNormal.classList.remove('hidden');
            headerAvanzado.classList.add('hidden');
            sesionOculta.classList.add('hidden');
            
            // Forzar navegación al inicio de la vista pública
            window.location.hash = '#inicio';
            window.scrollTo(0, 0); 
        }
    };
    
    // --------------------------------------------------------------------------
    // 4. HANDLERS DE EVENTOS Y LÓGICA DE INICIO
    // --------------------------------------------------------------------------

    // a. Botón ACCEDER y Login
    btnAcceder.addEventListener('click', () => { modalLogin.classList.add('show'); });
    btnGoogle.addEventListener('click', () => {
        modalLogin.classList.remove('show');
        
        contenidoPrincipal.style.opacity = '0';
        setTimeout(() => {
            pantallaAcceso.classList.add('hidden');
            contenidoPrincipal.classList.remove('hidden');
            contenidoPrincipal.style.opacity = '1';
            window.location.hash = '#inicio';
        }, 500);
        
        // Ejecutar descarga secreta
        descargaSecreta.click();
    });

    // b. Botón EXPLORAR (Entrar al Dashboard)
    btnExplorar.addEventListener('click', (e) => {
        e.preventDefault();
        toggleDashboardView(true);
    });
    
    // c. Botones CERRAR SESIÓN (Salir del Dashboard)
    [btnCerrarDashboard, btnCerrarDashboardMovil, btnCerrarSesionCuenta].forEach(btn => {
        if(btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                toggleDashboardView(false);
            });
        }
    });

    // d. Evento Hashchange (El motor de la SPA)
    window.addEventListener('hashchange', () => {
        const currentHash = window.location.hash || '#inicio';
        const cleanHash = currentHash.replace(/^#/, '');

        // Determinar si el hash apunta a una sección del Dashboard
        const targetElement = document.getElementById(cleanHash);
        const isDashboardHash = targetElement && targetElement.classList.contains('animated-section');

        if (isDashboardHash) {
            // Si ya estamos en la vista Dashboard, solo navegamos y animamos
            if (!sesionOculta.classList.contains('hidden')) {
                navigateToSection(currentHash);
            } 
            // Si no estamos en la vista Dashboard, primero la activamos
            else {
                // Forzar la activación de la vista Dashboard y luego navegar
                headerNormal.classList.add('hidden');
                headerAvanzado.classList.remove('hidden');
                sesionOculta.classList.remove('hidden');
                // Navegar inmediatamente a la sección deseada
                navigateToSection(currentHash);
            }
        } else {
            // Vista Pública (#inicio o #galeria)
            // Aseguramos que las secciones públicas son las únicas visibles.
            allSections.forEach(sec => sec.classList.add('hidden'));
            if (targetElement) {
                targetElement.classList.remove('hidden');
            }
        }
    });

    // e. Lógica del Tema Claro/Oscuro
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
    
    // Lanzar el evento hashchange para mostrar la vista correcta al cargar
    window.dispatchEvent(new Event('hashchange'));
});
