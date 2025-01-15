import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const user = useSelector((state) => state.user.userInfo);
  let location = useLocation();

  // Show loading indicator while user is being fetched
  if (user === undefined) {
    return <div>Loading...</div>; // or any loader component you prefer
  }

  // Check if user is not an admin or not logged in
  if (!user || !user.isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
