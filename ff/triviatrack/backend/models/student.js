import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    
    name:String,
    email:String,
    password:String
    
});

const StudentModel = mongoose.model('Student', studentSchema);
export default StudentModel;