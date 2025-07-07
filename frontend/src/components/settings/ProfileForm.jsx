import { useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function ProfileForm() {
  const [form, setForm] = useState({ name: "", bio: "", skills: [] });
  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {
    api.get("/users/me").then((res) => setForm(res.data));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSkillAdd = () => {
    if (skillInput && !form.skills.includes(skillInput.trim())) {
      setForm({ ...form, skills: [...form.skills, skillInput.trim()] });
      setSkillInput("");
    }
  };

  const handleSkillRemove = (skill) => {
    setForm({ ...form, skills: form.skills.filter((s) => s !== skill) });
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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          name="name"
          className="w-full p-2 mt-1 border rounded"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Bio</label>
        <textarea
          name="bio"
          className="w-full p-2 mt-1 border rounded"
          rows="3"
          value={form.bio}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Skills</label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            className="flex-1 p-2 border rounded"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            placeholder="Add skill"
          />
          <button
            type="button"
            onClick={handleSkillAdd}
            className="bg-indigo-600 text-white px-3 rounded"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {form.skills.map((skill) => (
            <span
              key={skill}
              className="bg-gray-100 px-2 py-1 rounded-full text-sm"
            >
              {skill}{" "}
              <button
                type="button"
                onClick={() => handleSkillRemove(skill)}
                className="text-red-500 ml-1"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </form>
  );
}
