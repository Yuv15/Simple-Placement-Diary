import React, { useState, useEffect } from "react"; 
import axios from "axios"; 
import Navbar from "./Navbar"; 
import StudentForm from "./components/StudentForm"; 
import StudentList from "./components/StudentList";
import PlacementDashboard from "./components/PlacementDashboard"; 

function App() {
  const [refresh, setRefresh] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null); 
  const [allStudents, setAllStudents] = useState([]); // State to hold all student data

  // 💡 FIX 1: Centralized Data Fetch for Dashboard and List
  useEffect(() => {
      // Use the live API URL
      axios.get("https://p-log.onrender.com/api/students") 
          .then(res => setAllStudents(res.data.reverse())) // Reverse here for newest first
          .catch(err => console.error("Error fetching data for dashboard:", err));
  }, [refresh]); // Fetches data whenever refresh is toggled
  
  const handleStudentAdded = () => {
    setRefresh(prev => !prev); // Toggle state to force refetch
    setEditingStudent(null); 
  };
  
  const handleEdit = (student) => {
    setEditingStudent(student); 
  };

  return (
    <div className="min-h-screen bg-white/50 dark:bg-dark-bg/50 text-gray-900 dark:text-white">
      <Navbar />
      <div className="pt-24 max-w-3xl mx-auto p-4 space-y-6">
        {/* DASHBOARD INTEGRATION */}
        <PlacementDashboard students={allStudents} /> 

        <StudentForm 
          onStudentAdded={handleStudentAdded} 
          editingStudent={editingStudent} 
          setEditingStudent={setEditingStudent} 
        />
        
        {/* STUDENT LIST - Pass the data and the refresh trigger function */}
        <StudentList 
          students={allStudents} // PASS DATA
          onEdit={handleEdit} 
          onDeleteSuccess={handleStudentAdded} // 💡 PASS REFRESH TRIGGER FOR DELETE
        />
      </div>
    </div>
  );
}

export default App;