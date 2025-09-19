const express = require("express");
const router = express.Router();
// 💡 IMPORTANT: Import the clean Model from the models folder
const Student = require("../models/Student"); 

// --- POST: Add a new student ---
router.post("/", async (req, res) => {
    try {
        const { name, rollNo, branch, company, status, email, phone, cgpa, skills } = req.body;

        // Basic validation for required fields
        if (!name || !rollNo || !branch) {
            return res.status(400).json({ message: "Name, Roll No, and Branch are required." });
        }

        const newStudent = new Student({
            name, rollNo, branch, company, status, email, phone, cgpa, skills
        });

        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error (RollNo is set to unique)
            return res.status(409).json({ message: "Duplicate entry: Roll No already exists." });
        }
        // Return Mongoose validation error message
        res.status(400).json({ message: error.message }); 
    }
});

// --- GET: Fetch all students ---
router.get("/", async (req, res) => {
    try {
        // Fetch all students and sort by name
        const students = await Student.find().sort({ name: 1 });
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error during fetch." });
    }
});

// --- GET: Fetch single student by ID ---
router.get("/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error." });
    }
});

// --- PUT: Update student by ID ---
router.put("/:id", async (req, res) => {
    try {
        const { name, rollNo, branch, company, status, email, phone, cgpa, skills } = req.body;

        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            { name, rollNo, branch, company, status, email, phone, cgpa, skills },
            { new: true, runValidators: true } // {new: true} returns the updated document
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found." });
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// --- DELETE: Delete student by ID (The requested functionality) ---
router.delete("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        
        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }
        
        // 204 No Content is the standard response for a successful deletion
        res.status(204).send(); 
    } catch (error) {
        console.error("Error deleting student:", error);
        res.status(500).json({ message: "Internal Server Error during deletion." });
    }
});

module.exports = router;