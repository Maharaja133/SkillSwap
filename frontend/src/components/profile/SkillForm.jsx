import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function SkillForm({ skills = [], fetchProfile }) {
  const [newSkill, setNewSkill] = useState({ name: "", level: "beginner" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSkill((prev) => ({ ...prev, [name]: value }));
  };

  const addSkill = async (e) => {
    e.preventDefault();
    try {
      await api.post("/skills", newSkill);
      toast.success("Skill added");
      setNewSkill({ name: "", level: "beginner" });
      fetchProfile();
    } catch (err) {
      toast.error("Failed to add skill");
    }
  };

  const removeSkill = async (id) => {
    try {
      await api.delete(`/skills/${id}`);
      toast.success("Skill removed");
      fetchProfile();
    } catch (err) {
      toast.error("Failed to remove skill");
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Skills</h3>

      <form onSubmit={addSkill} className="flex items-center gap-4 mb-4">
        <input
          name="name"
          placeholder="Skill name"
          value={newSkill.name}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
        <select
          name="level"
          value={newSkill.level}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {skills?.map((skill) => (
          <li key={skill._id} className="flex justify-between items-center bg-white px-4 py-2 rounded shadow-sm">
            <div>
              <strong>{skill.name}</strong> — <span className="text-sm text-gray-500">{skill.level}</span>
            </div>
            <button
              onClick={() => removeSkill(skill._id)}
              className="text-red-600 text-sm hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
