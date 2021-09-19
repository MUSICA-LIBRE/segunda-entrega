
module.exports = {
    NODE_ENV: 'Production',

    server: {
        port: 80,
        domain: 'xx'
    },

    vapidKeys: {
        publicKey: 'BIACrE9EQBxI8WDhyokEy3AdKFTpMNJ2AxMZe4lwjAHAbLdHzqWrqMtKHJ9iSW7gqN8LuRGaAi9pI27xDamm7Pk',
        privateKey: '3qcfUp2jCNZ1x_5Zc0UCb0oX8FVOOP5osDFdpDvpaOg'
    }
}
//Para windows 10 con terminal PowerShell
//$env:NODE_ENV="production"
//npm run start