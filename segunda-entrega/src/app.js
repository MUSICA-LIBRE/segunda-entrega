//Requerir módulos
const express = require('express'),
      path = require('path'),
      cookieParser = require('cookie-parser'),
      session = require('express-session'),
      flash = require('connect-flash'),
      config = require('config'),
      chalk = require('chalk');

//Usar variable de entorno para port
const port = config.get('server.port');

//Crear nuestra app express
const app = express();

//Configurar cookieParser
app.use( cookieParser('mi secreto más profundo') );

//Configurar session
app.use( session({
    secret: 'mi secreto más profundo',
    resave: true, 
    saveUninitialized: true
    }) );

//Requerir archivos de config de passport
require('./passport/index')(app);

//Definimos el view engine
app.set('view engine', 'ejs');
app.set( 'views', path.join(__dirname, 'views') );

//Iniciando middleware flash
app.use( flash() );

//Middleware express.static
app.use( express.static(path.join(__dirname, 'public')) );

//Parse application/json
app.use( express.json() );
//Parse application/x-www-form-urlencoded 
app.use( express.urlencoded( {extended: true} ) );

//Requerir middleware de express.Router()
const mLibreRoutes = require('./routers/index');

app.use('/musicalibre/', mLibreRoutes);

//Gestionar mis errores en las rutas (middleware global)
app.use( (req, res, next) => {
    res.status(404);
    res.setHeader('Content-Type', 'text/html'); 
    res.render('error', {
                        mensaje: 'Oops! Ocurrió un error en la ruta',
                        estatus: '404',
                        imagen: '/images/undraw_page_not_found_su7k.svg',
                        alternativo: 'Error 404. página no encontrada',
                        regresar: '/musicalibre/inicio',
                        mensajeRegresar: 'Regresar a Inicio'
                    });
});

//Servidor escuchando
app.listen( port, () => console.log(`El servidor se levantó como NODE_ENV ${chalk.bold.blue(config.NODE_ENV)} por el puerto ${chalk.bold.blue(port)}`) );