import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Categories() {
  return (
    <>
    <div className="flex gap-5 m-3 mt-5 border-b-2 justify-center border-slate-800">
        <Link to={'/admin/categories/add-category'}><button className='border border-slate-800 px-3 py-1 my-2 hover:bg-slate-800 hover:text-white text-xs sm:text-base'>Add</button></Link>
        <Link to={'/admin/categories'}><button  className='border border-slate-800 px-3 py-1 my-2 hover:bg-slate-800 hover:text-white text-xs sm:text-base'>View</button></Link>
    </div>
    <Outlet/>
    </>
  )
}

export default Categories
