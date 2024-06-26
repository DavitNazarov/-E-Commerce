import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const AdminRoutes = () => {
  const { userInfo } = useSelector((state) => state.auth);

  //check if user is an admin
  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoutes;
