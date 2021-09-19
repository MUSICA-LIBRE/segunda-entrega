
let miUrl = '';
                                              //Evento push
self.addEventListener('push', evento => {
  let { title, message, action1 } = evento.data.json();
  //Destructuring de un array con un objeto dentro
  let [{ action }] = action1;
  miUrl = action;
    //API del navegador 'Notification'
    self.registration.showNotification(title, {
          body: message, 
          icon: '../images/icon musica libre.png',
          actions: action1
    });
});
                                              //Evento notificationclick
// Escuchamos el click:
self.addEventListener('notificationclick', evento => {
                                              //En ventana de notificación
//Cerrar notificación
const notificacionCliqueada = evento.notification;
  notificacionCliqueada.close();
                                              //En boton de acción
  if (evento.action && miUrl) {
//Abrir el sitio o enfocar en él si está abierto
    
//Usando la API de URL con el objeto de ubicación devolverá una URL absoluta
const urlParaAbrir = new URL(miUrl, self.location.origin).href;
//Lista de las pestañas y ventanas abiertas actualmente
const promiseChain = clients.matchAll({
  type: 'window',
  includeUncontrolled: true 
})
//Comparamos sus URL con la URL que queremos abrir
.then((windowClients) => {
  let matchingClient = null;

  for (let i = 0; i < windowClients.length; i++) {
    const windowClient = windowClients[i];
    if (windowClient.url === urlParaAbrir) {
      matchingClient = windowClient;
      break;
    }
  }
//Enfocamos el sitio del cliente que coincida
  if (matchingClient) {
    return matchingClient.focus();
  } 
//Si no podemos encontrar un cliente que coincida, abrimos una nueva ventana con el sitio
  else {
    return clients.openWindow(urlParaAbrir);
  }
});
evento.waitUntil(promiseChain);
} 
});
