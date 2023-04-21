import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, isAuthenticated, redirectTo = '/' }: any) {
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }

  return children;
}

export default ProtectedRoute;
