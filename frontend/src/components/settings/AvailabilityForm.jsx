import { useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function AvailabilityForm() {
  const [availability, setAvailability] = useState("");

  useEffect(() => {
    api.get("/users/me").then((res) => {
      setAvailability(res.data.availability || "");
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/users/me", { availability });
      toast.success("Availability updated");
    } catch {
      toast.error("Failed to update availability");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Availability</h3>

      <textarea
        value={availability}
        onChange={(e) => setAvailability(e.target.value)}
        placeholder="e.g., Weekdays after 6pm, Sat-Sun anytime"
        className="w-full p-2 border rounded mb-4"
        rows="3"
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Update Availability
      </button>
    </form>
  );
}
