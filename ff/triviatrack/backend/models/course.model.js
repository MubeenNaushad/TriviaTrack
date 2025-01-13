import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    }
  });
  
export const Category = mongoose.model('Category', categorySchema);

const courseSchema=new mongoose.Schema({
    courseTitle:{
        type:String,
        required:true
    },
    subTitle:{
        type:String,
    },
    description:{
        type:String,
    },
    category:{
        type:String,
        required:true
    },
    courseLevel:{
        type:String,
        enum:["Beginner","Medium","Expert"]
    },
    coursePrice:{
        type:Number,
    }, 
    courseThumbnail:{
        type:String,
    },
    enrolledStudents:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'StudentModel'
    }],
    lectures:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'StudentModel'
        }
    ],
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'StudentModel'
    },
    isPublished:{
        type:Boolean,
        default:false
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
},{timestamps:true});

export const Course=mongoose.model("Course", courseSchema);