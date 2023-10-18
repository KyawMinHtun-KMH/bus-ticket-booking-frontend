import React from 'react'
import { Outlet } from 'react-router-dom'

const NewUser = () => {
  return (
    <section>
        <h1>New User Login Form</h1>
        <Outlet />
    </section>
  )
}

export default NewUser