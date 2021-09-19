                                                    //Aquí inicia el reproductor
// Guardar los 3 botones en un objeto
let buttons = {
  play: document.getElementById("btn-play"),
  pause: document.getElementById("btn-pause"),
  stop: document.getElementById("btn-stop"),
};

// Crea una instancia de wave surfer con su configuración
let Spectrum = WaveSurfer.create({
  container: "#audio-spectrum",
  progressColor: "#03a9f4",
});

// Manipular boton de reproducir
buttons.play.addEventListener(
  "click",
  function () {
    Spectrum.play();

    // Activar/Desactivar respectivamente botones
    buttons.stop.disabled = false;
    buttons.pause.disabled = false;
    buttons.play.disabled = true;
  },
  false
);

// Manipular boton de pausa
buttons.pause.addEventListener(
  "click",
  function () {
    Spectrum.pause();

    // Activar/Desactivar respectivamente botones
    buttons.pause.disabled = true;
    buttons.play.disabled = false;
  },
  false
);

// Manipular boton de detener
buttons.stop.addEventListener(
  "click",
  function () {
    Spectrum.stop();

    // Activar/Desactivar respectivamente botones
    buttons.pause.disabled = true;
    buttons.play.disabled = false;
    buttons.stop.disabled = true;
  },
  false
);

// Agregar un event listener para activar el boton de reproducir una vez que el audio este cargado
Spectrum.on("ready", function () {
  buttons.play.disabled = false;
});

// Si quieres un modo responsivo (cuando el usuario redimensiona la ventana)
// las ondas serán igualmente reproducibles
window.addEventListener(
  "resize",
  function () {
    // Obten el progreso de acuerdo a la posición del cursor
    let currentProgress = Spectrum.getCurrentTime() / Spectrum.getDuration();

    // Resetear gráfica
    Spectrum.empty();
    Spectrum.drawBuffer();

    // Colocar posición original
    Spectrum.seekTo(currentProgress);

    // Activar/Desactivar respectivamente botones
    buttons.pause.disabled = true;
    buttons.play.disabled = false;
    buttons.stop.disabled = false;
  },
  false
);

//Obtenemos el atributo type de mi elemento cliqueado
//y se lo entregamos a Spectrum.load
let variableParaGuardarElementoSeleccionado = document.getElementById("miAudio"),
    cargarTrack = document.getElementById("cargarTrack");

cargarTrack.addEventListener("click", function () {
  let contenidoDelA = variableParaGuardarElementoSeleccionado.getAttribute("type");

  Spectrum.load(contenidoDelA);
});

                                                        //Aquí inicia el Botón ir arriba
//Función para el botón ir arriba
$(document).ready(function () {
  $(".ir-arriba").click(function () {
    $("body, html").animate(
      {
        scrollTop: "0px",
      },
      300
    );
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $(".ir-arriba").slideDown(300);
    } else {
      $(".ir-arriba").slideUp(300);
    }
  });
});

                                                        //Aquí inicia la Ventana Modal
//Seleccionar los elementos necesarios
const btnCerrar = document.getElementById('btn-cerrar'),
btnAceptar = document.getElementById('btn-aceptar'),
modal = document.getElementById('modal'),
sectionModal = document.getElementById('sectionModal');

//Validar si nunca se pidió autorización al usuario
if(Notification.permission == null || Notification.permission == "default") {
  procesoNotificacion()
} else {
      console.log('Ya la notificación fue enviada con anterioridad');
      sectionModal.classList.add('noMostrar')
};

function procesoNotificacion() {

  //Desaparecer la ventana modal al dar click en botón aceptar  
  btnAceptar.addEventListener('click', agregarClase);

  function agregarClase() {
    btnCerrar.classList.add('desaparecer');
    modal.classList.add('desaparecer')
  };

//Función para mostrar una sola vez la ventana modal usando sessionStorage
function ventanaModal() {
  let valueSessionStorage = '';
  if(sessionStorage.getItem('modalAbierto') == null) {
    sessionStorage.setItem('modalAbierto', false);
    valueSessionStorage = sessionStorage.getItem('modalAbierto');
  };
  if(!valueSessionStorage) {
    sectionModal.classList.add('noMostrar')
    };

    btnCerrar.addEventListener('click', cambiarValor);
    btnAceptar.addEventListener('click', cambiarValor);
  
  function cambiarValor() {
    sessionStorage.setItem('modalAbierto', true);
    valueSessionStorage = sessionStorage.getItem('modalAbierto')
  };

  //Llamar al proceso de serviceWorker, PushManager y notification
  btnAceptar.addEventListener('click', () => {
    notificacionJS()
  });
};
//Llamar función al cargar la sessión ventana modal
function pronto() {
   sectionModal.onload = ventanaModal()
  };
pronto();
};

                          //Función para desabilitar los botones si el input está vacío. (Ahora no hace nada importante)
let inputTitulo = document.getElementById("titulo");
let botonTitulo = document.getElementById("buscar-titulo");
botonTitulo.disabled = true;
inputTitulo.addEventListener("change", manipularEstado);
function manipularEstado() {
  if (inputTitulo.value === "") {
    botonTitulo.disabled = true;
    alert("botón no activo. Por favor complete el campo");
  } else {
    botonTitulo.disabled = false;
    console.log("botón activo");
  }
}
//Así con el resto (Artista)
