import React from 'react'
import Blog from '../Blogs/Blog'
import Category from '../Categories/Category'
import Blogs from '../Blogs/Blogs'

function HomePage() {
  return (
    <>
    <div className="" id='user-header'>
        <Category/>
        <Blogs/>
        {/* <Blog/> */}
    </div>
    </>
  )
}

export default HomePage
