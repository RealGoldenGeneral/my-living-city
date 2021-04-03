import React, { useContext } from 'react'
import { RouteProps, Route, Redirect } from 'react-router-dom'
import { UserProfileContext } from '../../contexts/UserProfile.Context';
import { ROUTES } from '../../lib/constants';

interface PrivateRouteProps {
  path: RouteProps['path'];
  component: React.ElementType
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...routeProps
}) => {
  const {
    user,
    token
  } = useContext(UserProfileContext);
  const ComponentToRender = Component as React.ElementType;
  let isLoggedIn = false;
  if (!!user && !!token) {
    isLoggedIn = true;
  }

  return (
    <Route 
      {...routeProps}
      render={(props) => 
        isLoggedIn ? (
          <ComponentToRender {...props} />
        ) : (
          <Redirect to={ROUTES.LOGIN} />
        )
      }
    />
  );
}

export default PrivateRoute