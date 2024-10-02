import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <>
    <div className="h-[100vh] w-[100%] m-auto">

        <div className="fixed w-full">
        <Header/>
        </div>

        <div className="pt-24">
        <Outlet/>
        </div>

        <Footer/>
    </div>
    </>
  )
}

export default MainLayout
