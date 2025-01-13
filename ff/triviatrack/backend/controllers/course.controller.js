import { Course } from "../models/course.model.js";

export const createcourse = async(req,res)=>{
    try{
        const {courseTitle, category}=req.body;
        if(!courseTitle||!category){
            return res.status(400).json({
                message:"Course title and category are required."
            })
        }
        const course =await Course.create({
            courseTitle,
            category,
            creator:req.id
        });
        return res.status(201).json({

            course,
            message:"Course created"
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Failed to created course"
        })
    }
}
export const getcourse = async(req,res)=>{
    try{
        const courses = await Course.find({}).populate("creator");
        return res.json(courses);
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Failed to fetch courses"
        })
    }
}

export const getspecificcourse = async(req,res)=>{
    try{
        const newcourse = await Course.findById(req.params.id).populate("creator");
        return res.json(newcourse);
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            
            message:"Failed to fetch courses"
        })
    }
}

export const updatecourse = async(req,res)=>{
    try{
        const {courseTitle, category}=req.body;
        if(!courseTitle||!category){
            return res.status(400).json({
                message:"Course title and category are required."
            })
        }
        const course =await Course.findByIdAndUpdate(req.params.id,{
            courseTitle,
            category
        },{new:true});
        return res.json({
            course,
            message:"Course updated"
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Failed to update course"
        })
    }
}

export const deletecourse=async(req,res)=>{
    try{
        const course =await Course.findByIdAndDelete(req.params.id);
        return res.json({
            course,
            message:"Course deleted"
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Failed to delete course"
        })
    }
}

