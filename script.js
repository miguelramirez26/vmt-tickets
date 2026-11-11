document.addEventListener("DOMContentLoaded", () => {

  // =========================================================================
  // 1. TÍTULO QUE SE DESCIFRA DE IZQUIERDA A DERECHA (MATRIX)
  //    Misma tipografía y velocidad que tenías. Cada letra reserva su ancho
  //    final, así el título no se mueve ni tiembla mientras se descifra.
  // =========================================================================

  const titulo = document.getElementById("matrix-title");

  if (titulo) {
    const textoOriginal = "VMT Tickets";
    const glifos = "ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789#$&%@+?*";
    const sinAnimacion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!sinAnimacion) {
      // Una caja por letra, con el ancho que tendrá la letra final
      titulo.setAttribute("aria-label", textoOriginal);
      titulo.textContent = "";

      const cajas = textoOriginal.split("").map((letra) => {
        const caja = document.createElement("span");
        caja.setAttribute("aria-hidden", "true");
        caja.style.display = "inline-block";
        caja.style.whiteSpace = "pre";
        caja.style.textAlign = "center";
        caja.textContent = letra;
        titulo.appendChild(caja);
        return caja;
      });

      // Medir y fijar el ancho de cada caja, y luego ocultar las letras
      cajas.forEach((caja) => {
        caja.style.width = caja.getBoundingClientRect().width + "px";
        caja.textContent = "";
      });

      let posicionActual = 0;

      const dibujar = () => {
        cajas.forEach((caja, indice) => {
          const letra = textoOriginal[indice];

          if (indice < Math.floor(posicionActual)) {
            caja.textContent = letra;                       // ya descifrada
          } else if (letra === " ") {
            caja.textContent = " ";                         // espacio
          } else if (indice === Math.floor(posicionActual)) {
            caja.textContent = glifos[Math.floor(Math.random() * glifos.length)];
          } else {
            caja.textContent = "";                          // todavía oculta
          }
        });
      };

      // Esperar a que el título empiece a aparecer (coincide con el CSS: .85s)
      setTimeout(() => {
        const intervalo = setInterval(() => {
          dibujar();

          // VELOCIDAD ORIGINAL
          posicionActual += 0.25;

          if (posicionActual >= textoOriginal.length) {
            cajas.forEach((caja, indice) => {
              caja.textContent = textoOriginal[indice];
            });
            clearInterval(intervalo);
          }
        }, 40);
      }, 850);
    }
  }

  // =========================================================================
  // 2. CONTROL DEL BOTÓN DE ACCESO
  // =========================================================================

  const openLink = document.getElementById("openLink");
  const openButtonText = document.getElementById("openButtonText");

  if (openLink && openButtonText) {

    openLink.addEventListener("click", function () {
      openLink.classList.add("is-loading");
      openButtonText.textContent = "Cargando...";
    });

    window.addEventListener("pageshow", function () {
      openLink.classList.remove("is-loading");
      openButtonText.textContent = "Abrir VMT Tickets";
    });

  }

});
