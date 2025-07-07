import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminSessions() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    api.get("/admin/sessions").then((res) => setSessions(res.data));
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4">All Sessions</h2>
      <table className="w-full bg-white border rounded shadow text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2">From</th>
            <th className="p-2">To</th>
            <th className="p-2">Skill</th>
            <th className="p-2">Status</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((s) => (
            <tr key={s._id} className="border-t">
              <td className="p-2">{s.fromUser?.name}</td>
              <td className="p-2">{s.toUser?.name}</td>
              <td className="p-2">{s.skill}</td>
              <td className="p-2">{s.status}</td>
              <td className="p-2">
                {new Date(s.scheduledAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
