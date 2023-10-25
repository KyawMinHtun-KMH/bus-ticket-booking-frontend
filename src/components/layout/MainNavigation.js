import React from 'react'
import classes from "./MainNavigation.module.css";
import image from './download.jpeg'
import { Link } from 'react-router-dom';
import {
  getLoginStatus,
  getRoles,
  getUser,
  logout
} from "../../features/auths/authSlice";
import { useDispatch, useSelector } from 'react-redux';

const MainNavigation = () => {
  const loginStatus = useSelector(getLoginStatus);
  const user = useSelector(getUser);
  const role = useSelector(getRoles)
  console.log(role);

  const dispatch = useDispatch()

  let navProfile = "";
  let navLogin = "";
  if (loginStatus) {
    navProfile = (
      <li className="nav-item">
        <Link className="nav-link text-white" to="/user/profile">{user.fullname}</Link>
      </li>
    );
    navLogin = <Link className="nav-link text-white" to="/user/logout" onClick={() => { dispatch(logout()) }}>Logout</Link>;
  } else {
    navLogin = <Link className="nav-link text-white" to="/user/login">Login</Link>;
  }

  let adminNav = "";

  if (Array.isArray(role) && role.includes("ROLE_ADMIN")) {
    adminNav = (
      <>
    <li className="nav-item">
    <Link to="/newTicket" className="nav-link text-white">CreateTicket</Link>
  </li>
  {/* <li className="nav-item">
    <Link className="nav-link text-white" to="/allTicket">Tickets</Link>
  </li> */}
  </>
  )
  }

  let userNav = "";
  if (Array.isArray(role) && role.includes("ROLE_USER")) {
    userNav = (
      <li className="nav-item">
      <Link className="nav-link text-white" to="/orders">Orders</Link>
    </li>
  )
  }

  return (
    <header className={classes.navheader}>
    <div className='container'>
    <nav className="navheader navbar navbar-expand-lg navbar-light">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/"><img  id={classes.logosize} src={image} alt='logo'/></Link>
      <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon bg-white"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul id={classes.listitem} className="text-danger navbar-nav ms-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link active text-white" aria-current="page">Home</Link>
          </li>  
          {adminNav}
          {navProfile}
          <li className="nav-item">{navLogin}</li>
          {userNav}
        </ul>

        
      </div>
    </div>
  </nav>
  </div>
  </header>
  )
}

export default MainNavigation