import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({ children, isAllowed, redirecTo = '/lading' }) => {
  if (!isAllowed) {
    return <Navigate to={redirecTo} />;
  }
  return children ? <>{children}</> : <Outlet />;
};
