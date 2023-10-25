import classes from './Signin.module.css'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import Card from '../../components/ui/Card'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signin } from '../auths/authSlice'




const Signin = () => {
  const [showPassword,setShowPassword] = useState(false)
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [requestStatus,setRequestStatus] = useState('idle')

  const onPasswordVisibilty = () => setShowPassword(!showPassword)
  const onUsernameChange = e => setUsername(e.target.value)
  const onPasswordChange = e => setPassword(e.target.value)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || "/"

  const canLogin = [username,password].every(Boolean) && requestStatus === 'idle'

  const onSubmit = (e) => {
    e.preventDefault()
    if (canLogin) {
      setRequestStatus('pending')
      dispatch(signin({
        username,
        password
      }))

      navigate(from,{replace : true})

    }
}

  return (
    <Card>
      {/* <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required onChange={onUsernameChange} value={username} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input type={showPassword?"text":"password"} class="form-control" id="password" aria-describedby="button-addon2" required onChange={onPasswordChange} value={password} />
          <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={onPasswordVisibilty}>{showPassword?'Hide':'Show'}</button>
        
        </div>
        <div className={classes.actions}>
          <button onClick={onSubmit} disabled={!canLogin}>Login</button>
        </div>
      </form> */}
      <div className="form-group">
      <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required onChange={onUsernameChange} value={username} />
        </div>
      <label>Password</label>
      <div className="input-group">
        <input
          type={showPassword ? 'text' : 'password'}
          className="form-control"
          value={password}
          onChange={onPasswordChange}
        />
        <div className="input-group-append">
          
        <button
            className="input-group-text" id={classes.eye}
            onClick={onPasswordVisibilty}
          >
            {showPassword ? (
              <p><i className="fa fa-eye-slash"></i></p>
              )
             :( 
             <p><i className="fa fa-eye"></i></p> 
              )
            }
          </button>
          
        </div>
      </div>
      <div className={classes.actions}>
          <button onClick={onSubmit} disabled={!canLogin}>Login</button>
        </div>
    </div>
      <Link to='/user/register'>No have an account?register here</Link>
    </Card>
  )
}

export default Signin