document.addEventListener("DOMContentLoaded", () => {
  const titulo = document.getElementById("matrix-title");
  if (!titulo) return; // Evita errores si el elemento no existe

  const textoOriginal = "VMT Tickets";
  const glifos = "ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789#$&%@+?*";
  let iteracion = 0;
  
  const intervalo = setInterval(() => {
    titulo.innerText = textoOriginal
      .split("")
      .map((letra, indice) => {
        if (indice < iteracion) {
          return textoOriginal[indice];
        }
        if (textoOriginal[indice] === " ") {
          return " ";
        }
        return glifos[Math.floor(Math.random() * glifos.length)];
      })
      .join("");
    
    if (iteracion >= textoOriginal.length) {
      clearInterval(intervalo);
    }
    
    iteracion += 1 / 3;
  }, 30);

  // Mantenemos aquí también la lógica del botón que tenías antes
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
