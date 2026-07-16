import React from "react";

function SearchComponent({ searchQuery, onSearchChange }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search by name, section, or CGPA..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />
    </div>
  );
}

export default SearchComponent;
