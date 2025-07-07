import { useState, useEffect } from "react";
import ChatSidebar from "../../components/messages/ChatSidebar";
import ChatWindow from "../../components/messages/ChatWindow";
import api from "../../services/api";

export default function Messages() {
  const [contacts, setContacts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchContacts = async () => {
    try {
      const res = await api.get("/messages/recent");
      setContacts(res.data);
    } catch (err) {
      console.error("Failed to load contacts");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
  <div className="flex h-[calc(100vh-80px)] bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
  <div className="w-80 border-r border-gray-200 bg-gradient-to-b from-gray-50 to-white">
    <ChatSidebar 
      contacts={contacts}
      onSelect={(user) => setSelectedUser(user)}
      selectedUser={selectedUser}
    />
  </div>

  {selectedUser ? (
    <div className="flex-1 flex flex-col">
      <div className="border-b border-gray-200 p-4 bg-white flex items-center space-x-3">
        <div className="relative">
          <img 
            src={selectedUser.avatar} 
            alt={selectedUser.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
            selectedUser.isOnline ? 'bg-green-500' : 'bg-gray-400'
          }`}></span>
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{selectedUser.name}</h3>
          <p className="text-xs text-gray-500">
            {selectedUser.isOnline ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <ChatWindow selectedUser={selectedUser} />
      </div>

      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex-1 flex items-center justify-center bg-gray-50">
      <div className="text-center p-6 max-w-md">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">No conversation selected</h3>
        <p className="mt-1 text-gray-500">Choose a contact from the sidebar to start chatting</p>
      </div>
    </div>
  )}
</div>
  );
}
