import { useEffect, useState } from "react";
import api from "../../services/api";
import UserTable from "../../components/admin/UserTable";

export default function Users() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await api.get("/admin/users");
    setUsers(res.data);
  };

  const toggleBlock = async (userId) => {
    await api.put(`/admin/users/${userId}/toggle-block`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4">All Users</h2>
      <UserTable users={users} onToggleBlock={toggleBlock} />
    </div>
  );
}
