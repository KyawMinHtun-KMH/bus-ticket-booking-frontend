import React from 'react'
import classes from "./MainNavigation.module.css";
import image from './download.jpeg'
import { Link } from 'react-router-dom';
const MainNavigation = () => {
  return (
    <header className={classes.navheader}>
    <div className='container'>
    <nav className="navheader navbar navbar-expand-lg navbar-light">
    <div className="container-fluid">
      <a className="navbar-brand" href="#"><img  id={classes.logosize} src={image} alt='logo'/></a>
      <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon bg-white"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul id={classes.listitem} className="text-danger navbar-nav ms-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link active text-white" aria-current="page">Home</Link>
          </li>  
          <li className="nav-item">
            <Link to="/newTicket" className="nav-link text-white">NewTicket</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/allTicket">AllTicket</Link>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">Bla</a>
          </li>
        </ul>

        {/* <ul className="navbar-nav ms-auto"> 
        <li className="nav-item">
            <a className="nav-link" href="#">Features</a>
          </li>
        </ul> */}
      </div>
    </div>
  </nav>
  </div>
  </header>
  )
}

export default MainNavigation