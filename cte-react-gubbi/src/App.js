//// app.js /////

import './index.css';
import React, { useContext } from 'react';
import UserContext from './context/user-context';
import Headernavbar from './components/layout/headbar';
import SignInPage from './components/users/signin';
import SignOutPage from './components/users/signout';
import SignUpPage from './components/users/signup';
import Transferir from './components/pagos/transferencia';
import { Route, Routes } from 'react-router-dom'; // Elimina Router si no lo usas

function App() {
  const user = useContext(UserContext);

  user.login = (usuario) => {
    user.username = usuario.username;
    user.token = usuario.token;
    user.publickey = usuario.publickey;
    user.cellnumber = usuario.cellnumber;
    console.log('Ahora el usuario registrado en la app tiene estos datos:', usuario);
  };

  user.logout = () => {
    user.username = null;
    user.token = null;
    user.publickey = null;
    user.cellnumber = null;
    console.log('Ahora no hay usuario registrado en la app:', user);
  };

  return (
    <UserContext.Provider value={user}>
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
    </UserContext.Provider>
  );
}

export default App;
