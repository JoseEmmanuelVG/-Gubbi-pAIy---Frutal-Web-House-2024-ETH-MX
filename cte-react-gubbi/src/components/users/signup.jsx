
import React, {useState }               from 'react';
import { useNavigate }                  from 'react-router-dom';
import useHookForm                      from '../../hooks/useHooksForm'
import enviarRequest                    from '../../lib/webaccess';
import BtnEnviar                        from '../ui/botonEnvio';



// Ṕromesa que se resuelve cuando la variable mostrarAlerta del objeto alerta (semaforo aqui) se apaga
// Se usa para dar tiempo a que se despliegue mensaje informativo (alerta de Ofertika) a usuario que se han creado par de
// llaves y que se solicitará que salve archivo de llaves

const serverIp =  process.env.REACT_APP_SERVER_ADDRESS

const SignoUpPage = (props) => {
    const { values, handleChange, handleSubmit } = useHookForm(sendSignupData);
    const [waiting, setWaiting]                    = useState(false);
    const navigate = useNavigate();
    

    async  function sendSignupData  (event) { 
    setWaiting(true);
    const username= values.username;
    const password = values.password;
    const cpassw = values.cpassw;
    const cellnumber = values.cellnumber;

    if (password !== cpassw)  {
        alert('Contraseñas no coinciden, verificar');
        setWaiting(false);
        return
    }

    const params = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&cellnumber=${encodeURIComponent(cellnumber)}`;

      const request= {
           method: 'POST',            
           body: params,
           headers:  { 'Content-type': 'application/x-www-form-urlencoded' }
       }
      const url=serverIp + '/usuario/signup';
       console.log('enviando datos de usuario', url)
      try {
        const datos= await enviarRequest(url,request);
        alert(`Usuario ${username} creado exitosamente en Gubbi`);
        navigate("/usuario/signin")
       } catch (err) {
           console.log('En forma, el Error es:',err);
        }   finally {
           setWaiting(false);
           }
       }


    return (
        <div>
            <h1>SignoUpPage</h1>
         <div id = 'registrarusuario' ></div>   
         <div className="">
         <form  className="" onSubmit={handleSubmit}>
         <div  className="" >
              <h1>Registro de Usuario</h1>
          </div>                   
         <div  className="">
             <label htmlFor="username">Nombre Usuario</label>
             <input type="text"  id="username"  required onChange={handleChange} value={values.username || ''} />
         </div>                
         <div className="">
             <label htmlFor="cellnumber">Numero de Teléfono celular</label>
             <input type="text"  id="cellnumber"  onChange={handleChange} value={values.cellnumber || ''} />
         </div>          
         <div className="">
             <label htmlFor="password">Contraseña</label>
             <input type="password"  id="password" required onChange={handleChange} value={values.password || ''} />
         </div>
         <div className="">
             <label htmlFor="cpassw">Confirmar contraseña</label>
             <input type="password"  id="cpassw" required onChange={handleChange} value={values.cpassw || ''} />
         </div>          
         <div className="form-actions">
             <BtnEnviar label={"Registrarse"} waitflag={waiting}/>
         </div>                         
        </form>
        </div>
            
        </div>
    )


}
export default SignoUpPage;