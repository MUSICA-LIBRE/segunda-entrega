//Configurar general de passport
const passport = require('passport');

const passportConfig = (app) => {
    
    app.use( passport.initialize() );
    app.use( passport.session() );

    //Serialización para guardar por ejemplo solo la id
    passport.serializeUser( (user, done) => {
        done(null, user._id); 
        console.log("Datos de usuario logeado:", user);
    } );
    //Desserialización para con esa id poder retomar todos los datos del objeto nuevamente
    passport.deserializeUser( (_id, done) => {
        done(null, { _id: 1, name: 'Yury', rol: 'usuario' });
    } );

    //Requiero configuración estrategia-local
    require('./local')(app);
}

module.exports = passportConfig

