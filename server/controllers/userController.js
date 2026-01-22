import User from "../models/User";
import Course from "../models/Course.js";
import Purchase from "../models/Purches.js";
import Stripe from "stripe";
//Get user data
export const getUserData=async (req,res)=>{
    try{
        const userId=req.auth.userId;
        const user=await User.findById(userId);

        if(!user){
            return res.json({success:false,message:"User not found"});
        }
        res.json({success:true,user});
    }catch(error){
        res.json({success:false,message:error.message});
   }
}

//Users Enrolled Courses with Lecture links
export const userEnrolledCourses=async (req,res)=>{
    try{
    const userId=req.auth.userId;
    const userData=await User.findById(userId).populate('enrolledCourses');
      res.json({success:true,userEnrolledCoursesourses:userData.enrolledCourses});
    }catch(error){
       res.json({success:false,message:error.message});
    }
}

//purchase Course
export const purchaseCourse=async(req,res)=>{
try{
    const {courseId}=req.body;
    const{origin}=req.headers;

    const userId=req.auth.userId;

    const userData=await User.findById(userId);
    const courseData=await Course.findById(courseId);

    if(!userData||!courseData){
        return res.json({success:false,message:"data not found"});
    }

    const purchaseData={
        courseId:courseData._id,
        userId,
        amount:(courseData.coursePrice-courseData.discount*courseData.coursePrice/100).toFixed(2),

    }

    const newPurchase=await Purchase.create(purchaseData);

    //Stripe Gateway Initialization

    const stripeInstance= new Stripe(process.env.STRIPE_SECRET_KEY);
    const currency=process.env.currency.toLocaleLowerCase();

    //Creating line items for Stripe

    const line_items=[{
  price_data:{
    currency,
    product_data:{
        name:courseData.courseTitle
    },
    unit_amount:Math.floor(newPurchase.amount)*100,
  },
  quantity:1
    }]
const session=await stripeInstance.checkout.sessions.create({
    success_url:`${origin}/loading/my-enrollments`,
    cancel_url:`${origin}/`,
    line_items:line_items,
    mode:'payment',
    metadata:{
        purchaseId:newPurchase._id.toString()
    }
})
res.json({success:true,sessionUrl:session.url});

}catch(error){
    res.json({success:false,message:error.message});
 }
 
}
//update User ProfileCourse Progress

export const updateUserCourseProgress=async(req,res)=>{
    try{
        const userId=req.auth.userId;
        const {courseId,lectureId}=req.body;
        const progressData=await CourseProgress.findOne({userId,courseId});
        if(progressData){
            if(progressData.lectureCompleted.includes(lectureId)){
                return res.json({success:true,message:"Lecture already marked as completed"});
        }
        progressData.lectureCompleted.push(lectureId);
        await progressData.save();
    }
    else{
        await CourseProgress.create({
            userId,
            courseId,
            lectureCompleted:[lectureId]
        })
    }
    res.json({success:true,message:"Course progress updated successfully"});
  }catch(error){
    res.json({success:false,message:error.message});
  }
}

//get User Course Progress
export const getUserCourseProgress =async(req,res)=>{
    try{
        const userId=req.auth.userId;
        const {courseId,lectureId}=req.body;
        const progressData=await CourseProgress.findOne({userId,courseId});
        res.json({success:true,progressData});
    }catch(error){
        res.json({success:false,message:error.message});
    }
}

//Add User Ratings to Course
export const addUserRating=async(req,res)=>{
    const userId=req.auth.userId;
    const {courseId,rating}=req.body;

    if(!courseId||!rating||rating<1||rating>5){
        return res.json({success:false,message:"Invalid data provided"});
    }

    try{
        const course=await Course.findById(courseId);
        if(!course){
            return res.json({success:false,message:"Course not found"});
        }

        const user =await User.findById(userId);
        if(!user||!user.enrolledCourses.includes(courseId)){
            return res.json({success:false,message:"User not enrolled in the course"});
        }

        const exsistingRatingIndex=course.courseRatings.findIndex(r=>r.userId===userId);
        if(exsistingRatingIndex>-1){
            course.courseRatings[exsistingRatingIndex].rating=rating
        }else{
            course.courseRatings.push({userId,rating});
        }
        await course.save();
        return res.json({success:true,message:"Rating added successfully"});

    }catch(error){
        return res.json({success:false,message:error.message});
    }
}