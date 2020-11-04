import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { UserContext } from '../../UserContext';

const ProtectedRoute = (props) => {
  const { user } = React.useContext(UserContext);

  if (user === true) return <Route {...props} />;
  else if (user === false) return <Navigate to="/" />;
  else return null;
};

export default ProtectedRoute;
