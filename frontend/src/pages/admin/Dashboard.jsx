import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AdminCard title="Manage Users" to="users" />
        <AdminCard title="Manage Sessions" to="sessions" />
        <AdminCard title="View Reports" to="reports" />
      </div>
    </div>
  );
}

function AdminCard({ title, to }) {
  return (
    <Link
      to={to}
      className="bg-white p-6 shadow hover:shadow-lg rounded-xl text-center border hover:border-indigo-500 transition"
    >
      <p className="font-semibold text-lg text-indigo-600">{title}</p>
    </Link>
  );
}
