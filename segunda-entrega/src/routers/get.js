const get = (mLibreRoutes) => {
                                        //Dando ruta /inicio
mLibreRoutes.get('/inicio', (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'text/html');                            
    res.render('index');
});
                                        //Dando ruta /entrar
mLibreRoutes.get('/entrar', (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    const success_message = req.flash('success')[0];
    const error_message = req.flash('error')[0];
    const libreria = req.flash('libreria')[0];
    res.render('entrar', { success_message, error_message, libreria });
    //console.log('Comprobar LOGIN', req.user);
});
                                        //Dando ruta /contacto
mLibreRoutes.get('/contacto', (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.render('contacto');
});
                                        //Dando ruta /libreria
mLibreRoutes.get('/libreria', (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    //Contador con operadores ternarios
    req.session.visitas = req.session.visitas ? ++req.session.visitas : 1 ;
    console.log("Número de visitas del usuario a la librería:", req.session.visitas);
    res.render('libreria', {
                            eyeTiger: "download/eye-tiger.mp3" //Parámetro que pasamos
    });
});
                                        //Dando ruta /terminos
mLibreRoutes.get('/terminos', (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.render('terminos');
});
                                        //Dando ruta /privacidad
mLibreRoutes.get('/privacidad', (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.render('privacidad');
});
}
module.exports = get