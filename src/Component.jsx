function Component({ time, name, faculty, color = "blue" }) {
  const colorSchemes = {
    blue: { title: "text-blue-600", time: "bg-blue-50 border-blue-600 text-blue-900", faculty: "bg-green-50 border-green-600 text-green-900", button: "bg-blue-600 hover:bg-blue-700" },
    purple: { title: "text-purple-600", time: "bg-purple-50 border-purple-600 text-purple-900", faculty: "bg-orange-50 border-orange-600 text-orange-900", button: "bg-purple-600 hover:bg-purple-700" },
    indigo: { title: "text-indigo-600", time: "bg-indigo-50 border-indigo-600 text-indigo-900", faculty: "bg-pink-50 border-pink-600 text-pink-900", button: "bg-indigo-600 hover:bg-indigo-700" }
  };
  
  const scheme = colorSchemes[color] || colorSchemes.blue;
  
  return (
    <div className="w-80">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition duration-300 mb-4">
        <h2 className={`text-2xl font-bold ${scheme.title}`}>{name}</h2>
      </div>

      <div className={`rounded-lg shadow p-4 border-l-4 ${scheme.time} mb-4`}>
        <p className="font-semibold">🕒 Time:</p>
        <p>{time}</p>
      </div>

      <div className={`rounded-lg shadow p-4 border-l-4 ${scheme.faculty} mb-4`}>
        <p className="font-semibold">👨‍🏫 Faculty:</p>
        <p>{faculty}</p>
      </div>

      <button className={`w-full text-white py-2 rounded-lg transition ${scheme.button}`}>
        Join Class
      </button>
    </div>
  );
}

export default Component;