import { useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function ProfileForm() {
  const [form, setForm] = useState({
    name: "",
    bio: "",
    location: "",
    profilePicture: "",
    skillsOffered: [],
    skillsWanted: [],
    availability: [],
  });

  const [offeredSkillInput, setOfferedSkillInput] = useState("");
  const [wantedSkillInput, setWantedSkillInput] = useState("");
  const [availabilityInput, setAvailabilityInput] = useState("");

  useEffect(() => {
    api.get("/users/me").then((res) => setForm(res.data));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addTag = (key, value) => {
    if (value && !form[key].includes(value.trim())) {
      setForm({ ...form, [key]: [...form[key], value.trim()] });
    }
  };

  const removeTag = (key, value) => {
    setForm({ ...form, [key]: form[key].filter((v) => v !== value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/users/me", form);
      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md max-w-2xl mx-auto border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Edit Your Profile</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            value={form.location}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
        <textarea
          name="bio"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-[100px]"
          rows="3"
          value={form.bio}
          onChange={handleChange}
          placeholder="Tell others about yourself and your skills..."
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture URL</label>
        <div className="flex items-center space-x-4">
          {form.profilePicture && (
            <img 
              src={form.profilePicture} 
              alt="Profile preview" 
              className="w-12 h-12 rounded-full object-cover border"
            />
          )}
          <input
            type="text"
            name="profilePicture"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            value={form.profilePicture}
            onChange={handleChange}
            placeholder="https://example.com/photo.jpg"
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">Skills You Offer</label>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={offeredSkillInput}
              onChange={(e) => setOfferedSkillInput(e.target.value)}
              placeholder="e.g., React, Graphic Design"
              onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
            />
            <button
              type="button"
              onClick={() => {
                if (offeredSkillInput.trim()) {
                  addTag("skillsOffered", offeredSkillInput);
                  setOfferedSkillInput("");
                }
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {form.skillsOffered.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeTag("skillsOffered", skill)}
                  className="ml-1.5 text-indigo-500 hover:text-indigo-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">Skills You Want to Learn</label>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={wantedSkillInput}
              onChange={(e) => setWantedSkillInput(e.target.value)}
              placeholder="e.g., Node.js, Photography"
              onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
            />
            <button
              type="button"
              onClick={() => {
                if (wantedSkillInput.trim()) {
                  addTag("skillsWanted", wantedSkillInput);
                  setWantedSkillInput("");
                }
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {form.skillsWanted.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeTag("skillsWanted", skill)}
                  className="ml-1.5 text-blue-500 hover:text-blue-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={availabilityInput}
              onChange={(e) => setAvailabilityInput(e.target.value)}
              placeholder="e.g., Weekdays 6–9 PM, Weekends"
              onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
            />
            <button
              type="button"
              onClick={() => {
                if (availabilityInput.trim()) {
                  addTag("availability", availabilityInput);
                  setAvailabilityInput("");
                }
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {form.availability.map((slot) => (
              <span
                key={slot}
                className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
              >
                {slot}
                <button
                  type="button"
                  onClick={() => removeTag("availability", slot)}
                  className="ml-1.5 text-green-500 hover:text-green-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={oncancel}
          className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
