
import './App.css';
import React, { useContext, useState } from 'react';
import UserContext                     from './context/user-context'
import Headernavbar                    from './components/layout/headbar'
import SignInPage                     from './components/users/signin'
import SignOutPage                    from './components/users/signout'
import SignUpPage                     from './components/users/signup'
import Transferir                     from './components/pagos/transferencia'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const user = useContext(UserContext);
  const[currentUser,setCurrentUser]=useState('');  // variables de estado para provocar rendering en childs cuando update

  user.login = (usuario) => {
    user.username=usuario.username;
    user.token=usuario.token;
    user.publickey=usuario.publickey;
    user.cellnumber=usuario.cellnumber;
    setCurrentUser(usuario.username);
    console.log('Ahora el usuario registrado en la app tiene estos datos:' , usuario)
}

user.logout = () => {
  user.username=null;
  user.token=null;
  user.publickey=null;
  user.cellnumber=null;
  setCurrentUser('')
  console.log('Ahora no hay usuario registrado en la app:' , user)

}

  return (
    <UserContext.Provider value={user}>
      <div className="App">
        <Headernavbar/>
        <div className="">
                  <Routes>
                    <Route path="/usuario/signin" element={<SignInPage />}/>
                    <Route path="/usuario/signout" element={<SignOutPage />}/>
                    <Route path="/usuario/signup" element={<SignUpPage />}/>
                    <Route path="pagos/transferencia" element={<Transferir />}/>
                    
                  </Routes>
              </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
