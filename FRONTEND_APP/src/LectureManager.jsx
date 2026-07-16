import React, { useState } from "react";

function LectureManager() {
  const [lecture, setLecture] = useState("");
  const [lectures, setLectures] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (event) => {
    setLecture(event.target.value);
  };

  const resetFields = () => {
    setLecture("");
    setEditIndex(null);
  };

  const handleAddOrSave = () => {
    const trimmedLecture = lecture.trim();
    if (!trimmedLecture) {
      alert("Please enter a lecture name.");
      return;
    }

    if (editIndex !== null) {
      const updatedLectures = lectures.map((item, index) =>
        index === editIndex ? trimmedLecture : item
      );
      setLectures(updatedLectures);
      resetFields();
    } else {
      setLectures([...lectures, trimmedLecture]);
      resetFields();
    }
  };

  const handleDelete = (index) => {
    const updatedLectures = lectures.filter((_, i) => i !== index);
    setLectures(updatedLectures);
    if (editIndex === index) {
      resetFields();
    } else if (editIndex !== null && index < editIndex) {
      setEditIndex(editIndex - 1);
    }
  };

  const handleEdit = (index) => {
    setLecture(lectures[index]);
    setEditIndex(index);
  };

  const handleCancel = () => {
    resetFields();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-4">Lecture Manager</h2>

      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          type="text"
          value={lecture}
          onChange={handleChange}
          placeholder="Enter lecture name"
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddOrSave}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold"
        >
          {editIndex !== null ? "Save Lecture" : "Add Lecture"}
        </button>
        {editIndex !== null && (
          <button
            onClick={handleCancel}
            className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-lg font-semibold"
          >
            Cancel
          </button>
        )}
      </div>

      {lectures.length === 0 ? (
        <p className="text-gray-500">No lectures added yet.</p>
      ) : (
        <ul className="space-y-3">
          {lectures.map((item, index) => (
            <li key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <span className="text-gray-800 font-medium">{item}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-lg font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-lg font-semibold"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LectureManager;
