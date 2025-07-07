import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import SessionCard from "../../components/sessions/SessionCard";

export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await api.get("/sessions/my");
      setSessions(res.data);
    } catch (err) {
      toast.error("Failed to load sessions");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/sessions/${id}/status`, { status });
      toast.success(`Session ${status}`);
      fetchSessions();
    } catch (err) {
      toast.error("Action failed");
    }
  };

  if (loading) return <p>Loading sessions...</p>;

  return (
    <div className="space-y-6">
  <div className="flex justify-between items-center">
    <h2 className="text-2xl font-bold text-gray-800">Your Learning Sessions</h2>
    <button 
      onClick={() => navigate('/sessions/new')}
      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition flex items-center space-x-1"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
      </svg>
      <span>New Session</span>
    </button>
  </div>

  {sessions.length === 0 ? (
    <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="mt-2 text-lg font-medium text-gray-900">No sessions scheduled</h3>
      <p className="mt-1 text-gray-500">Get started by scheduling your first learning session</p>
      <div className="mt-6">
        <button
          onClick={() => navigate('/sessions/new')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition"
        >
          Schedule Session
        </button>
      </div>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sessions.map((session) => (
        <SessionCard
          key={session._id}
          session={session}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  )}

  {sessions.length > 0 && (
    <div className="flex justify-center mt-8">
      <button 
        onClick={() => navigate('/sessions/new')}
        className="px-6 py-3 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg shadow-sm transition"
      >
        + Schedule Another Session
      </button>
    </div>
  )}
</div>
  );
}
