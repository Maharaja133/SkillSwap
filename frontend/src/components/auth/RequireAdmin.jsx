import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function RequireAdmin() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (!user || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
