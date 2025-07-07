import { Bell, MessageCircle, CalendarCheck } from "lucide-react";

const icons = {
  session: <CalendarCheck className="text-indigo-600 w-5 h-5" />,
  message: <MessageCircle className="text-green-600 w-5 h-5" />,
  feedback: <Bell className="text-yellow-500 w-5 h-5" />,
  system: <Bell className="text-red-500 w-5 h-5" />,
};

export default function NotificationItem({ notification, onRead }) {
  const handleClick = () => {
    if (!notification.read) onRead(notification._id);
  };

  return (
    <li
      onClick={handleClick}
      className={`flex items-start gap-3 p-3 rounded cursor-pointer ${
        notification.read ? "bg-gray-100" : "bg-indigo-50"
      } hover:bg-indigo-100`}
    >
      <div>{icons[notification.type] || <Bell className="w-5 h-5" />}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-800">{notification.message}</p>
        <p className="text-xs text-gray-500">{new Date(notification.createdAt).toLocaleString()}</p>
      </div>
    </li>
  );
}
