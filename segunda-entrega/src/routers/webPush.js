const webPush = require('web-push'),
      config = require('config');

//Generar las keys desde consola con el comando web-push generate-vapid-keys
//Está en la carpeta node_modules por eso quedaría
//npx web-push generate-vapid-keys
//Las guardo como variables de entorno


//Configurando web-push
webPush.setVapidDetails( 'mailto:musicasinderechoautoral@gmail.com', 
config.get('vapidKeys.publicKey'), 
config.get('vapidKeys.privateKey') );

module.exports = webPush;