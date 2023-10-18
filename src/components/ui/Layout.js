import React from 'react'
import MainNavigation from '../layout/MainNavigation'
import { Outlet } from 'react-router-dom'
import Footer from '../pages/Footer'

const Layout = () => {
  return (
    <>
        <MainNavigation />
        <Outlet />
        <Footer />
    </>
  )
}

export default Layout