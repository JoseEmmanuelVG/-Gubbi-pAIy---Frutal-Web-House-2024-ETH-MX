const { ethers } = require("ethers");

// Clave privada y pública de la cuenta de origen
const privateKeyOrigen = "0x23a3dd25be93907c84524cd8102809894d41652e9751cd25e689110c11c0751f"; // Clave privada de JEVG2
const publicKeyDestino = "0x531218De058291832325Ca1c12999411b583C5dd"; // Clave pública de JEVG456

// Conexión a la red de Core TestNet
const provider = new ethers.JsonRpcProvider("https://rpc.test.btcs.network");

// Crear la wallet con la clave privada de origen
const wallet = new ethers.Wallet(privateKeyOrigen, provider);

// Función para realizar la transferencia
async function transferirTokens() {
  try {
    // Consultar el saldo inicial de la cuenta de origen
    const saldoInicial = await provider.getBalance(wallet.address);
    console.log(`Saldo inicial de la cuenta de origen: ${ethers.formatEther(saldoInicial)} tCORE`);

    // Parámetros de la transacción
    const tx = {
      to: publicKeyDestino, // Cuenta de destino
      value: ethers.parseEther("0.1"), // Cantidad de tokens a enviar (0.5 tCORE)
      gasLimit: 21000, // Límite de gas estándar para una transacción
      gasPrice: ethers.parseUnits('50', 'gwei') // Precio del gas manualmente establecido a 50 gwei
    };

    // Mostrar los datos de gas
    console.log(`Gas Price manual: ${tx.gasPrice} wei`);

    // Firmar y enviar la transacción
    const txResponse = await wallet.sendTransaction(tx);
    console.log("Transacción enviada:", txResponse.hash);

    // Esperar a que la transacción sea confirmada
    const receipt = await txResponse.wait();
    console.log("Transacción confirmada en el bloque:", receipt.blockNumber);

    // Consultar el saldo final de la cuenta de origen
    const saldoFinal = await provider.getBalance(wallet.address);
    console.log(`Saldo final de la cuenta de origen: ${ethers.formatEther(saldoFinal)} tCORE`);
    
    return receipt; // Retornar el recibo de la transacción
  } catch (error) {
    console.error("Error al realizar la transferencia:", error);
  }
}

// Llamada a la función para transferir tokens
transferirTokens();



/////JEVG2 
/////pass: 1234 

/////JEVG456
/////pass: 456