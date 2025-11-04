const botonAcceder = document.getElementById('btnAcceder');
const acceso = document.getElementById('pantalla-acceso');
const contenido = document.getElementById('contenido-principal');
const modalLogin = document.getElementById('modalLogin');
const body = document.body;

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

// 1. DESCARGA AUTOMÁTICA (Al cargar la página)
document.addEventListener('DOMContentLoaded', () => {
    if (acceso && acceso.style.display !== 'none') {
        iniciarDescarga();
    }
    
    // Inicializar el tema basado en el atributo data-theme
    const currentTheme = body.getAttribute('data-theme') || 'dark';
    updateThemeUI(currentTheme);
});


// 2. DESCARGA AL CLIC EN "ACCEDER" (En la pantalla de inicio)
if (botonAcceder) {
    botonAcceder.addEventListener('click', () => {
      iniciarDescarga();
      
      modalLogin.classList.add('show');
      body.classList.add('modal-active');
    });
}


// Botón Google: cierra modal y muestra contenido principal
document.getElementById('btnGoogle').addEventListener('click', () => {
  modalLogin.classList.remove('show');
  body.classList.remove('modal-active');
  
  // Oculta la pantalla de acceso
  acceso.style.display = 'none';
  
  // Muestra el contenido principal
  contenido.style.display = 'block';
  setTimeout(() => contenido.classList.add('show'), 50);
  
  // Navega directamente a la nueva sección de Inicio
  window.location.hash = '#inicio';
});

// Cerrar modal si se hace click fuera del contenido
modalLogin.addEventListener('click', e => {
  if(e.target === modalLogin) {
    modalLogin.classList.remove('show');
    body.classList.remove('modal-active');
  }
});


// *** LÓGICA MODO CLARO/OSCURO ***

function updateThemeUI(theme) {
    if (theme === 'light') {
        // Mover palanca a la derecha
        toggleCircle.style.transform = 'translateX(100%)';
        themeToggle.style.backgroundColor = 'var(--celeste-claro)';
        moonIcon.style.opacity = '0';
        sunIcon.style.opacity = '1';
        body.classList.remove('bg-galaxia-oscuro', 'text-blanco-nebuloso');
        body.classList.add('bg-luz-claro', 'text-negro-espacial');
    } else {
        // Mover palanca a la izquierda
        toggleCircle.style.transform = 'translateX(0)';
        themeToggle.style.backgroundColor = 'var(--galaxia-purpura)';
        moonIcon.style.opacity = '1';
        sunIcon.style.opacity = '0';
        body.classList.remove('bg-luz-claro', 'text-negro-espacial');
        body.classList.add('bg-galaxia-oscuro', 'text-blanco-nebuloso');
    }
}

themeToggle.addEventListener('click', () => {
    let currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Actualizar el atributo y la UI
    body.setAttribute('data-theme', newTheme);
    updateThemeUI(newTheme);
    
    // NOTA: Para que el modo claro funcione 100% bien,
    // se necesita añadir lógica de colores claros en style.css.
    // Por ahora, solo se invierten los colores de fondo/texto.
});
