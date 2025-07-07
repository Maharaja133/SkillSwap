import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function ChangePasswordForm() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (form.newPassword.length < 6) {
      return toast.error("New password must be at least 6 characters");
    }

    try {
      await api.put("/users/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      toast.success("Password changed successfully");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mt-10">
      <h3 className="text-xl font-semibold mb-4">Change Password</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium">Current Password</label>
        <input
          type="password"
          name="currentPassword"
          value={form.currentPassword}
          onChange={handleChange}
          className="w-full p-2 mt-1 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">New Password</label>
        <input
          type="password"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
          className="w-full p-2 mt-1 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Confirm New Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 mt-1 border rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Update Password
      </button>
    </form>
  );
}
