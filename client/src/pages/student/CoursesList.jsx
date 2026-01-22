import React, { useState, useContext, useEffect } from 'react'
import AppContext from '../../context/AppContext';
import SearchBar from '../../components/student/SearchBar';
import CourseCard from '../../components/student/CourseCard';
import { useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import Footer from '../../components/student/Footer';

const CoursesList = () => {
  const  {navigate,allCourses}=useContext(AppContext);
  const [flitercourses,setfiltercourses]=useState([]);
  const {input}=useParams();
   useEffect(()=>{
    if(allCourses && allCourses.length>0){
      const tempCourses=allCourses.slice();

      const data=input ? tempCourses.filter((course)=>
        course.courseTitle.toLowerCase().includes(input.toLowerCase())
       
      ) :tempCourses;

      setfiltercourses(data);
      
    }
  },[allCourses,input]);

  return (
    <>
    <div className='py-16 md:px-40 px-8'>
      <div className='flex justify-between mt-3 px-4 sm:px-10 md:px-14'>
      <div>
      <h1>Courses List</h1>
      <p><span onClick={()=>navigate('/')}>Home</span>/<span>CourseList</span></p>
      </div>

     <SearchBar data={input}/>
     </div>
     {input && <div className='inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-600 '>
      <p>{input}</p>
      <img src={assets.cross_icon} alt="cross" className='cursor-pointer' onClick={()=>navigate('course-list')} />
     </div> }
     <div className='grid grid-cols-4 px-4 md:px-14 md:my-16 my-10 gap-4'>
        {flitercourses.map((course,index)=>(<CourseCard key={index} course={course}/>))}
     </div>
      </div>
     <Footer/>
      </>

  )
}

export default CoursesList