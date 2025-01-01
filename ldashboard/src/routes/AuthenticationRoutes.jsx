import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const HeadquarterLogin = Loadable(lazy(() => import('views/pages/authentication3/HeadquarterLogin')));
const StateLogin = Loadable(lazy(() => import('views/pages/authentication3/StateLogin')));
const BranchLogin = Loadable(lazy(() => import('views/pages/authentication3/BranchLogin')));

const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication3/Register3')));
const AuthLogins = Loadable(lazy(() => import('views/pages/authentication3/Logins')));




// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/headquarter/login',
      element: <HeadquarterLogin />
    },
    {
      path: '/state/login',
      element: <StateLogin />
    },
    {
      path: '/branch/login',
      element: <BranchLogin />
    },
    {
      path: '/register',
      element: <AuthRegister3 />
    },
    {
      path: '/logins',
      element: <AuthLogins />
    }
  ]
};

export default AuthenticationRoutes;
