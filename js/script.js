const botonAcceder = document.getElementById('btnAcceder');
const acceso = document.getElementById('pantalla-acceso');
const contenido = document.getElementById('contenido-principal');
const modalLogin = document.getElementById('modalLogin');
const body = document.body;

// VARIABLES PARA LA NAVEGACIÓN
const btnExplorar = document.getElementById('btnExplorar');
const sesionOculta = document.getElementById('sesion-oculta');
const headerNormal = document.getElementById('header-normal');
const headerAvanzado = document.getElementById('header-avanzado');

// Elementos para el MODO CLARO/OSCURO
const themeToggle = document.getElementById('theme-toggle');
const toggleCircle = document.getElementById('toggle-circle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

// --- FUNCIÓN DE DESCARGA ---
function iniciarDescarga() {
    const linkDescarga = document.getElementById('descarga-secreta');
    if (linkDescarga) {
        linkDescarga.click();
        console.log('Intento de descarga iniciado.');
    }
}
// ----------------------------

// 1. DESCARGA AUTOMÁTICA & INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
    if (acceso && acceso.style.display !== 'none') {
        iniciarDescarga();
    }
    
    // Inicializar el tema basado en el atributo data-theme
    const currentTheme = body.getAttribute('data-theme') || 'dark';
    updateThemeUI(currentTheme);

    // OCULTAR todas las secciones del dashboard al inicio, excepto #dashboard-inicio
    if (sesionOculta) {
        const dashboardSections = sesionOculta.querySelectorAll('section');
        dashboardSections.forEach(section => {
            if (section.id !== 'dashboard-inicio') {
                section.classList.add('hidden');
            }
        });
    }
});


// --- LÓGICA DE NAVEGACIÓN DEL DASHBOARD ---

function navigateDashboard(targetId) {
    // 1. Ocultar todas las secciones del dashboard
    const dashboardSections = sesionOculta.querySelectorAll('section');
    dashboardSections.forEach(section => {
        section.classList.add('hidden');
    });

    // 2. Mostrar la sección destino
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        
        // 3. Scroll suave al inicio de la sección
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Escuchar clics en el header avanzado
document.addEventListener('click', (e) => {
    // Buscar si el clic fue en un enlace del header avanzado
    const link = e.target.closest('#header-avanzado a');
    if (link) {
        const hash = link.getAttribute('href');
        // Solo navega si el hash apunta a una sección dentro del dashboard
        if (hash === '#dashboard-inicio' || hash === '#cuenta' || hash === '#configuracion') {
            e.preventDefault(); // Detiene el scroll nativo
            navigateDashboard(hash.substring(1)); // Llama a la función de navegación (sin el #)
        }
    }
});


// 2. LOGICA DE ACCESO (Modal)
if (botonAcceder) {
    botonAcceder.addEventListener('click', () => {
      iniciarDescarga();
      modalLogin.classList.add('show');
      body.classList.add('modal-active');
    });
}


// Botón Google: cierra modal y muestra contenido principal (Normal)
document.getElementById('btnGoogle').addEventListener('click', () => {
  modalLogin.classList.remove('show');
  body.classList.remove('modal-active');
  
  // Oculta la pantalla de acceso
  acceso.style.display = 'none';
  
  // Muestra el contenido principal
  contenido.style.display = 'block';
  setTimeout(() => contenido.classList.add('show'), 50);
  
  // Asegura que se vea el header normal y se oculte la sesión oculta
  if(sesionOculta) sesionOculta.classList.add('hidden');
  if(headerNormal) headerNormal.classList.remove('hidden');

  window.scrollTo(0,0);
});

// Cerrar modal si se hace click fuera del contenido
modalLogin.addEventListener('click', e => {
  if(e.target === modalLogin) {
    modalLogin.classList.remove('show');
    body.classList.remove('modal-active');
  }
});


// *** LÓGICA: BOTÓN EXPLORAR (Entrar a la Sesión Oculta) ***
if (btnExplorar && sesionOculta) {
    btnExplorar.addEventListener('click', (e) => {
        e.preventDefault();

        // 1. Ocultar contenido normal (Hero y Galeria)
        document.getElementById('inicio').classList.add('hidden');
        document.getElementById('galeria').classList.add('hidden');
        
        // 2. Ocultar el header normal
        headerNormal.classList.add('hidden');

        // 3. Mostrar la Sesión Oculta (el Dashboard Avanzado)
        sesionOculta.classList.remove('hidden');

        // 4. Muestra el header avanzado
        headerAvanzado.classList.remove('hidden');
        
        // 5. Navega a la nueva sección de inicio del dashboard
        window.location.hash = '#dashboard-inicio';
        window.scrollTo(0,0);
    });
}


// *** LÓGICA MODO CLARO/OSCURO ***

function updateThemeUI(theme) {
    // Lógica CSS para cambiar la clase y los iconos
    if (theme === 'light') {
        toggleCircle.style.transform = 'translateX(100%)';
        themeToggle.style.backgroundColor = 'var(--celeste-claro)';
        moonIcon.style.opacity = '0';
        sunIcon.style.opacity = '1';
        body.classList.remove('bg-galaxia-oscuro', 'text-blanco-nebuloso');
        body.classList.add('bg-luz-claro', 'text-negro-espacial');
    } else {
        toggleCircle.style.transform = 'translateX(0)';
        themeToggle.style.backgroundColor = 'var(--galaxia-purpura)';
        moonIcon.style.opacity = '1';
        sunIcon.style.opacity = '0';
        body.classList.remove('bg-luz-claro', 'text-negro-espacial');
        body.classList.add('bg-galaxia-oscuro', 'text-blanco-nebuloso');
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        let currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        updateThemeUI(newTheme);
    });
}
