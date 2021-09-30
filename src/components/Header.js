import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

import '../assets/styles/header.css';

const Header = () => {
  // Hooks
  // -- state
  const { state, dispatch } = useContext(UserContext);

  // -- side effects
  useEffect(() => {
    if (localStorage.getItem('user')) {
      console.log('User founded');

      dispatch({
        type: 'LOGIN',
        payload: localStorage.getItem('user'),
      });
    } else {
      console.log('User not founded');
    }
  }, [dispatch]);

  return (
    <header>
      <div className='container'>
        <div>FootBall Voting Table</div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            {state.user ? (
              <li>
                <Link to='/my-account'>My Account</Link>
              </li>
            ) : (
              <li>
                <Link to='/login'>Log In/ Sign Up</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
