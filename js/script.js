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
    // 2. FUNCIÓN DE NAVEGACIÓN ANIMADA (Dashboard)
    // --------------------------------------------------------------------------
    const allSections = document.querySelectorAll('section');

    const navigateToSection = (targetHash) => {
        const cleanHash = targetHash.replace(/^#/, '');
        const targetSection = document.getElementById(cleanHash);

        // Ocultar todas las secciones del Dashboard con animación
        allSections.forEach(sec => {
            if (sec.classList.contains('animated-section')) {
                sec.classList.remove('active');
                // Usamos un timeout para asegurar que la animación 'slideOut' (si existiera)
                // o la clase 'hidden' se aplica después del proceso de navegación.
                // Aquí solo nos enfocamos en que se quiten las clases activas.
                setTimeout(() => {
                    sec.classList.add('hidden');
                }, 400); // 400ms es seguro, la animación CSS es de 500ms
            }
        });

        if (targetSection && targetSection.classList.contains('animated-section')) {
            // Mostrar la sección destino y aplicar la animación
            targetSection.classList.remove('hidden');
            // Timeout pequeño para forzar la re-pintura y aplicar la animación
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
        const isDashboardHash = document.getElementById(cleanHash)?.classList.contains('animated-section');

        if (isDashboardHash) {
            // 1. Mostrar vista Dashboard si no está activa
            if (sesionOculta.classList.contains('hidden')) {
                toggleDashboardView(true); // Esto fuerza el hash a #dashboard-inicio.
                // Si el usuario navegó directamente, debemos sobreescribir el hash después
                // de la transición inicial de toggleDashboardView
                setTimeout(() => navigateToSection(currentHash), 50); 
                return;
            }
            // 2. Ejecutar la animación dentro del Dashboard
            navigateToSection(currentHash);
        } else {
            // Vista Pública (#inicio o #galeria)
            allSections.forEach(sec => sec.classList.add('hidden'));
            const targetSection = document.getElementById(cleanHash);
            if (targetSection) {
                targetSection.classList.remove('hidden');
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
            // Clases para alternar color de fondo del toggle
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
