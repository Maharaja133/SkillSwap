import './index.css';
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/dashboard/Home";
import Profile from "./pages/dashboard/Profile";
import Sessions from "./pages/dashboard/Sessions";
import Discover from "./pages/dashboard/Discover";
import RequestSession from "./pages/dashboard/RequestSession";
import Messages from "./pages/dashboard/Messages";
import Notifications from "./pages/dashboard/Notifications";
import PrivateRoute from "./routes/PrivateRoute";
import RequireAdmin from "./components/auth/RequireAdmin";
import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import AdminSessions from "./pages/admin/Sessions";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="sessions" element={<Sessions />} />
          <Route path="discover" element={<Discover />} />
          <Route path="session-request/:userId" element={<RequestSession />} />
          <Route path="messages" element={<Messages />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Route>


      <Route element={<RequireAdmin />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/sessions" element={<AdminSessions />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
