import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanCode, getCode, getUser, signup } from '../auths/authSlice';
import { changeStatus } from '../tickets/ticketSlice';
import { useNavigate } from 'react-router-dom';

const EmailConfirm = () => {
  const [isCode, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);

  const onCodeChange = e => {
    setCode(e.target.value);
    setCodeError(false);
  };

  const code = useSelector(getCode);
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  function onSignup() {
    if (isCode === String(code)) {
      dispatch(
        signup({
          firstName: String(user.firstName),
          lastName: String(user.lastName),
          fullname: String(user.fullname),
          username: String(user.username),
          password: String(user.password),
        })
      );
      dispatch(changeStatus('idle'));
      navigate('/');
    } else {
      setCodeError(true);
    }
  }

  const onNavigateBack = () => {
    dispatch(cleanCode())
    navigate(-1);
  };

  return (
    <div className="card col-6 mx-auto mt-5 p-4 text-center mb-5">
      <button
        type="button"
        onClick={onNavigateBack}
        className="btn-close position-absolute top-0 end-0 m-2"
        aria-label="Close"
      ></button>
      <p className='mt-1 mb-1' style={{ fontSize: '1.5rem' }}>Welcome to Burmese Bus</p>
      <div className="border" />
      <p className="mt-2 text-start">
        We have just sent a confirmation code to <strong>your@email.com</strong>. Please enter the code below to verify your account.
      </p>
      <div className="mb-3">
        <input
          type="text"
          required="required"
          onChange={onCodeChange}
          value={isCode}
          className="form-control"
          placeholder="Enter verification code"
        />
      </div>

      {codeError && <p className="text-danger">Code does not match. Please try again.</p>}

      <button
        style={{ width: '100%' }}
        onClick={onSignup}
        disabled={!isCode}
        className="btn btn-success"
      >
        Verify
      </button>
    </div>
  );
};

export default EmailConfirm;
