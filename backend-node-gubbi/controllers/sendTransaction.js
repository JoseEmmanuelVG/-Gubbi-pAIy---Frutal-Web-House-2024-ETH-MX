const { ethers } = require("ethers");

// Clave privada del remitente (no la compartas públicamente)
const privateKey = "0x23a3dd25be93907c84524cd8102809894d41652e9751cd25e689110c11c0751f";

// Conectarse a la red de Core (Mainnet)
const provider = new ethers.JsonRpcProvider("https://rpc.coredao.org");

// Crear la billetera usando la clave privada
const wallet = new ethers.Wallet(privateKey, provider);

// Dirección de destino
const recipientAddress = "0xRecipientPublicAddress"; // Reemplaza con la dirección del destinatario

// Cantidad a enviar (en CORE)
const amountToSend = ethers.parseEther("0.1"); // Esto es 0.1 CORE

async function sendTransaction() {
    try {
        // Crear y enviar la transacción
        const tx = await wallet.sendTransaction({
            to: recipientAddress,
            value: amountToSend
        });

        console.log("Transacción enviada. Hash:", tx.hash);

        // Esperar la confirmación de la transacción
        const receipt = await tx.wait();
        console.log("Transacción confirmada en el bloque:", receipt.blockNumber);
    } catch (error) {
        console.error("Error al enviar la transacción:", error);
    }
}

sendTransaction();
