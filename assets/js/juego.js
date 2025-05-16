(() => {
  "use strict";
  /**
   * 2C = Two of Clubs (Tréboles)
   * 2D = Two of Diamonds (Diamantes)
   * 2H = Two of Hearts (Corazones)
   * 2S = Two of Spades (Espadas)
   */

  let   deck = [],
        tipos = ["C", "D", "H", "S"],
        especiales = ["A", "J", "Q", "K"],
        puntosJugador = 0,
        puntosComputadora = 0;

  // Referencias HTML
  const btnNuevo = document.querySelector("#btnNuevo"),
        btnPedir = document.querySelector("#btnPedir"),
        btnDetener = document.querySelector("#btnDetener"),
        divPuntosJugador = document.querySelector("#puntosJugador"),
        divPuntosComputadora = document.querySelector("#puntosComputadora"),
        divCartasJugador = document.querySelector("#jugador-cartas"),
        divCartasComputadora = document.querySelector("#computadora-cartas"),
  // Referencias HTML Modal
        btnModalNuevo = document.getElementById("btnNuevoJuegoModal"),
        btnCerrarModal = document.getElementById("btnCerrarModal"),
        mensajeResultado = document.getElementById("mensajeResultado"),
        modal = document.getElementById("resultadoModal"),
        puntajeFinalJugador = document.getElementById("puntajeFinalJugador"),
        puntajeFinalComputadora = document.getElementById("puntajeFinalComputadora");

  /**
   * Crea un nuevo deck (Baraja)
   * @returns Retorna un nuevo deck (Baraja)
   */
  const crearDeck = () => {
    // Creamos cartas del 2 al 10
    for (let i = 2; i <= 10; i++) {
      for (let tipo of tipos) {
        deck.push(i + tipo);
      }
    }
    // Creamos cartas especiales
    for (let tipo of tipos) {
      for (let esp of especiales) {
        deck.push(esp + tipo);
      }
    }
    // Retornamos el deck mezclado
    return _.shuffle(deck);;
  };
  crearDeck();
  /**
   * Pide una carta de la baraja
   * @returns Retorna una carta
   */
  const pedirCarta = () => {
    // Validar que haya cartas en el deck
    if (deck.length === 0) {
      return "No hay cartas en el deck";
    }
    // Retornamos última carta del deck
    return deck.pop();
  };
  /**
   * Obtiene el valor de la carta
   * @param {string} carta Carta a obtener el valor
   * @returns Retorna el valor de la carta
   */
  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  };

  /**
   * Muestra el resultado del juego
   */
  const mostrarResultado = () => {
    puntajeFinalJugador.textContent = puntosJugador;
    puntajeFinalComputadora.textContent = puntosComputadora;

    if (puntosComputadora === puntosJugador) {
      mensajeResultado.textContent = "Nadie gana";
      modal.removeAttribute("hidden");
    } else if (puntosJugador > 21) {
      mensajeResultado.textContent = "Computadora gana";
      modal.removeAttribute("hidden");
    } else if (puntosComputadora > 21) {
      mensajeResultado.textContent = "Jugador gana";
      modal.removeAttribute("hidden");
    } else if (puntosComputadora > puntosJugador) {
      mensajeResultado.textContent = "Computadora gana";
      modal.removeAttribute("hidden");
    }
  };

  /**
   * Turno de la computadora
   * @param {number} puntosJugador Puntos del jugador
   * @returns Puntos de la computadora
   */
  const turnoComputadora = (puntosJugador) => {
    do {
      // Pido la carta
      const carta = pedirCarta();
      // Obtengo el valor de la carta
      const valor = valorCarta(carta);
      // Sumo el valor a los puntos de la computadora
      puntosComputadora += valor;
      divPuntosComputadora.innerText = puntosComputadora;
      // Muestro la carta en el HTML
      const imgCarta = document.createElement("img");
      imgCarta.src = `./assets/cartas/${carta}.png`;
      imgCarta.classList.add("carta");
      divCartasComputadora.append(imgCarta);
      mostrarResultado();
    } while (puntosComputadora < puntosJugador && puntosJugador <= 21);
  };

  /**
   * Reinicia el juego
   */
  const nuevoJuego = () => {
    deck = [];
    puntosJugador = 0;
    puntosComputadora = 0;
    divCartasJugador.innerHTML = "";
    divCartasComputadora.innerHTML = "";
    divPuntosJugador.innerText = 0;
    divPuntosComputadora.innerText = 0;
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    crearDeck();
  };

  // Eventos
  btnPedir.addEventListener("click", () => {
    // Pido la carta
    const carta = pedirCarta();
    // Obtengo el valor de la carta
    const valor = valorCarta(carta);
    // Sumo el valor a los puntos del jugador
    puntosJugador += valor;
    // Muestro el valor en el HTML
    divPuntosJugador.innerText = puntosJugador;
    // Muestro la carta en el HTML
    const imgCarta = document.createElement("img");
    imgCarta.src = `./assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasJugador.append(imgCarta);

    // Validar si el jugador perdió
    if (puntosJugador > 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    }
  });

  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  });

  btnNuevo.addEventListener("click", () => {
    nuevoJuego();
  });

  btnModalNuevo.addEventListener("click", function () {
    nuevoJuego();
    modal.setAttribute("hidden", true);
  });

  btnCerrarModal.addEventListener("click", function () {
    modal.setAttribute("hidden", true);
  });
})();
