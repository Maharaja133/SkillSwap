export default function ChatSidebar({ contacts, onSelect, selectedUser }) {
  return (
    <div className="w-1/3 border-r overflow-y-auto">
      <h3 className="p-4 text-lg font-bold">Chats</h3>
      {contacts.length === 0 ? (
        <p className="p-4 text-sm text-gray-500">No conversations yet.</p>
      ) : (
        contacts.map((user) => (
          <div
            key={user._id}
            onClick={() => onSelect(user)}
            className={`p-4 cursor-pointer hover:bg-gray-100 ${
              selectedUser?._id === user._id ? "bg-gray-100" : ""
            }`}
          >
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.lastMessage}</p>
          </div>
        ))
      )}
    </div>
  );
}
