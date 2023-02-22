import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

type ProtectedRouteType = {
  children: JSX.Element;
};

function ProtectedRoute({ children }: ProtectedRouteType) {
  const auth = useAuth();
  const location = useLocation();

  return auth ? children : <Navigate to='/login' state={{ from: location }} replace />;
}

export default ProtectedRoute;
