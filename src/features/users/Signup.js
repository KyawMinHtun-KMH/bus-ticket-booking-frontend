import React, { useState } from 'react'
import classes from './Signup.module.css'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import Card from '../../components/ui/Card'
import { useDispatch } from 'react-redux'
import { signup } from '../auths/authSlice'

const Signup = () => {
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [fullname,setFullname] = useState('')
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [requestStatus,setRequestStatus] = useState('idle')

  const onFirstNameChange = e => setFirstName(e.target.value)
  const onLastNameChange = e => setLastName(e.target.value)
  const onFullnameChange = e => setFullname(e.target.value)
  const onUsernameChange = e => setUsername(e.target.value)
  const onPasswordChange = e => setPassword(e.target.value)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || "/"

  const canSignup = [firstName,lastName,fullname,username,password].every(Boolean) && requestStatus === 'idle'

  const onSubmit = (e) => {
    e.preventDefault()
    if (canSignup) {
      setRequestStatus('pending')
      dispatch(signup({
        firstName,
        lastName,
        fullname,
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
          <label htmlFor="firstName">Firstname</label>
          <input type="text" id="firstName" required onChange={onFirstNameChange} value={firstName} />
        </div>
        <div className={classes.control}>
          <label htmlFor="lastName">Lastname</label>
          <input type="text" id="lastName" required onChange={onLastNameChange} value={lastName} />
        </div>
        <div className={classes.control}>
          <label htmlFor="fullname">Fullname</label>
          <input type="text" id="fullname" required onChange={onFullnameChange} value={fullname} />
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required onChange={onUsernameChange} value={username} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required onChange={onPasswordChange} value={password} />
        </div>
        <div className={classes.actions}>
          <button onClick={onSubmit} disabled={!canSignup}>Signup</button>
        </div>
      </form>
      <Link to='/user/login'>Already have an account?login here</Link>
    </Card>
  )
}

export default Signup