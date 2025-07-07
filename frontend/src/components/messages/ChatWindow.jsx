import { useEffect, useState, useRef } from "react";
import api from "../../services/api";

export default function ChatWindow({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef();

  useEffect(() => {
    if (selectedUser) {
      fetchMessages();
    }
  }, [selectedUser]);

  const fetchMessages = async () => {
    try {
      const res = await api.get(`/messages/${selectedUser._id}`);
      setMessages(res.data);
      markMessagesRead(res.data);
    } catch (err) {
      console.error("Failed to load messages");
    }
  };

  const markMessagesRead = async (msgs) => {
    const unreadIds = msgs
      .filter((m) => !m.read && m.sender._id === selectedUser._id)
      .map((m) => m._id);

    if (unreadIds.length > 0) {
      await Promise.all(
        unreadIds.map((id) => api.put(`/messages/${id}/read`))
      );
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      const res = await api.post("/messages", {
        recipientId: selectedUser._id,
        content: input,
      });
      setMessages((prev) => [...prev, res.data]);
      setInput("");
    } catch (err) {
      console.error("Failed to send");
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser)
    return (
      <div className="w-2/3 flex items-center justify-center text-gray-500">
        Select a user to chat
      </div>
    );

  return (
    <div className="w-2/3 flex flex-col h-full">
      <div className="border-b p-4 font-semibold">{selectedUser.name}</div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`max-w-xs p-2 rounded text-sm ${
              msg.fromSelf
                ? "bg-blue-600 text-white self-end ml-auto"
                : "bg-white text-gray-800"
            }`}
          >
            {msg.content}
            {msg.read && msg.fromSelf && (
              <span className="block text-[10px] mt-1 text-gray-300">
                ✓ Read
              </span>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="border-t p-3 flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border px-3 py-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
