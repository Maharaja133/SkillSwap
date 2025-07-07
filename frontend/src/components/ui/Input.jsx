export default function Input({ label, ...props }) {
  return (
    <div className="mb-4">
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
      <input
        {...props}
        className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-gray-500"
      />
    </div>
  );
}
