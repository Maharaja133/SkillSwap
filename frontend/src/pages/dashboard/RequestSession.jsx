import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function RequestSession() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get(`/users/${userId}`);
      setUser(res.data);
    } catch (err) {
      toast.error("Failed to load user");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSkill || !date || !time) {
      return toast.error("All fields are required");
    }

    try {
      await api.post("/sessions", {
        recipientId: userId,
        skillId: selectedSkill,
        date,
        time,
      });
      toast.success("Session requested!");
      navigate("/dashboard/sessions");
    } catch (err) {
      toast.error("Request failed");
    }
  };

  if (!user) return <p>Loading user info...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Request a Session with {user.name}</h2>
      <p className="text-gray-600 mb-2">{user.bio}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Select Skill</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
          >
            <option value="">-- Choose a skill --</option>
            {user.skills.map((skill) => (
              <option key={skill._id} value={skill._id}>
                {skill.name} ({skill.level})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Date</label>
          <input
            type="date"
            className="w-full border px-3 py-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Time</label>
          <input
            type="time"
            className="w-full border px-3 py-2 rounded"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Send Request
        </button>
      </form>
    </div>
  );
}
