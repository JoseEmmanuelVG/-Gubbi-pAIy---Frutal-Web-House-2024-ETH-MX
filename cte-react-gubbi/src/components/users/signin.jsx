
import React, {useState, useContext }   from 'react';
import { useNavigate }                  from 'react-router-dom';
import UserContext                      from '../../context/user-context';
import useHookForm                      from '../../hooks/useHooksForm'
import enviarRequest                    from '../../lib/webaccess';
import BtnEnviar                        from '../ui/botonEnvio';


const serverIp =  process.env.REACT_APP_SERVER_ADDRESS

const SignInPage = (props) => {
    const { values, handleChange, handleSubmit } = useHookForm(sendSignInData);
    const [waiting, setWaiting]                   = useState(false);
    
    const navigate = useNavigate();
    const gubbiUser = useContext(UserContext);

    async function sendSignInData(event)  {
        
        setWaiting(true);
        const username= values.username;
        const password = values.password;

        const params = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
        const request= {
            method: 'POST',            
            mode: 'cors',
            body: params,
            cache: 'default',
            headers:  { 'Content-type': 'application/x-www-form-urlencoded' }
        }
        const url= serverIp + '/usuario/signin';
        try {
        const datos= await enviarRequest(url,request);
        console.log('recibido en datos: ',datos);
        if (datos.token !==null) {
            gubbiUser.login(datos);
            navigate("/")
            } else {
                alert('Credenciales erróneas');
            }
        } catch (err){
            //console.log('En forma, el Error es:',err);
            alert('Credenciales erróneas');
            
        } finally {
            setWaiting(false);
        }
    }

    return (
        <div className="">
           <h1>LOGIN USUARIO</h1>
           <div className="form-center">
            <form className="form-assets" onSubmit={handleSubmit}>
                <div className="" >
                </div>                   
                <div className="">
                    <label htmlFor="username">Nombre Usuario</label>
                    <input type="text"  id="username" required onChange={handleChange} value={values.username || ''} />
                </div>                
                <div className="">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password"  id="password" required onChange={handleChange} value={values.password || ''} />
                </div>
                <div className="form-actions">
              <BtnEnviar label={"Ingresar"} waiting={waiting}/>
                </div>                        
            </form>
         </div>  
        </div>
    )

}
export default SignInPage;