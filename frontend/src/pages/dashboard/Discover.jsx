import { useState, useEffect } from "react";
import api from "../../services/api";
import UserCard from "../../components/discover/UserCard";

export default function Discover() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users/discover", {
        params: { skill: query, level },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchUsers();
  }, []);

  return (<div className="p-6 bg-white rounded-lg shadow-sm">
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-gray-800 mb-2">Discover Peers by Skill</h2>
    <p className="text-gray-600">Find and connect with peers who share your learning interests</p>
  </div>

  <div className="flex flex-col sm:flex-row gap-4 mb-8">
    <div className="relative flex-grow">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search skills (e.g. JavaScript, Design)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      />
    </div>
    
    <select
      value={level}
      onChange={(e) => setLevel(e.target.value)}
      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    >
      <option value="">All Skill Levels</option>
      <option value="beginner">Beginner</option>
      <option value="intermediate">Intermediate</option>
      <option value="advanced">Advanced</option>
    </select>
    
    <button
      onClick={searchUsers}
      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Search
    </button>
  </div>

  {loading ? (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  ) : users.length === 0 ? (
    <div className="text-center py-12">
      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="mt-2 text-lg font-medium text-gray-900">No users found</h3>
      <p className="mt-1 text-gray-500">Try adjusting your search criteria</p>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  )}
</div>
)}
