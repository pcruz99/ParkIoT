import { Navigate, Outlet } from 'react-router-dom';

// eslint-disable-next-line
export const ProtectedRoute = ({ children, isAllowed, redirecTo = '/lading' }) => {
  if (!isAllowed) {
    return <Navigate to={redirecTo} />;
  }
  return children ? <>{children}</> : <Outlet />;
};
