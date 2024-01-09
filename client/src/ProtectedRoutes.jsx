import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoutes = () => {
  const doctorToken = Cookies.get('doctorToken');
  const userToken = Cookies.get('userToken');

  if (!userToken && !doctorToken) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;