document.addEventListener("DOMContentLoaded", () => {
  // =========================================================================
  // 1. ANIMACIÓN DE REVELADO DE IZQUIERDA A DERECHA (TIPO MATRIZ/TERMINAL)
  // =========================================================================
  const titulo = document.getElementById("matrix-title");
  
  if (titulo) {
    const textoOriginal = "VMT Tickets";
    const glifos = "ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789#$&%@+?*";
    let posicionActual = 0; // Controla qué letra se está descifrando ahora mismo

    const intervalo = setInterval(() => {
      titulo.innerText = textoOriginal
        .split("")
        .map((letra, indice) => {
          // 1. Letras ya descifradas de forma definitiva a la izquierda
          if (indice < Math.floor(posicionActual)) {
            return textoOriginal[indice];
          }
          
          // 2. Respetar espacios en blanco siempre para que no se descuadre el diseño
          if (textoOriginal[indice] === " ") {
            return " ";
          }
          
          // 3. La letra actual que se está descifrando muestra caracteres aleatorios
          if (indice === Math.floor(posicionActual)) {
            return glifos[Math.floor(Math.random() * glifos.length)];
          }
          
          // 4. Letras de la derecha que todavía no ha alcanzado la animación (se quedan invisibles o con un guion bajo)
          return " "; 
        })
        .join("");

      // Avanza la posición del revelado de forma progresiva
      posicionActual += 0.25; // Modifica este valor (ej: 0.15 más lento, 0.4 más rápido) para ajustar la velocidad

      // Detiene la animación cuando supera la longitud del texto
      if (posicionActual >= textoOriginal.length) {
        titulo.innerText = textoOriginal; // Asegura el texto limpio al final
        clearInterval(intervalo);
      }
    }, 40); // Intervalo de refresco en milisegundos
  }

  // =========================================================================
  // 2. LÓGICA DE CARGA Y CONTROL DEL BOTÓN DE ACCESO
  // =========================================================================
  const openLink = document.getElementById('openLink');
  const openButtonText = document.getElementById('openButtonText');

  if (openLink && openButtonText) {
    openLink.addEventListener('click', function () {
      openLink.classList.add('is-loading');
      openButtonText.textContent = 'Cargando...';
    });

    window.addEventListener('pageshow', function () {
      openLink.classList.remove('is-loading');
      openButtonText.textContent = 'Abrir VMT Tickets';
    });
  }
});
