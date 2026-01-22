import React, { use } from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
const TestimonialCard = ({ testimonial}) => {


  return (
    <div className='border border-gray-500/30 pb-6 overflow-hidden rounded-lg flex flex-col gap-3'>
      <div className='flex items-center gap-2 px-4 py-2 bg-gray-100'>
        <img src={testimonial.image} alt={testimonial.name} className='h-12 w-12 rounded-full ' />
        <div className='flex flex-col gap-1'>
            <div><h4>{testimonial.name}</h4></div>
            <p>{testimonial.role}</p>
        </div>
      </div>
        <div className='px-3 text-left'>
     <div className='flex my-0.5'>
                 {[...Array(5)].map((_,i)=>(<img
                   key={i} src={i<testimonial.rating ? assets.star:assets.star_blank} alt='' className='w-3.5 h-3.5'/>
                 ))}
       </div>
     
    <div>
        <p className='text-base my-0.5'>{testimonial.feedback}</p>
    </div>
    <div>
      <a href="#" className='text-blue-500 underline'>Read more</a>
    </div>
    </div>
    </div>
  )
}

export default TestimonialCard