var coloresBase = ["red", "blue", "green", "yellow"],
    secuenciaJuego = [],
    secuenciaUsuario = [],
    nivelActual = 0,
    juegoIniciado = false;


    $(document).keypress(function() {
  if (!juegoIniciado) {
    $("#level-title").text("Nivel " + nivelActual);
    generarSecuencia();
    juegoIniciado = true;
  }
});

$(".btn").click(function() {
  var colorSeleccionado = $(this).attr("id");
  secuenciaUsuario.push(colorSeleccionado);
  reproducirSonido(colorSeleccionado);
  animarPresionado(colorSeleccionado);
  verificarRespuesta(secuenciaUsuario.length - 1);
});

function generarSecuencia() {
  secuenciaUsuario = [];
  nivelActual++;
  $("#level-title").text("Nivel " + nivelActual);
  var indiceRandom = Math.floor(Math.random() * 4);
  var colorRandom = coloresBase[indiceRandom];
  secuenciaJuego.push(colorRandom);
  $("#" + colorRandom).fadeIn(100).fadeOut(100).fadeIn(100);
  reproducirSonido(colorRandom);
}

function reproducirSonido(nombre) {
  new Audio("sounds/" + nombre + ".mp3").play();
}

function animarPresionado(color) {
  $("#" + color).addClass("pressed");
  setTimeout(() => $("#" + color).removeClass("pressed"), 100);
}

function verificarRespuesta(indice) {
  if (secuenciaJuego[indice] === secuenciaUsuario[indice]) {
    if (secuenciaUsuario.length === secuenciaJuego.length) {
      setTimeout(() => generarSecuencia(), 1000);
    }
  } else {
    reproducirSonido("wrong");
    $("body").addClass("game-over");
    setTimeout(() => $("body").removeClass("game-over"), 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    reiniciarJuego();
  }
}

function reiniciarJuego() {
  nivelActual = 0;
  secuenciaJuego = [];
  juegoIniciado = false;
}