import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Screens (pages) MyAccount
import MyAccountScreen from './screens/MyAccountScreen';

const ProtectedRoute = () => {
  // Hooks

  // -- redirects on history by hook useHistory()
  const history = useHistory();

  // -- side effects
  useEffect(() => {
    // if user not exists - redirecting to login PAge
    if (!localStorage.getItem('user')) history.push('/login');
  });

  return <MyAccountScreen />;
  //myMeniu
};

export default ProtectedRoute;
