export default function UserTable({ users, onToggleBlock }) {
  return (
    <table className="w-full bg-white border rounded shadow text-sm">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="p-2">Name</th>
          <th className="p-2">Email</th>
          <th className="p-2">Skills</th>
          <th className="p-2">Blocked</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u._id} className="border-t">
            <td className="p-2">{u.name}</td>
            <td className="p-2">{u.email}</td>
            <td className="p-2">{u.skills?.join(", ")}</td>
            <td className="p-2">{u.isBlocked ? "Yes" : "No"}</td>
            <td className="p-2">
              <button
                onClick={() => onToggleBlock(u._id)}
                className={`px-3 py-1 rounded ${
                  u.isBlocked ? "bg-green-500" : "bg-red-500"
                } text-white`}
              >
                {u.isBlocked ? "Unblock" : "Block"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
