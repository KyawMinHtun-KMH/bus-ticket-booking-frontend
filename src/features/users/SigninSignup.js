import React, { useState } from 'react';
import styles from './SigninSignup.module.css'; // Import your CSS module
import signinImage from './signin.jpg';
import signupImage from './signup.jpg'; // Import the signup image
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signin, signup } from '../auths/authSlice';

function SigninSignup() {
  const [isSignUpMode, setSignUpMode] = useState(false);

  const toggleMode = (mode) => {
    setSignUpMode(mode);
  };

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

  const onSignup = (e) => {
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
      setRequestStatus('idle')
    }
}

const canLogin = [username,password].every(Boolean) && requestStatus === 'idle'

  const onSignin = (e) => {
    e.preventDefault()
    if (canLogin) {
      setRequestStatus('pending')
      dispatch(signin({
        username,
        password
      }))

      navigate(from,{replace : true})
      setRequestStatus('idle')
    }
}

  return (
    <div className={styles.body}>
    <div className={`${styles.container1} ${isSignUpMode ? styles['sign-up-mode'] : ''}`}>
      <div className={styles['signin-signup1']}>
      <form
          className={`${styles['form1']} ${isSignUpMode ? styles.hidden : ''}`}
          action=""
        >
          <h2 className={styles.title}>Sign in</h2>
          <div className={styles['input-field']}>
            <i className={"fas fa-envelope " + styles.icon}/>
            <input type="email" placeholder="Email" required onChange={onUsernameChange} value={username} />
          </div>
          <div className={styles['input-field']}>
            <i className={"fas fa-lock " + styles.icon} />
            <input type="password" placeholder="Password" required onChange={onPasswordChange} value={password} />
          </div>
          <input type="submit" value="Login" className={styles.btn1} onClick={onSignin} disabled={!canLogin}/>
          <p className={styles['account-text']}>
            Don't have an account?{' '}
            <Link to="#" onClick={() => toggleMode(true)} id="sign-up-btn2">
              Sign up
            </Link>
          </p>
        </form>
        <form
          className={`${styles['form1']} ${isSignUpMode ? '' : styles.hidden}`}
          action=""
        >
          <h2 className={styles.title}>Sign up</h2>
          <div className={styles['input-field']}>
            <i className={"fas fa-user " + styles.icon}/>
            <input type="text" placeholder="Firstname" required onChange={onFirstNameChange} value={firstName}/>
          </div>
          <div className={styles['input-field']}>
            <i className={"fas fa-user " + styles.icon}/>
            <input type="text" placeholder="Lastname" required onChange={onLastNameChange} value={lastName} />
          </div>
          <div className={styles['input-field']}>
            <i className={"fas fa-user " + styles.icon}/>
            <input type="text" placeholder="Fullname" required onChange={onFullnameChange} value={fullname} />
          </div>
          <div className={styles['input-field']}>
            <i className={"fas fa-envelope " + styles.icon}/>
            <input type="email" placeholder="Email" required onChange={onUsernameChange} value={username} />
          </div>
          <div className={styles['input-field']}>
            <i className={"fas fa-lock " + styles.icon}/>
            <input type="password" placeholder="Password" required onChange={onPasswordChange} value={password} />
          </div>
          <input type="submit" value="Sign up" className={styles.btn1} onClick={onSignup} disabled={!canSignup}/>
          <p className={styles['account-text']}>
            Already have an account?{' '}
            <Link to="#" onClick={() => toggleMode(false)} id="sign-in-btn2">
              Sign in
            </Link>
          </p>
        </form>
      </div>
      <div className={styles['panels-container']}>
        <div className={`${styles.panel} ${styles['left-panel']} ${isSignUpMode ? styles['pointer-events-none'] : ''}`}>
          <div className={styles.content}>
            <h3 className={styles.h3}>Log In to Book Your Bus Tickets</h3>
            <p className={styles.p}>
              Already a member? Sign in to access your account and book your
              bus tickets quickly and easily.
            </p>
            <button className={styles.btn1} onClick={() => toggleMode(false)} id="sign-in-btn">
              Sign in
            </button>
          </div>
          <img src={signinImage} alt="" className={styles.image} />
        </div>
        <div className={`${styles.panel} ${styles['right-panel']} ${isSignUpMode ? '' : styles['pointer-events-none']}`}>
          <div className={styles.content}>
            <h3 className={styles.h3}>Get Started</h3>
            <p className={styles.p}>
              New to our bus ticket service? Sign up now and start planning your
              journey.
            </p>
            <button className={styles.btn1} onClick={() => toggleMode(true)} id="sign-up-btn">
              Sign up
            </button>
          </div>
          <img src={signupImage} alt="" className={styles.image} />
        </div>
      </div>
    </div>
    </div>
  );
}

export default SigninSignup;
