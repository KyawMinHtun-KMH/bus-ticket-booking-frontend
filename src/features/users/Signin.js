import classes from './Signin.module.css'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import Card from '../../components/ui/Card'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signin } from '../auths/authSlice'


const Signin = () => {

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [requestStatus,setRequestStatus] = useState('idle')

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
      <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required onChange={onUsernameChange} value={username} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required onChange={onPasswordChange} value={password} />
        </div>
        <div className={classes.actions}>
          <button onClick={onSubmit} disabled={!canLogin}>Login</button>
        </div>
      </form>
      <Link to='/user/register'>No have an account?register here</Link>
    </Card>
  )
}

export default Signin