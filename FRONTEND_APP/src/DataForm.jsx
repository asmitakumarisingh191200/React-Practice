import React, { useState } from "react";
import SearchComponent from "./SearchComponent";

function DataForm() {
  const [formData, setFormData] = useState({
    name: "",
    section: "",
    cgpa: "",
  });

  const [savedData, setSavedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const filteredData = savedData
    .map((data, index) => ({ ...data, index }))
    .filter((data) =>
      data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.cgpa.toString().includes(searchQuery)
    );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      section: "",
      cgpa: "",
    });
    setEditIndex(null);
  };

  const handleSave = () => {
    if (formData.name && formData.section && formData.cgpa) {
      if (editIndex !== null) {
        const updatedData = savedData.map((item, i) =>
          i === editIndex ? { ...formData } : item
        );
        setSavedData(updatedData);
        resetForm();
      } else {
        setSavedData([...savedData, { ...formData }]);
        resetForm();
      }
    } else {
      alert("Please fill all fields");
    }
  };

  const handleDelete = (index) => {
    const updatedData = savedData.filter((_, i) => i !== index);
    setSavedData(updatedData);
    if (editIndex === index) {
      resetForm();
    } else if (editIndex !== null && index < editIndex) {
      setEditIndex(editIndex - 1);
    }
  };

  const handleEdit = (index) => {
    const dataToEdit = savedData[index];
    setFormData({ ...dataToEdit });
    setEditIndex(index);
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Student Data Form</h2>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block mb-2 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter name"
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Section</label>
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleInputChange}
              placeholder="Enter section"
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">CGPA</label>
            <input
              type="number"
              name="cgpa"
              value={formData.cgpa}
              onChange={handleInputChange}
              placeholder="Enter CGPA"
              step="0.01"
              max="10"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-600 text-white py-2 rounded font-semibold"
          >
            {editIndex !== null ? "Save Changes" : "Save Data"}
          </button>
          {editIndex !== null && (
            <button
              onClick={handleCancelEdit}
              className="flex-1 bg-gray-400 text-white py-2 rounded font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Saved Data ({filteredData.length})</h3>

        <SearchComponent searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        {filteredData.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            {searchQuery ? "No matching data found" : "No data saved yet"}
          </p>
        ) : (
          <div className="space-y-2">
            {filteredData.map((data) => (
              <div key={data.index} className="flex justify-between items-center bg-gray-100 p-4 rounded">
                <div>
                  <p><span className="font-semibold">Name:</span> {data.name}</p>
                  <p><span className="font-semibold">Section:</span> {data.section}</p>
                  <p><span className="font-semibold">CGPA:</span> {data.cgpa}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(data.index)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(data.index)}
                    className="bg-red-600 text-white py-1 px-3 rounded font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DataForm;
