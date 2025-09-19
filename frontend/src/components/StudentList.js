import React, { useState } from "react"; 
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion"; 
import { TrashIcon } from '@heroicons/react/24/outline'; 

// 💡 CHANGE: Accept 'students' array and new 'onDeleteSuccess' function
function StudentList({ students, onEdit, onDeleteSuccess }) { 
  const [activeFilter, setActiveFilter] = useState('All'); 

  // --- 1. Delete Logic (FIXED) ---
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    try {
      // Send DELETE request to backend
      await axios.delete(`https://p-log.onrender.com/api/students/${id}`);
      
      // 💡 FIX 2: Call the success function to trigger data refetch in App.js
      onDeleteSuccess(); 
      
    } catch (err) {
      console.error("Deletion failed:", err);
      alert("Failed to delete student. Check console.");
    }
  };

  // ... (rest of the component logic remains the same) ...
  
  const filterOptions = ['All', 'Placed', 'Not Placed', 'Interviewing'];
  
  const getStatusClass = (status) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('placed')) return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
    if (lowerStatus.includes('unplaced') || lowerStatus.includes('not placed')) return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
    if (lowerStatus.includes('interviewing')) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, marginBottom: 0, transition: { duration: 0.2 } }
  };

  // --- 3. Filtering Logic ---
  const filteredStudents = students.filter(s => { // Use 'students' prop directly
    if (activeFilter === 'All') return true;
    const studentStatus = (s.status || '').toLowerCase();
    const filter = activeFilter.toLowerCase();
    return studentStatus.includes(filter);
  }).sort((a, b) => b.createdAt.localeCompare(a.createdAt)); // Sort by creation date (newest first)

  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow-xl rounded-xl transition duration-300">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Student List</h2>
      
      {/* FILTER BUTTONS UI */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {filterOptions.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition duration-200 
              ${activeFilter === filter 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`
            }
          >
            {filter}
          </button>
        ))}
      </div>
      
      <ul className="space-y-4">
        <AnimatePresence initial={false}>
          {filteredStudents.map((s) => (
            <motion.li 
              key={s._id} 
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col transition duration-200 hover:shadow-lg"
            >
              
              {/* Top Row: Name, Roll No, Branch, Status, and ACTION BUTTONS */}
              <div className="flex justify-between items-center w-full"> 
                {/* Student Info */}
                <div className="flex-grow">
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{s.name} ({s.rollNo})</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{s.branch} - {s.company || 'N/A'}</p>
                </div>

                {/* Status Badge and Action Buttons Container */}
                <div className="flex items-center space-x-3"> 
                    <span 
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusClass(s.status || 'N/A')}`}
                    >
                        {s.status || 'N/A'}
                    </span>
                    
                    {/* EDIT BUTTON */}
                    <button 
                        onClick={() => onEdit(s)} // Trigger edit mode in App.js
                        className="p-1 rounded-full text-blue-500 hover:bg-blue-100 dark:hover:bg-gray-700 transition duration-150"
                        title="Edit Student"
                    >
                        {/* Pencil Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 17.21a2.25 2.25 0 0 1-1.442.844l-3.236.452a.75.75 0 0 1-.773-.951l.452-3.236a2.25 2.25 0 0 1 .844-1.442L16.862 4.487Z" />
                        </svg>
                    </button>
                    
                    {/* DELETE BUTTON */}
                    <button 
                        onClick={() => handleDelete(s._id)}
                        className="p-1 rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-gray-700 transition duration-150"
                        title="Delete Student"
                    >
                        <TrashIcon className="h-5 w-5" />
                    </button>
                </div>
              </div>
              
              {/* Bottom Row: Additional Details (Email, CGPA, Skills) */}
              <div className="mt-2 text-sm text-gray-700 dark:text-gray-300 border-t pt-2 border-gray-100 dark:border-gray-700">
                  <p>Email: <span className="font-medium">{s.email || 'N/A'}</span> | Phone: <span className="font-medium">{s.phone || 'N/A'}</span></p>
                  <p>CGPA: <span className="font-medium">{s.cgpa || 'N/A'}</span></p>
                  <p>Skills: <span className="font-medium">{s.skills || 'N/A'}</span></p>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
        {filteredStudents.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 py-4">
              {activeFilter === 'All' ? 'No students added yet.' : `No students found with status: ${activeFilter}`}
            </p>
        )}
      </ul>
    </div>
  );
}

export default StudentList;