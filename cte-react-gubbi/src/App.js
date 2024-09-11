//// app.js /////

import './index.css';
import React from 'react';
import Headernavbar from './components/layout/headbar';
import SignInPage from './components/users/signin';
import SignOutPage from './components/users/signout';
import SignUpPage from './components/users/signup';
import Transferir from './components/pagos/transferencia';
import { Route, Routes } from 'react-router-dom'; // No necesitas importar Router aquí
import { UserContextProvider } from './context/user-context'; // Asegúrate de importar correctamente

function App() {
  return (
    // Asegúrate de que UserContextProvider esté envolviendo la aplicación
    <UserContextProvider>
      <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
        <Headernavbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/usuario/signin" element={<SignInPage />} />
            <Route path="/usuario/signout" element={<SignOutPage />} />
            <Route path="/usuario/signup" element={<SignUpPage />} />
            <Route path="/pagos/transferencia" element={<Transferir />} />
          </Routes>
        </main>
      </div>
    </UserContextProvider>
  );
}

export default App;
