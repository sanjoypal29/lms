import Course from '../models/Course.js'
import User from '../models/User.js';

//Get All Courses
export const getAllCourse=async (req,res)=>{
    try{
   const courses=await Course.find({ispublished:true}).select(['-courseContent','-erolledStudents']).populate({path:'educator'})

   res.json({success:true,courses});
    }catch(error){
       res.json({success:false,message:error.message});

    }
}

//Get course by Id
export const getCourseId=async(req,res)=>{
try{
    const {id}=req.params;
    const course=await Course.findById(id).populate({path:'educator'});
    //Remove lectureUrl if isPreview is false
    courseData.courseContent.forEach(chapter=>{
        chapter.chapterContent.forEach(lecture=>{
            if(!lecture.isPreviewFree){
                lecture.lectureUrl="";
            }
        })
    })
    res.json({success:true,course});
}catch(error){
    res.json({success:false,message:error.message});
 } 
}

