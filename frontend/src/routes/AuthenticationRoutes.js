import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
// import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

const SendEmailResetPassw = Loadable(lazy(() => import('views/pages/authentication/SendEmailResetPassw')));
const RecoveryPassword = Loadable(lazy(() => import('views/pages/authentication/RecoveryPassword')));

const ErrorRecoveryPassw = Loadable(lazy(() => import('views/pages/authentication/ErrorRecoveryPassw')));
const TermsConditionsShow = Loadable(lazy(() => import('views/pages/authentication/TermsConditionsShow')));

import { ProtectedRoute } from 'components/Route/ProtectedRoute';

// ==============================|| AUTHENTICATION ROUTING ||============================== //
const AuthenticationRoutes = (account) => {
  const Routes = {
    path: '/',
    element: <ProtectedRoute isAllowed={!account.isLoggedIn} redirecTo="/" />,
    children: [
      // {
      // path: '/',
      // element: <MinimalLayout />,
      // children: [
      {
        path: '/login',
        element: <AuthLogin3 />
      },
      {
        path: '/register',
        element: <AuthRegister3 />
      },
      {
        path: '/termsconditions',
        element: <TermsConditionsShow />
      },
      {
        path: '/sendemailresetpassw',
        element: <SendEmailResetPassw />
      },
      {
        path: '/recoverypassword/:token/',
        element: <RecoveryPassword />
      },
      {
        path: '/errorrecoverypassword',
        element: <ErrorRecoveryPassw />
      }
      // ]
      // }
    ]
  };
  return Routes;
};

export default AuthenticationRoutes;
