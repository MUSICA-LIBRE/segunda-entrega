/* Creamos nuestra función para menu hamburguesa */

$(document).ready(function () {
  $("#menu_on").click(function () {
    // Al hacer click...
    $("nav").toggleClass("visible_menu"); // Añadimos o eliminamos la clase 'visible_menu'
  });
});
