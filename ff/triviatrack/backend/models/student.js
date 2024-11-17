import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true 
    },
    email:{ 
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{ 
        type: String,
        required: true,
        minlength: 6
    } 
});

const StudentModel = mongoose.model('Student', studentSchema);
export default StudentModel;