import React from 'react';
import { Link, Outlet } from "react-router-dom";

function UserBlogs() {
  return (
    <>
    <div className="flex gap-5 m-3 mt-5 border-b-2 justify-center border-slate-800">
        <Link to={'/user/blogs'}><button  className='border border-slate-800 px-3 py-1 my-2 hover:bg-slate-800 hover:text-white text-xs sm:text-base'>All</button></Link>
        <Link to={'/user/blogs/add-blog'}><button className='border border-slate-800 px-3 py-1 my-2 hover:bg-slate-800 hover:text-white text-xs sm:text-base'>Add</button></Link>
        <Link to={'/user/blogs/published'}><button  className='border border-slate-800 px-3 py-1 my-2 hover:bg-slate-800 hover:text-white text-xs sm:text-base'>Published</button></Link>
        <Link to={'/user/blogs/drafts'}><button  className='border border-slate-800 px-3 py-1 my-2 hover:bg-slate-800 hover:text-white text-xs sm:text-base'>Draft</button></Link>
    </div>
    <Outlet/>
    </>
  )
}

export default UserBlogs