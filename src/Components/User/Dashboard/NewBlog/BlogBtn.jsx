import React from 'react'
import { Link } from 'react-router-dom';

function BlogBtn() {
  return (
    <>
    <Link to={"blogs/add-blog"}>
    <div className="grid text-white bg-slate-800 hover:bg-slate-200 hover:text-slate-800 rounded-full py-4 px-5 m-5">
        <p className='sm:text-2xl text-xl'><i class="fa-solid fa-plus"></i></p>
    </div>
    </Link>
    </>
  )
}

export default BlogBtn;