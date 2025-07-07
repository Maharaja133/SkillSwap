import { useEffect, useState } from "react";
import api from "../../services/api";

export default function DashboardHome() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users/discover");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };
    fetchUsers();
    
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
  <div className="mb-8">
    <h2 className="text-3xl font-bold text-gray-800 mb-2">Explore Peer Profiles</h2>
    <p className="text-gray-600">Connect with like-minded learners and mentors</p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {users.map((user) => (
      <div 
        key={user._id} 
        className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        <div className="p-5">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative">
              <img 
                src={user.avatar || '/default-avatar.png'} 
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
              />
              {user.isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.title || 'SkillSwap Member'}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-600 text-sm mb-2">{user.bio?.substring(0, 80)}{user.bio?.length > 80 ? '...' : ''}</p>
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {user.location || 'Location not specified'}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {user.skills?.slice(0, 3).map((skill) => (
              <span 
                key={skill} 
                className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
            {user.skills?.length > 3 && (
              <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-full">
                +{user.skills.length - 3} more
              </span>
            )}
          </div>
          
          <button className="w-full py-2 px-4 bg-white border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
            View Profile
          </button>
        </div>
      </div>
    ))}
  </div>

  {users.length === 0 && (
    <div className="text-center py-12">
      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="mt-2 text-lg font-medium text-gray-900">No profiles found</h3>
      <p className="mt-1 text-gray-500">Try adjusting your search criteria</p>
    </div>
  )}
</div>
  );
}
