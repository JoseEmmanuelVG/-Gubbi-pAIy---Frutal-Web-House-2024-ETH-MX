
import React,{Fragment, useContext} from 'react';
import { Link } from "react-router-dom";
import logo                         from '../../assets/gubbIcon2.svg';
import gubbIcon2                    from '../../assets/logoGubbi1.svg';
import UserContext                  from '../../context/user-context'

import './headbar.css'

const Headernavbar = () => {

   const userGubbi =  useContext(UserContext);

   return (
    <Fragment>  
       <div className="navbar" role="navigation" aria-label="">
         <div className="">
            <a className="navbar-item" href="https://ow.academy/house/" target="_blank">
                <img src={logo} alt='Logo Gubbi' title='Logo Gubbi'></img>
            </a>
         </div>
         <div id="" className="">
            <div className="">
               <div className="navbar">
                     <a className=""> 
                        <img src={gubbIcon2} alt='App Function 1'></img> Gubbi App
                     </a>
                     <div className="menu" >
                         <br></br>
                        <Link to='/usuario/signin' className="navbar-item">
                          Login
                        </Link>
                        <Link to='/usuario/signup' className="navbar-item">
                         Registrarse
                        </Link>
                        <Link to='/usuario/signout' className="navbar-item">
                           Logout
                        </Link>
                        <Link to='/pagos/transferencia' className="navbar-item">
                           Transferir
                        </Link>
                     </div>
                     <div className="usertitle">
                        {userGubbi.username ? <p>Usuario: {userGubbi.username} </p> : <p>No hay usuario firmado</p>}
                     </div>
               </div>
            </div>

        </div>
       </div>
       
    </Fragment>
 )}

 
export default Headernavbar;        