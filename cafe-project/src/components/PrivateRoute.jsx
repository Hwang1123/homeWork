import { Navigate } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';

const PrivateRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
