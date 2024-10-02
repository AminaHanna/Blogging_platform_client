import React from 'react'
import { Navigate } from 'react-router-dom'

function AdminAuthorizedRoute({children}) {


    if(
        (Boolean(localStorage.getItem('adminData')) && Boolean(localStorage.getItem('adminToken')))
    ){
        return children
    }

  
    return <Navigate to="/admin-signin" />;
    

}

export default AdminAuthorizedRoute