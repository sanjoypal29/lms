import { createContext, use, useEffect, useState } from "react";
import { dummyCourses,dummyTestimonial} from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import {useAuth,useUser} from '@clerk/clerk-react';
import axios from "axios";
import { toast } from "react-toastify";
const AppContext = createContext();

export default AppContext;
export const AppContextProvider = (props)=>{
  const backendUrl=import.meta.env.VITE_BACKEND_URL;

    const navigate=useNavigate();
    const currency=import.meta.env.VITE_CURRENCY;
    const [allCourses,setAllCourses]=useState([]);
    const [enrolledCourses,setEnrolledCourses]=useState([]);
    const [testimonials,setTestimonials]=useState([]);
    const [userData,setUserData]=useState(null);

    const[isEducator,setIsEducator]=useState(false);
    const {getToken}=useAuth();
    const {user}=useUser();
    //Fetch all courses
    const fetchAllCourses=async()=>{
      try{
        const {data}=await axios.get(backendUrl+'/api/course/all');
        if(data.success){
          setAllCourses(data.courses);
        }
        else{
          toast.error(data.message);
        }
      }catch(error){
        toast.error(error.message);
      }
    }
    //Fetch User data
    const fetchUserData=async()=>{

      if(user.publicMetadata.role==='educator'){
        setIsEducator(true);
      }
      try{
        const token=await getToken();
        const {data}=await axios.get(backendUrl+'/api/user/data',{headers:{Authorization:`Bearer ${token}`}})
        if(data.success){
          setUserData(data.user);
        }else{
          toast.error(data.message);
        }
      }catch(error){
        toast.error(error.message);
      }
    }
 //Function to calculate average rating of course
 const calculateRating=(course)=>{
    if(course.courseRatings.length===0){
        return 0;
    }
    let totalRating=0;
    course.courseRatings.forEach((ratingObj)=>{
        totalRating+=ratingObj.rating;
    });
  return Math.floor(totalRating/course.courseRatings.length)
 }
 //Function to calculate Course Chapter Time
  const calculateChapterTime=(chapter)=>{
    let totalTime=0;
    chapter.chapterContent.map((lecture)=>totalTime+=lecture.lectureDuration)
    return humanizeDuration(totalTime*1000*60,{units:["h","m"]});
  }

  // Function to calculate course Duration
  const calculateCourseDuration=(course)=>{
    let totalDuration=0;
    course.courseContent.map((chapter)=>chapter.chapterContent.map((lecture)=>totalDuration+=lecture.lectureDuration));
    return humanizeDuration(totalDuration*1000*60,{units:["h","m"]});
  }

  //Function to calculate to No of lectures in the course
  const calculateNoOfLectures=(course)=>{
    let totalLectures=0;
    course.courseContent.map((chapter)=>totalLectures+=chapter.chapterContent.length);
    return totalLectures;
  }

  //Fetech User Enrolled Courses

  const fetchUserEnrolledCourses=async()=>{
    try{ const token=await getToken();
    const {data} =await axios.get(backendUrl+'/api/user/enrolled-courses',{headers:{Authorization:`Bearer ${token}`}})

    if(data.success){
      setEnrolledCourses(data.enrolledCourses.reverse());
    }else{
      toast.error(data.message);
    }
  } catch(error){
    toast.error(error.message);
  }

    useEffect(()=>{
        fetchAllCourses();
        
    },[])
       
    useEffect(()=>{
      if(user){
          fetchUserData();
          fetchUserEnrolledCourses();
      }
    },[user])
    const value={
        currency,allCourses,navigate,calculateRating,isEducator,setIsEducator,testimonials,calculateNoOfLectures,calculateCourseDuration,calculateChapterTime,enrolledCourses,backendUrl,userData,setUserData,getToken,fetchAllCourses
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
  
    )
 }
}
