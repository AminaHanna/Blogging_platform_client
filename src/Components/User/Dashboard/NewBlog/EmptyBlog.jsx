import React from 'react'
import { Link } from 'react-router-dom'

function EmptyBlog() {
  return (
    <>
    <div className="text-center p-10">
        <p className='text-xs sm:text-xl font-bold'>Oops! Your Blogs is Empty!</p>
        <p className='text-xs sm:text-base'>There is nothing in your Page.Let's add some blogs.</p>
        <Link to={'/user/blogs/add-blog'}>
          <button className='bg-slate-800 text-white py-1 px-5 rounded mt-3 text-xs sm:text-base'>Add Now</button>
        </Link>
      </div>
    </>
  )
}

export default EmptyBlog
