// frontend/src/components/StudentForm.js
import React, { useState, useEffect } from "react"; // 💡 IMPORT useEffect
import axios from "axios";

// 💡 Accept the new props: editingStudent and setEditingStudent
function StudentForm({ onStudentAdded, editingStudent, setEditingStudent }) { 
  const initialFormState = {
    name: "", rollNo: "", branch: "", company: "", 
    status: "Not Placed", email: "", phone: "", cgpa: "", skills: ""
  };
  
  const [formData, setFormData] = useState(initialFormState);

  // 💡 EFFECT: Load data into form when editingStudent prop changes
  useEffect(() => {
    if (editingStudent) {
      setFormData(editingStudent);
    } else {
      setFormData(initialFormState);
    }
  }, [editingStudent]); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        // If editing, use PUT request (UPDATE)
        await axios.put(`https://p-log.onrender.com/api/students/${editingStudent._id}`, formData);
      } else {
        // Otherwise, use POST request (CREATE)
        await axios.post("https://p-log.onrender.com/api/students", formData);
      }
      
      // Call parent function to refresh the list and clear edit state
      onStudentAdded(); 
      setEditingStudent(null); // Clear edit mode
      
    } catch (err) {
      console.error("Submission Error:", err.response?.data || err.message); 
      alert(err.response?.data?.message || "Error saving student (Check console for details)");
    }
  };

  const inputStyle = "w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition duration-200";
  const buttonStyle = "w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 shadow-md";

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white dark:bg-gray-800 shadow-xl rounded-xl space-y-4 transition duration-300"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        {editingStudent ? 'Edit Student Record' : 'Add New Student'}
      </h2>
      
      {/* 💡 NOTE: Roll No input is READ-ONLY when editing to prevent errors with MongoDB unique index */}
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className={inputStyle} required />
      <input type="text" name="rollNo" placeholder="Roll No" value={formData.rollNo} onChange={handleChange} className={inputStyle} required 
        readOnly={!!editingStudent} // Make read-only if editingStudent exists
        disabled={!!editingStudent} // Disabled styling for clarity
      />
      <input type="text" name="branch" placeholder="Branch" value={formData.branch} onChange={handleChange} className={inputStyle} required />
      <input type="text" name="company" placeholder="Company" value={formData.company} onChange={handleChange} className={inputStyle} />
      
      <select name="status" value={formData.status} onChange={handleChange} className={inputStyle}>
        <option value="Placed">Placed</option>
        <option value="Not Placed">Not Placed</option>
        <option value="Interviewing">Interviewing</option>
      </select>
      
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className={inputStyle} />
      <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className={inputStyle} />
      <input type="text" name="cgpa" placeholder="CGPA" value={formData.cgpa} onChange={handleChange} className={inputStyle} />
      <input type="text" name="skills" placeholder="Skills (comma separated)" value={formData.skills} onChange={handleChange} className={inputStyle} />


      <button type="submit" className={buttonStyle}>
        {editingStudent ? 'Save Changes' : 'Add Student'}
      </button>
      
      {/* NEW: Cancel button when in edit mode */}
      {editingStudent && (
        <button 
          type="button" 
          onClick={() => setEditingStudent(null)} 
          className="w-full py-3 mt-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-200 shadow-md"
        >
          Cancel Edit
        </button>
      )}
    </form>
  );
}

export default StudentForm;