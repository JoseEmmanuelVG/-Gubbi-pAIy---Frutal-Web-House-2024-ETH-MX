const { ethers } = require("ethers");

// Conectarse a la red de Core TestNet
const provider = new ethers.JsonRpcProvider("https://rpc.test.btcs.network"); // URL de TestNet

// Clave pública generada
const publicAddress = "0x34d2C21B1f35831bB36Cdd99b806020680aEe655";

// Consultar saldo de la cuenta en la TestNet
provider.getBalance(publicAddress).then(balance => {
    console.log(`Saldo de la cuenta: ${ethers.formatEther(balance)} tCORE`);
}).catch(error => {
    console.error("Error al consultar el saldo:", error);
});




///// FAUCET PARA MANDAR https://scan.test.btcs.network/faucet
///// RECIBO DE ENVIO (Puede ser una pestaña de la aplicación de datos de la cartera): https://scan.test.btcs.network/tx/0xc6234ffe168c1e6d40a82fcc3e77d5095ea97cb372d44d17dae93c0f5c0c2b94