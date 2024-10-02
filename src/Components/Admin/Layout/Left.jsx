import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function Left() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminData");
        navigate('/admin-signup');
    }
  return (
    <>
    <div className="">
        <NavLink to={''}>
            <button className='text-xs sm:text-base px-5 py-3 w-full text-start text-slate-900 hover:bg-slate-800 hover:text-white'>Home</button>
        </NavLink>
        <NavLink to={'profile'}>
            <button className='text-xs sm:text-base px-5 py-3 w-full text-start text-slate-900 hover:bg-slate-800 hover:text-white'>Profile</button>
        </NavLink>
        <NavLink to={'categories'}>
            <button className='text-xs sm:text-base px-5 py-3 w-full text-start text-slate-900 hover:bg-slate-800 hover:text-white'>Categories</button>
        </NavLink>
        <NavLink to={'tags'}>
            <button className='text-xs sm:text-base px-5 py-3 w-full text-start text-slate-900 hover:bg-slate-800 hover:text-white'>Tags</button>
        </NavLink>
        <NavLink to={'blogs'}>
            <button className='text-xs sm:text-base px-5 py-3 w-full text-start text-slate-900 hover:bg-slate-800 hover:text-white'>Blogs</button>
        </NavLink>
        <NavLink to={''}>
            <button className='text-xs sm:text-base px-5 py-3 w-full text-start text-slate-900 hover:bg-slate-800 hover:text-white'>Drafts</button>
        </NavLink>
        <NavLink to={'all-users'}>
            <button className='text-xs sm:text-base px-5 py-3 w-full text-start text-slate-900 hover:bg-slate-800 hover:text-white'>All Users</button>
        </NavLink>
       
        <NavLink onClick={logout}>
            <button className='text-xs sm:text-base px-5 py-3 w-full text-start text-slate-900 hover:bg-slate-800 hover:text-white'>Logout</button>
        </NavLink>
    </div>
    </>
  )
}

export default Left
