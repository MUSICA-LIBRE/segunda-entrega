const path = require('path'),
      chalk = require('chalk'),
      http = require('http');

const download = (mLibreRoutes) => {
    mLibreRoutes.get('/download/:id', (req, res, next) => {
        if(req.isAuthenticated()) return next();
        //Si es false redireccioname al login y envía mensaje
        req.flash('libreria', 'Para descargar, antes hay que hacer LOGIN');
        res.redirect('/musicalibre/entrar')
            }, (req, res) => {
            //Contador con operadores ternarios
            req.session.descargas = req.session.descargas ? ++req.session.descargas : 1 ;
            console.log("Número de descargas del usuario:", req.session.descargas);
            //Al método .download le pasamos la dirección, el nombre del archivo, y una función para manejar el error
            res.download(path.join(__dirname,'../public','music', req.params.id), req.params.id, (err) => {
                if(err) {
                    console.error( 'Error de descarga', err );
                    res.status(404);
                    res.setHeader('Content-Type', 'text/html');
                    res.render('error', {
                                        mensaje: 'Oops! Ocurrió un error en la descarga',
                                        estatus: '404',
                                        imagen: '/images/undraw_Download_re_li50.svg',
                                        alternativo: 'Error 404. pista no encontrada',
                                        regresar: '/musicalibre/libreria',
                                        mensajeRegresar: 'Regresar a Libreria'
                                    });}
                        else {
                                console.log( chalk.bold.green('Descarga realizada con éxito.') );

                                //Notificar de una nueva descarga en la Biblioteca de Música Libre
                                http.get('http://localhost:2000/musicalibre/descargaExitosa', {
                                    method: 'POST',
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                 });
                };
        });
    });
};

module.exports = download