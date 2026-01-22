import React from 'react'
import { useContext } from 'react';
import  AppContext  from '../../context/AppContext';
import TestimonialCard from './TestimonialCard';
const TestimonialsSection = () => {
      const {testimonials}=useContext(AppContext);
  return (
    <div className='py-16 md:px-40 px-8'>
      <h2 className='text-3xl font-medium text-gray-800'>Testimonials</h2>
      <p className='text-sm md:text-base text-gray-500 mt-3 mb-2'>Hear from our learners as they share their journeys of transformation,success,and how our <br/>platform has made a difference in there lives</p>
      
    <div className='grid grid-cols-3 px-2 md:px-0 md:my-12 my-7 gap-3'>
        {testimonials.map((testimonial,index)=>(<TestimonialCard key={index} testimonial={testimonial}/>))}
    </div>
    </div>
    
  )
}

export default TestimonialsSection