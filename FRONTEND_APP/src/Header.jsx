import React from "react";

function Header() {
  return (
    <header className="bg-gray-800 text-white  p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">My App</h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        Sign In
      </button>
    </header>
  );
}

export default Header;