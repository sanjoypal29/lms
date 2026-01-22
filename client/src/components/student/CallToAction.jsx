import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className='py-16 md:px-40 px-8'>
      <h1 className='text-3xl font-extrabold text-gray-800'>Learn anything,anytime,anywhere</h1>
      <p className='text-sm md:text-base text-gray-500 mt-3 mb-2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit.<br />Recusandae dolore porro odit nemo quaerat, velit iste. Laboriosam sequi repellendus libero?
        </p>
        <div className='flex  justify-center gap-3'>
          <button className='text-white bg-blue-600 py-2 px-4 rounded'>Get started</button>
          <button>Learn more </button>
          <img src={assets.arrow_icon} alt="arrow_icon"/>
        </div>
      </div>
  )
}

export default CallToAction