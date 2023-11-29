import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

import { useSelector } from 'react-redux';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const account = useSelector((state) => state.account);

  const mr = MainRoutes(account);
  const ar = AuthenticationRoutes(account);

  return useRoutes([mr, ar]);
}
