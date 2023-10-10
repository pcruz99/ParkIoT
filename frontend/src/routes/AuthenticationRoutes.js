import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

import { ProtectedRoute } from 'components/ProtectedRoute';

// ==============================|| AUTHENTICATION ROUTING ||============================== //
const AuthenticationRoutes = (account) => {
  const Routes = {
    path: '/',
    element: <ProtectedRoute isAllowed={!account.isLoggedIn} redirecTo="/" />,
    children: [
      {
        path: '/',
        element: <MinimalLayout />,
        children: [
          {
            path: '/login',
            element: <AuthLogin3 />
          },
          {
            path: '/register',
            element: <AuthRegister3 />
          }
        ]
      }
    ]
  };
  return Routes;
};

export default AuthenticationRoutes;
