const passport = require('passport'),
      bcrypt = require('bcryptjs');

const post = (mLibreRoutes) => {
//Crear variables
const mensajesContacto = [];
const usuariosRegistro = [];

                                        //POST contacto
mLibreRoutes.post('/contacto', (req, res) => {
    const {nombre, direccion, correo, mensaje} = req.body;
    const nuevoContacto = {
            nombre,
            direccion,
            correo,
            mensaje
        };

        //Validar que el mensaje no esté vacío
        if(nuevoContacto.mensaje) {
            mensajesContacto.push(nuevoContacto);
            console.log("Información de nuevo contacto:", nuevoContacto);
            res.redirect('/musicalibre/inicio')
        }
        else {
            res.status(400);
            res.setHeader('Content-Type', 'text/html');
            res.render('error', {
                mensaje: 'Oops! Debe dejar un comentario',
                estatus: '400',
                imagen: '../images/undraw_font_kwpk.svg',
                alternativo: 'Rastro de letras a',
                regresar: '/musicalibre/contacto',
                mensajeRegresar: 'Regresar a Contacto'
            });
        }
});
                                            //POST /signup
mLibreRoutes.post('/signup', (req, res) => {
    const {nombre, correo, clave1, clave2} = req.body;
    const nuevoUsuario = {
            nombre,
            correo,
            clave1,
            clave2
        };
        //Validar que las claves coincidan
        if(nuevoUsuario.clave1 === nuevoUsuario.clave2) {
            bcrypt.genSalt(10).then( salt => { bcrypt.hash( clave1, salt)
                              .then( hash => { nuevoUsuario.clave1 = nuevoUsuario.clave2 = hash;
                    usuariosRegistro.push(nuevoUsuario);
                    console.log('Información de usuario registrado', nuevoUsuario);
                    res.redirect('/musicalibre/inicio')
            });
            }).catch( err => next(err) );
        }
        else {
            res.status(400);
            res.setHeader('Content-Type', 'text/html');
            res.render('error', {
                mensaje: 'Oops! Las claves tienen que ser iguales',
                estatus: '400',
                imagen: '../images/undraw_Access_account_re_8spm.svg',
                alternativo: 'Celular mostrando claves iguales',
                regresar: '/musicalibre/entrar',
                mensajeRegresar: 'Regresar a Entrar'
            });
        };
});
                                            //POST /login
//Recibir credenciales e iniciar sesión
//Usamos una middleware de passport que se llama .authenticate
mLibreRoutes.post('/login', passport.authenticate ('local', {
        successFlash: true,
        successRedirect: '/musicalibre/entrar',
        failureFlash: true,
        failureRedirect: '/musicalibre/entrar'
    })
);
}

module.exports = post