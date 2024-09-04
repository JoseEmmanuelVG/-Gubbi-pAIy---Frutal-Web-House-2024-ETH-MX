import React, {useState, useContext }   from 'react';
import { UNSAFE_DataRouterStateContext, useNavigate }                  from 'react-router-dom';
import UserContext                      from '../../context/user-context';
//import useHookForm                      from '../../hooks/useHooksForm'
import enviarRequest                    from '../../lib/webaccess';
import BtnEnviar                        from '../ui/botonEnvio';

const serverIp =  process.env.REACT_APP_SERVER_ADDRESS

const Transferir = (props) => {
    //const { values, handleChange, handleSubmit } = useHookForm(sendSignInData);
    const [waiting, setWaiting]                   = useState(false);
    const [respServer, setRespServer] = useState() 
    
    const navigate = useNavigate();
    const gubbiUser = useContext(UserContext);

    const handleTransferir = async () => {
        setWaiting(true);
        const username = gubbiUser.username;
        const token = gubbiUser.token;
        const password = gubbiUser.password; // Asegúrate de tener esta variable
        // Solo para ejemplo, estos  valores hay que pedirselos al usuario
        const source = '0x4554111111111';   // cta orgen debe hacer match  con el que este username tiene asociado
        const dest = '0xb439900341c9ea0000000'; // cta dest
        const cant = '1000000000';  // cantidad de tokens

        // Codifica los parámetros de la solicitud
        const params = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&source=${encodeURIComponent(source)}&dest=${encodeURIComponent(dest)}&cant=${encodeURIComponent(cant)}`;

        const request= {
            method: 'POST',            
            mode: 'cors',
            body: params,
            cache: 'default',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${gubbiUser.token}`  //  token JWT de la sesion
            }
        };
        const url= serverIp + '/pagos/transferencia';        
        try {
            const response = await enviarRequest(url,request);
            console.log('respuesta server: ',response);
            setRespServer(response)

            } catch (err){
                console.log('Error:',err);
                alert(`Error: ${err.message}`);
                
            } finally {
                setWaiting(false);
            }
        }

    return (
        <div>
            <h1>
                Transferir Tokens
            </h1>
            <button onClick = {handleTransferir} >Simula transferencia</button>
            <br></br>
            <div>
            {respServer && respServer.username ? (
                    <div>
                    <p><strong>Usuario:</strong> {respServer.username}</p>
                    <p><strong>Mensaje:</strong> {respServer.message}</p>
                    <p><strong>Origen (source):</strong> {respServer.source}</p>
                    <p><strong>Destino (dest):</strong> {respServer.dest}</p>
                    <p><strong>Estado:</strong> {respServer.status}</p>
                    </div>
                ) : (
                    <p></p>
             )}
             </div>
        </div>
    )
    
    }
    export default Transferir;