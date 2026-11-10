
document.addEventListener("DOMContentLoaded", () => {

  // =========================================================================
  // 1. ANIMACIÓN MATRIX: REVELADO LENTO DE IZQUIERDA A DERECHA
  // =========================================================================

  const titulo = document.getElementById("matrix-title");

  if (titulo) {
    const textoOriginal = "VMT Tickets";
    const glifos = "ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789#$&%@+?*";

    let posicionActual = 0;

    const intervalo = setInterval(() => {

      titulo.innerText = textoOriginal
        .split("")
        .map((letra, indice) => {

          // Letras ya reveladas
          if (indice < Math.floor(posicionActual)) {
            return textoOriginal[indice];
          }

          // Mantener los espacios
          if (letra === " ") {
            return " ";
          }

          // Letra que se está descifrando
          if (indice === Math.floor(posicionActual)) {
            return glifos[Math.floor(Math.random() * glifos.length)];
          }

          // Letras todavía ocultas
          return " ";

        })
        .join("");

      // Velocidad de revelado: cuanto menor, más lenta
      posicionActual += 0.18;

      // Finalizar cuando se haya revelado todo el texto
      if (posicionActual >= textoOriginal.length) {
        titulo.innerText = textoOriginal;
        clearInterval(intervalo);
      }

    }, 45);

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
