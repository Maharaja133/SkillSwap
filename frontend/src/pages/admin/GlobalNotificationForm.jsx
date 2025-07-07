import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function GlobalNotificationForm() {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("announcement");
  const [link, setLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) return toast.error("Message is required");

    try {
      await api.post("/admin/notifications/global", { message, type, link });
      toast.success("Notification sent to all users");
      setMessage("");
      setLink("");
    } catch {
      toast.error("Failed to send notification");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow max-w-xl mx-auto"
    >
      <h2 className="text-lg font-semibold mb-4">Send Global Notification</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium">Type</label>
        <select
          className="w-full mt-1 p-2 border rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="announcement">Announcement</option>
          <option value="update">Update</option>
          <option value="info">Info</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Message</label>
        <textarea
          className="w-full mt-1 p-2 border rounded"
          rows="3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter notification message"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Link (optional)</label>
        <input
          className="w-full mt-1 p-2 border rounded"
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="/sessions/123"
        />
      </div>

      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Send Notification
      </button>
    </form>
  );
}
