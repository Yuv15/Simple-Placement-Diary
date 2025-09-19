import React, { useState, useEffect } from "react"; // 💡 IMPORT useEffect
import axios from "axios"; // 💡 IMPORT axios
import Navbar from "./Navbar"; 
import StudentForm from "./components/StudentForm"; 
import StudentList from "./components/StudentList";
import PlacementDashboard from "./components/PlacementDashboard"; // 💡 ASSUMING YOU CREATED THIS FILE

function App() {
  const [refresh, setRefresh] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null); 
  const [allStudents, setAllStudents] = useState([]); // 💡 NEW: State to hold all student data

  // 💡 EFFECT: Fetch data whenever refresh state changes
  useEffect(() => {
      axios.get("http://localhost:5000/api/students")
          .then(res => setAllStudents(res.data))
          .catch(err => console.error("Error fetching data for dashboard:", err));
  }, [refresh]);
  
  const handleStudentAdded = () => {
    setRefresh(!refresh);
    setEditingStudent(null); 
  };
  
  const handleEdit = (student) => {
    setEditingStudent(student); 
  };

  return (
    <div className="min-h-screen bg-white/50 dark:bg-dark-bg/50 text-gray-900 dark:text-white">
      <Navbar />
      <div className="pt-24 max-w-3xl mx-auto p-4 space-y-6">
        {/* DASHBOARD INTEGRATION - Pass the centralized data */}
        <PlacementDashboard students={allStudents} /> 

        <StudentForm 
          onStudentAdded={handleStudentAdded} 
          editingStudent={editingStudent} 
          setEditingStudent={setEditingStudent} 
        />
        
        {/* STUDENT LIST - Pass the centralized data and handler */}
        <StudentList 
          students={allStudents} // 💡 PASS DATA AS PROP
          onEdit={handleEdit} 
          refresh={refresh} 
        />
      </div>
    </div>
  );
}

export default App;