import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-black w-full text-white'>
      <div className='py-16 md:px-40 px-8 text-center '>
        <div className='flex md:flex-row flex-col gap-6 md:gap-0 justify-around text-left'>
          <div className='flex flex-col gap-4 justify-around'>
            <img src={assets.logo_dark} alt="logo" className='w-28 lg:w-32 cursor-pointer'/>
            <p className='text-white'>Lorem, ipsum dolor sit amet consectetur adipisicing elit.<br/> Aperiam architecto vitae animi at quisquam eaque <br/>
            accusantium dolorum totam sunt sequi?</p>
          </div>
          <div className='flex flex-col gap-4 justify-around' >
            <h4>Company</h4>
            <div className='flex flex-col gap-1 text-white'>
              <Link to="/">Home</Link>
               <Link to="/">About Us</Link>
                <Link to="/">Contact us</Link>
                 <Link to="/">privacy policy</Link>
            </div>
          </div>
          <div className='flex flex-col gap-4 justify-around'>
             <h4>Subscribe to our newsletter</h4>
             <p className='text-white'>The latest news,articles,and resources, sent to <br/> your inbox weekly.</p>
              <div className='flex gap-x-2 mb-2'>
           <input type="text" placeholder='Enter your email' className=' px-4 py-2 rounded  bg-gray-500'/>
          <button  className='text-white bg-blue-600 py-0.5 px-4 rounded border border-amber-50 '>Subscribe</button>
               </div>
          </div>
        </div>
       <hr className='mt-4'/>
          <p className='text-white mt-4'>Copyright 2025  &copy; Edemy.All Right Reserved.</p>
      </div>

    </div>
  )
}

export default Footer