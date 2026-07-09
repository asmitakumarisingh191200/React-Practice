// // import Component from "./Component";
// // import Header from "./Header";
// // import DataForm from "./DataForm";
// import LectureManager from "./LectureManager";
// import AttendanceManager from "./AttendanceManager";
// import SearchAdder from "./SearchAdder";
// import Form from "./Form";
// import Form2 from "./Form2"; 

// function App() {
//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       {/* <Header /> */}
//       {/* <div className="p-4">
//         <DataForm />
//       </div> */}

//       {/* <div className="p-4">
//         <LectureManager/>
//       </div> */}
//       {/* <div className="p-4">
//         <AttendanceManager/>
//       </div> */}

//       {/* <div className="p-4">
//         <SearchAdder />
//       </div> */}
//       <div className="p-4">
//         <Form2/>
//       </div>
      
//       {/* <div className="flex justify-center pt-16 pb-4">
//         <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition font-semibold">
//           + Add Lecture
//         </button>
//       </div>
      
//       <div className="flex flex-wrap gap-7 justify-center pt-2 pb-8">
//         <Component
//           time="10:00 AM"
//           name="React Development"
//           faculty="Dr. Rahul Sharma"
//           color="blue"
//         />

//         <Component
//           time="12:00 PM"
//           name="Java Programming"
//           faculty="Ms. Priya Singh"
//           color="purple"
//         />

//         <Component
//           time="2:30 PM"
//           name="Database Management"
//           faculty="Mr. Amit Verma"
//           color="indigo"
//         />
//       </div> */}
//     </div>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";
import MultiFormPage from "./pages/MultiFormPage";
import FeedbackForm from "./components/FeedbackForm";
import ContactForm from "./components/ContactForm";
import RegistrationForm from "./components/RegistrationForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main page with buttons */}
        <Route path="/" element={<MultiFormPage />} />

        {/* Individual routes for each form */}
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
