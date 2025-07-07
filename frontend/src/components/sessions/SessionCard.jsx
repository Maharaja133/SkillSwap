import { format } from "date-fns";

export default function SessionCard({ session, onStatusChange }) {
  const {
    _id,
    skill,
    date,
    time,
    status,
    requester,
    recipient,
    isIncoming,
  } = session;

  return (
    <div className="border rounded p-4 bg-white shadow">
      <h3 className="text-md font-semibold">{skill.name}</h3>
      <p className="text-sm text-gray-600">
        With: <strong>{isIncoming ? requester.name : recipient.name}</strong>
      </p>
      <p className="text-sm text-gray-600">
        Time: {format(new Date(date), "PPP")} at {time}
      </p>
      <p className="text-sm mt-2">
        Status:{" "}
        <span
          className={`font-medium ${
            status === "pending"
              ? "text-yellow-600"
              : status === "accepted"
              ? "text-green-600"
              : status === "declined"
              ? "text-red-600"
              : "text-gray-500"
          }`}
        >
          {status}
        </span>
      </p>

      {isIncoming && status === "pending" && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onStatusChange(_id, "accepted")}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Accept
          </button>
          <button
            onClick={() => onStatusChange(_id, "declined")}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Decline
          </button>
        </div>
      )}
    </div>
  );
}
