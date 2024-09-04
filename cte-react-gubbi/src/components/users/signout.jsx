import React, {useState, useContext }   from 'react';
import { useNavigate }                  from 'react-router-dom';
import UserContext                      from '../../context/user-context';

const SignOutPage = (props) => {

    const navigate = useNavigate();
    const gubbiUser = useContext(UserContext);

    const handleLogout = () => {
        gubbiUser.logout()
        navigate('/')
    }

    return (
        <div>
        <h1>SignoutPage</h1>   
        <button onClick={handleLogout} > Desfirmarse </button>
        </div>
    )


}
export default SignOutPage;