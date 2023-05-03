import { Outlet, Navigate } from 'react-router-dom';

const RouteCheck = ({ element: Component, ...props }) => {
  const check = false;
  return check ? <Outlet /> : <Navigate to='/sign-in' />
}

export default RouteCheck;