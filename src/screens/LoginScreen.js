import React, { useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../App';
import { LOGIN_URI, SIGNUP_URI } from '../utilities/endpoints';

import '../assets/styles/login_page.css';

const LoginScreen = () => {
  // Hooks
  // -- state
  // ---- global
  const { dispatch } = useContext(UserContext);

  // ---- local
  // ------ login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  // ------ signup form
  const [signupName, setSignupName] = useState('');
  const [signupSurname, setSignupSurname] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupErrorMessage, setSignupErrorMessage] = useState('');

  // -- refs
  const inputRef = useRef();
  const signupPasswordInputRef = useRef();
  const signupEmailInputRef = useRef();

  const loginErrorElemRef = useRef();
  const signupErrorElemRef = useRef();

  // -- redirects
  const history = useHistory();

  // Custom funtions

  const displayLoginErrorMessage = (message) => {
    const elem = loginErrorElemRef.current;
    elem.className = '';
    elem.classList.add('form-message-danger', 'form-message');
    setLoginErrorMessage(message);
  };

  const displaySignupErrorMessage = (message) => {
    const elem = signupErrorElemRef.current;
    elem.className = '';
    elem.classList.add('form-message-danger', 'form-message');
    setSignupErrorMessage(message);
  };

  const loginUser = (e) => {
    e.preventDefault();

    axios
      .post(LOGIN_URI, {
        email: loginEmail,
        password: loginPassword,
      })
      .then((response) => {
        const userId = response.data.userId;

        localStorage.setItem('user', userId);

        dispatch({ type: 'LOGIN', payload: userId });

        history.push('/my-account');
      })
      .catch((err) => {
        setLoginEmail('');
        setLoginPassword('');
        displayLoginErrorMessage(err.response.data.message);

        inputRef.current.focus();
      });
  };

  const signupUser = (e) => {
    e.preventDefault();

    if (signupPassword !== signupConfirmPassword) {
      displaySignupErrorMessage('Passwords do not match');

      setSignupPassword('');
      setSignupConfirmPassword('');

      signupPasswordInputRef.current.focus();

      return;
    }

    axios
      .post(SIGNUP_URI, {
        name: signupName,
        surname: signupSurname,
        email: signupEmail,
        password: signupPassword,
      })
      .then((response) => {
        if (response.data.registrationStatus === 'failed') {
          displaySignupErrorMessage(response.data.message);

          setSignupEmail('');
          setSignupPassword('');
          setSignupConfirmPassword('');

          signupEmailInputRef.current.focus();
        } else if (response.data.registrationStatus === 'success') {
          localStorage.setItem('user', response.data.userId);
          dispatch({
            type: 'REGISTER',
            payload: response.data.userId,
          });

          history.push('/my-account');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <main>
      <div className='container'>
        <section>
          <h1 className='headline-1'>Sign up/ Log In</h1>
        </section>

        <div className='login-signup-container'>
          <section id='login' className='card-shadow'>
            <h2>
              <span>Have account?</span> Log In!
            </h2>

            <form id='logInForm' className='form' onSubmit={loginUser}>
              <div className='form-control'>
                <label className='form-label' htmlFor='loginEmail'>
                  Email
                </label>
                <input
                  className='form-input'
                  type='email'
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  ref={inputRef}
                />
              </div>

              <div className='form-control'>
                <label className='form-label' htmlFor='loginPassword'>
                  Password
                </label>
                <input
                  className='form-input'
                  type='password'
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>

              <div className='form-control'>
                <input
                  type='submit'
                  value='Log In'
                  className='btn-primary btn-primary-submit'
                />
              </div>
            </form>
            <p
              id='loginMessage'
              className='hidden form-message form-message-danger'
              ref={loginErrorElemRef}
            >
              {loginErrorMessage}
            </p>
          </section>
          <section id='signup' className='card-shadow'>
            <h2>
              <span>New user?</span> Sign Up!
            </h2>

            <form id='signUpForm' className='form' onSubmit={signupUser}>
              <div className='form-control'>
                <label className='form-label' htmlFor='signUpName'>
                  Name
                </label>
                <input
                  className='form-input'
                  type='text'
                  required
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                />
              </div>

              <div className='form-control'>
                <label className='form-label' htmlFor='signUpSurname'>
                  Surname
                </label>
                <input
                  className='form-input'
                  type='text'
                  required
                  value={signupSurname}
                  onChange={(e) => setSignupSurname(e.target.value)}
                />
              </div>

              <div className='form-control'>
                <label className='form-label' htmlFor='signUpEmail'>
                  Email
                </label>
                <input
                  className='form-input'
                  type='text'
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  ref={signupEmailInputRef}
                />
              </div>

              <div className='form-control'>
                <label className='form-label' htmlFor='signUpPassword'>
                  Password
                </label>
                <input
                  className='form-input'
                  type='password'
                  required
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  ref={signupPasswordInputRef}
                />
              </div>

              <div className='form-control'>
                <label className='form-label' htmlFor='signUpConfirmPassword'>
                  Confirm Password
                </label>
                <input
                  className='form-input'
                  type='password'
                  required
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                />
              </div>

              <div className='form-control'>
                <input
                  type='submit'
                  value='Sign Up'
                  className='btn-primary btn-primary-submit'
                />
              </div>
            </form>
            <p
              id='signUpMessage'
              className='hidden form-message form-message-danger'
              ref={signupErrorElemRef}
            >
              {signupErrorMessage}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default LoginScreen;
