
module.exports = {
    NODE_ENV: 'Default',

    server: {
        port: 2000,
        domain: 'localhost'
    },

    login: {
        email: 'correo@gmail.com',
        password: '123'
    },
    
    vapidKeys: {
        publicKey: 'BIACrE9EQBxI8WDhyokEy3AdKFTpMNJ2AxMZe4lwjAHAbLdHzqWrqMtKHJ9iSW7gqN8LuRGaAi9pI27xDamm7Pk',
        privateKey: '3qcfUp2jCNZ1x_5Zc0UCb0oX8FVOOP5osDFdpDvpaOg'
    },

    mongodb: {
        port: 27017,
        host: 'localhost'
    }
}