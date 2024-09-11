import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/user-context';
import enviarRequest from '../../lib/webaccess';
import CalendarBackGround from '../../assets/CalendarBackGround.mp4'; // Importa el video
import VoiceAssistant from '../ui/VoiceAssistant'; // Asistente de voz

const serverIp = process.env.REACT_APP_SERVER_ADDRESS;

const Transferir = (props) => {
  const [waiting, setWaiting] = useState(false);
  const [respServer, setRespServer] = useState(null);
  const [formData, setFormData] = useState({
    source: '',
    dest: '',
    cant: '',
  });

  const navigate = useNavigate();
  const gubbiUser = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleTransferir = async (e) => {
    e.preventDefault();
    setWaiting(true);
    const username = gubbiUser.username;
    const token = gubbiUser.token;
    const password = gubbiUser.password;

    const { source, dest, cant } = formData;

    if (!source || !dest || !cant) {
      alert('Por favor, completa todos los campos.');
      setWaiting(false);
      return;
    }

    const params = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&source=${encodeURIComponent(source)}&dest=${encodeURIComponent(dest)}&cant=${encodeURIComponent(cant)}`;

    const request = {
      method: 'POST',
      mode: 'cors',
      body: params,
      cache: 'default',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${gubbiUser.token}`,
      },
    };
    const url = `${serverIp}/pagos/transferencia`;
    try {
      const response = await enviarRequest(url, request);
      console.log('Respuesta del servidor: ', response);
      setRespServer(response);
    } catch (err) {
      console.log('Error:', err);
      alert(`Error: ${err.message}`);
    } finally {
      setWaiting(false);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Video de fondo */}
      <video className="absolute top-0 left-0 w-full h-full object-cover z-0" autoPlay loop muted playsInline>
        <source src={CalendarBackGround} type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>

      {/* Capa de opacidad */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>

      {/* Contenido principal */}
      <div className="relative z-20 w-full max-w-md p-8 bg-white bg-opacity-60 backdrop-blur-sm rounded-lg shadow-lg border border-gray-50">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">Transferir Tokens</h1>
        {/* Asistente de voz */}
        <div className="flex justify-center mb-4">
          <VoiceAssistant onVoiceInput={() => alert('Asistente de voz activado')} />
        </div>
        <form onSubmit={handleTransferir} className="space-y-4">
          <div>
            <label htmlFor="source" className="block text-sm font-medium text-gray-700">
              Cuenta Origen
            </label>
            <input
              type="text"
              id="source"
              required
              onChange={handleChange}
              value={formData.source}
              className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:ring-4 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ease-in-out"
              placeholder="Ingresa tu cuenta de origen"
            />
          </div>

          <div>
            <label htmlFor="dest" className="block text-sm font-medium text-gray-700">
              Cuenta Destino
            </label>
            <input
              type="text"
              id="dest"
              required
              onChange={handleChange}
              value={formData.dest}
              className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:ring-4 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ease-in-out"
              placeholder="Ingresa la cuenta de destino"
            />
          </div>

          <div>
            <label htmlFor="cant" className="block text-sm font-medium text-gray-700">
              Cantidad de Tokens
            </label>
            <input
              type="number"
              id="cant"
              required
              onChange={handleChange}
              value={formData.cant}
              className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:ring-4 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ease-in-out"
              placeholder="Ingresa la cantidad a transferir"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={waiting}
              className="bg-green-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              {waiting ? 'Procesando...' : 'Transferir'}
            </button>
          </div>
        </form>

        {/* Mostrar respuesta del servidor */}
        {respServer && (
          <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-md shadow-md">
            <p><strong>Usuario:</strong> {respServer.username}</p>
            <p><strong>Mensaje:</strong> {respServer.message}</p>
            <p><strong>Origen:</strong> {respServer.source}</p>
            <p><strong>Destino:</strong> {respServer.dest}</p>
            <p><strong>Estado:</strong> {respServer.status}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transferir;
