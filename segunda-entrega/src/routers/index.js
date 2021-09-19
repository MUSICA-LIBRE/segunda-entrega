//Requerimos express, solo Router usando destructuring
const { Router } = require('express');

    //Usar Middleware
    const mLibreRoutes = Router();

    //Rutas GET    
    require('./get')(mLibreRoutes);
    
    //Rutas POST    
    require('./post')(mLibreRoutes);

    //Ruta descargar   
    require('./download')(mLibreRoutes);

    //Ruta de suscripción y notificación
    require('./webPushRoutes')(mLibreRoutes);


module.exports = mLibreRoutes