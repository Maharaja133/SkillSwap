import { useEffect, useState } from "react";
import api from "../../services/api";
import NotificationItem from "../../components/notifications/NotificationItem";
import toast from "react-hot-toast";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data);
    } catch (err) {
      toast.error("Failed to load notifications");
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      toast.error("Failed to mark as read");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>

      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((notif) => (
            <NotificationItem
              key={notif._id}
              notification={notif}
              onRead={markAsRead}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
