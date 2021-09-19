//Configuración Estrategia Local de Passport
const bcrypt = require('bcryptjs'),
      chalk = require('chalk'),
      config = require('config'),
      passport = require('passport'),
      passportStrat = require('passport-local').Strategy;

const localConfig = (app) => { passport.use( new passportStrat( {
        usernameField: 'email',
        passwordField: 'password'
            }, (email, password, done) => {
    //Como no tenemos base de datos, vamos a verificar el usuario con el que le daremos usando variables de entorno
    if( email === config.get('login.email') && password === config.get('login.password') ) {
        bcrypt.genSalt(10).then( salt => { bcrypt.hash( password, salt)
                          .then( hash => { password = hash
                                console.log(`Se logeo con email: ${ chalk.bold.blue(email) } y clave: ${ chalk.bold.blue(password) }`);
            });
        }).catch( err => next(err) );
        return done( null, { _id: 1, name: 'Yury', rol: 'usuario' }, {message: 'Autenticación EXITOSA!'} );
    }
        //Aunque no hubo ningún error tampoco se encontró ese usuario
        return done( null, false, {message: 'Usuario y/o Clave inválido. REINTENTE!'} );
    }));
}

module.exports = localConfig