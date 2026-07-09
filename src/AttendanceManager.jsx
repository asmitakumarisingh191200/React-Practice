import React, { useState } from "react";

function AttendanceManager() {
  // Initialize 25 students with actual names
  const studentNames = [
    "Aarav",
    "Aditi",
    "Rohan",
    "Priya",
    "Rahul",
    "Sneha",
    "Karan",
    "Ananya",
    "Vikram",
    "Neha",
    "Arjun",
    "Kavya",
    "Mohit",
    "Pooja",
    "Siddharth",
    "Meera",
    "Yash",
    "Nisha",
    "Aditya",
    "Riya",
    "Harsh",
    "Ishita",
    "Manav",
    "Tanvi",
    "Simran",
  ];

  const studentList = studentNames.map((name, i) => ({
    id: i + 1,
    name: name,
    isPresent: false,
  }));

  const [students, setStudents] = useState(studentList);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [verifyCount, setVerifyCount] = useState("");
  const [verifyError, setVerifyError] = useState("");
  const [verifySuccess, setVerifySuccess] = useState(false);

  // Calculate statistics
  const totalStudents = students.length;
  const presentStudents = students.filter((s) => s.isPresent).length;
  const absentStudents = totalStudents - presentStudents;

  // Toggle attendance for a student
  const toggleAttendance = (id) => {
    const updatedStudents = students.map((student) =>
      student.id === id ? { ...student, isPresent: !student.isPresent } : student
    );
    setStudents(updatedStudents);
  };

  // Verify and Update attendance (save to history)
  const handleVerifyAndUpdate = () => {
    setVerifyError("");
    setVerifySuccess(false);

    const inputCount = parseInt(verifyCount);

    if (verifyCount === "") {
      setVerifyError("Please enter the number of present students.");
      return;
    }

    if (isNaN(inputCount)) {
      setVerifyError("Please enter a valid number.");
      return;
    }

    if (inputCount !== presentStudents) {
      setVerifyError(
        `❌ Mismatch! You entered Wrong count!!`
      );
      return;
    }

    // Count matches - Update attendance
    const attendanceRecord = {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      presentCount: presentStudents,
      absentCount: absentStudents,
      presentStudents: students.filter((s) => s.isPresent).map((s) => s.name),
    };

    setAttendanceHistory([...attendanceHistory, attendanceRecord]);
    setVerifySuccess(true);
    setVerifyCount("");
    setTimeout(() => {
      resetAttendance();
      setVerifySuccess(false);
    }, 1500);
  };

  // Reset attendance for a new day
  const resetAttendance = () => {
    setStudents(
      students.map((student) => ({
        ...student,
        isPresent: false,
      }))
    );
  };

  // Reset all data
  const handleResetAll = () => {
    if (window.confirm("Are you sure you want to reset all attendance data?")) {
      setAttendanceHistory([]);
      resetAttendance();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Attendance Manager
        </h1>

        <div className="grid grid-cols-1 mb-8">
          {/* Stats Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500 max-w-xs">
            <h3 className="text-gray-600 font-semibold mb-2">Total Students</h3>
            <p className="text-4xl font-bold text-blue-600">{totalStudents}</p>
          </div>
        </div>

        {/* Student List */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Mark Attendance</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {students.map((student) => (
              <label
                key={student.id}
                className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-blue-50 transition"
              >
                <input
                  type="checkbox"
                  checked={student.isPresent}
                  onChange={() => toggleAttendance(student.id)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className={`ml-3 font-medium ${student.isPresent ? "text-green-600" : "text-gray-700"}`}>
                  {student.name}
                </span>
                <span className={`ml-auto text-sm font-semibold ${student.isPresent ? "text-green-600" : "text-red-600"}`}>
                  {student.isPresent ? "Present" : "Absent"}
                </span>
              </label>
            ))}
          </div>

          {/* Verification Box */}
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Verify Attendance</h3>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="number"
                value={verifyCount}
                onChange={(e) => {
                  setVerifyCount(e.target.value);
                  setVerifyError("");
                }}
                placeholder="Enter number of present students"
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleVerifyAndUpdate}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition"
              >
                Verify & Update
              </button>
            </div>
            {verifyError && (
              <p className="text-red-600 font-semibold mt-3">{verifyError}</p>
            )}
            {verifySuccess && (
              <p className="text-green-600 font-semibold mt-3">✅ Attendance Updated Successfully!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendanceManager;
