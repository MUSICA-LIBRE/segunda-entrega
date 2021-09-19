
/* Creamos nuestra función para la ventana entrar */
$(document).ready(function () {
  $(".entrar_on").click(function () {
    $("#s1").toggleClass("visible_entrar");
  });
});
/* Creamos nuestra función para la ventana registrar */
$(document).ready(function () {
  $(".registrar_on").click(function () {
    $("#s2").toggleClass("visible_registrar");
  });
});

/* Validar checkbox de Términos y Condiciones */
function validarFormulario() {
  const inputCheckbox = document.getElementById('terminos').checked;
      
      if(inputCheckbox == false) {
          document.getElementById('info').innerHTML = 'Debe Aceptar';
          return false
      } else {
          return true
      };   
}