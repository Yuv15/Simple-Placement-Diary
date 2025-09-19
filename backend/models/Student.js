const mongoose = require("mongoose");

// COMPLETE SCHEMA: MUST match all fields in the frontend form (including email, phone, cgpa, skills)
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, minlength: 2 },
    rollNo: { type: String, required: true, unique: true, trim: true },
    branch: { type: String, required: true, trim: true },
    company: { type: String, default: "Not Placed", trim: true },
    status: { type: String, default: "Not Placed", trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    cgpa: { type: String, trim: true },
    skills: { type: String, trim: true },
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;