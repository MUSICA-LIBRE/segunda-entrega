
function notificacionJS() {

//Llave pública de web-push
const publicKey = 'BIACrE9EQBxI8WDhyokEy3AdKFTpMNJ2AxMZe4lwjAHAbLdHzqWrqMtKHJ9iSW7gqN8LuRGaAi9pI27xDamm7Pk';

                                                //Chequear serviceWorker y PushManager
if('serviceWorker' in navigator && 'PushManager' in window) {
    send().catch(err => console.error('El navegador del usuario no soporta serviceWorker & PushManager', err))
};

async function send() {
    try {
                                                //Registrar nuestro service-worker
    const register = await navigator.serviceWorker.register('/scripts/service-worker.js', { scope: '/scripts/' });

                                                //Obteniendo permiso
    await Notification.requestPermission().then( (resultado) => console.log( 'Comprobando permiso (Default, Granted, Denied):', resultado ) );

                                                //Registrar Push
   const suscripcion = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKey 
    });
                                                //Enviar la notificación Push
    await fetch('/musicalibre/subscription', {
        method: 'POST',
        body: JSON.stringify(suscripcion),
        headers: {
            "Content-Type": "application/json"
                }
    });    
    } catch (error) {
        console.error('Exception. Manejo de error:', error)
    }
};
}
