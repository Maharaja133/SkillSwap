export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="w-full bg-gray-800 text-white py-2 px-4 rounded-xl hover:bg-gray-700 transition"
    >
      {children}
    </button>
  );
}
