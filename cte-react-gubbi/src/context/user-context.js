import React from 'react';

export default React.createContext ({
        username        : null,
        token           : null,
        publickey       : null,
        cellnumber      : null,
        login           : ()=>{},
        logout          : ()=>{},
})