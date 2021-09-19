/*
Creamos ruta POST para recibir las notificaciones push y vamos a definir una ruta POST para mostrar luego de una descarga y para enviar 
notificaciones Web Push a todas las subscripiciones que tenemos en la base de datos (futuro) avisando de nuevo tema.
*/
const webPush = require('./webPush');

const webPushRoutes = (mLibreRoutes) => {
    let pushSuscripcion; //Para guardar los datos de req.body

                                        //Crear una ruta post para suscribir al usuario
mLibreRoutes.post('/subscription', async (req, res) => {
    pushSuscripcion = req.body; //Datos recibidos del navegador del usuario
    res.status(200);
    res.json();
});
                                        //Crear rutas POST para mensajes

mLibreRoutes.post('/descargaExitosa', async (req, res) => {
    //Mi mensaje descargaExitosa
    const payload = JSON.stringify({
        title: 'Notificaciones de Música Libre',
        message: 'Descarga Excitosa',
        action1: [ {
            action: 'https://cos.tv/channel/22750516301441024',
            title: 'Visítenos en COS TV',
            icon: '../images/enlace-externo.png'
          } ]
    });
    try {
        res.status(200);
        await webPush.sendNotification(pushSuscripcion, payload);
    } catch (error) {
        console.error('Error al notificar descarga exitosa', error);
    };
});

mLibreRoutes.post('/nuevoTrack', async (req, res) => {
    //Mi mensaje nuevoTrack
    const payload = JSON.stringify({
        title: 'Notificaciones de Música Libre',
        message: 'Nuevo tema subido',
        action1: [ {
            action: 'http://localhost:2000/musicalibre/inicio',
            title: 'Visítenos',
            icon: '../images/enlace-externo.png'
          } ]
    });
    try {
        res.status(200);
        await webPush.sendNotification(pushSuscripcion, payload);
    } catch (error) {
        console.error(error, 'Error al notificar nuevo track');
    };
});

}
module.exports = webPushRoutes