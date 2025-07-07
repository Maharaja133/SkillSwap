import { useNavigate } from "react-router-dom";

export default function UserCard({ user }) {
  const navigate = useNavigate();

  return (
    <div className="border rounded p-4 bg-white shadow-sm">
      <h3 className="text-lg font-semibold">{user.name}</h3>
      <p className="text-sm text-gray-600">{user.bio}</p>

      <div className="mt-2">
        <p className="font-medium text-sm">Skills:</p>
          <ul className="text-sm text-gray-700 list-disc ml-5">
            {(user.skills || []).map((s) => (
              <li key={s._id}>
                {s.name} ({s.level})
              </li>
            ))}
          </ul>
      </div>

      <p className="text-sm mt-2 text-green-600">
        {user.availability ? "Available for sessions" : "Currently unavailable"}
      </p>

      <button
        onClick={() => navigate(`/dashboard/session-request/${user._id}`)}
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Request Session
      </button>
    </div>
  );
}
