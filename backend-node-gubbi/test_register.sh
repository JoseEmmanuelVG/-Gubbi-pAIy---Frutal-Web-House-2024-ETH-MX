#!/bin/bash

# URL del servidor
URL="https://stunning-space-robot-pqwgvr5g4x7h7rpq-4000.app.github.dev/usuario/signup"

# Datos del usuario que quieres registrar
DATA='{
  "username": "testuser",
  "password": "testpassword",
  "publickey": "public_key_value",
  "privatekey": "private_key_value",
  "cellnumber": "1234567890"
}'

# Ejecutar cURL para hacer la solicitud POST y mostrar la respuesta
curl -X POST $URL \
  -H "Content-Type: application/json" \
  -d "$DATA" \
  -v # El flag -v muestra detalles de la respuesta del servidor

# Mensaje de finalización
echo ""
echo "Solicitud POST enviada a $URL"
