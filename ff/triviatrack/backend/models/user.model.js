import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    }, 
    userType:{
        type:String,
        enum:['Teacher', 'Student'],
        default:'Student'
    },
    enrolledcourses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course'
        }
    ],
    photoUrl:{
        type:String,
        default:""
    }
},{timestamps:true}
);

const StudentModel = mongoose.model('User', userSchema);
export default StudentModel;