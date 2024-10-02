import React from 'react'
import { Navigate } from 'react-router-dom'

function UserAuthorizedRoute({children}) {


    if(
        (Boolean(localStorage.getItem('userData')) && Boolean(localStorage.getItem('userToken')))
    ){
        return children
    }

  
    return <Navigate to="/user-signin" />;
    

}

export default UserAuthorizedRoute;