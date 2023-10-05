import React from 'react'
import MainNavigation from '../layout/MainNavigation'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
        <MainNavigation />
        <Outlet />
    </>
  )
}

export default Layout