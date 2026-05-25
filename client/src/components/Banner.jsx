import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <div className='rounded-[32px] border border-teal-100 bg-gradient-to-r from-[#0f766e] via-[#0a6b65] to-[#125f5b] px-6 py-10 shadow-2xl md:px-10 md:py-14 lg:px-14 my-20'>
      <div className='grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center'>
        <div className='space-y-6 text-white'>
          <p className='text-sm uppercase tracking-[0.35em] text-teal-200'>Smart healthcare</p>
          <h2 className='text-3xl font-semibold sm:text-4xl lg:text-5xl'>Book appointments with the fastest online care experience.</h2>
          <p className='text-sm sm:text-base text-teal-100 max-w-xl leading-7'>Save time on scheduling and access verified professionals from your phone or desktop. Your care path begins with a few simple clicks.</p>
          <button onClick={() => { navigate('/login'); scrollTo(0, 0) }} className='inline-flex items-center gap-3 rounded-full bg-white px-8 py-3 text-sm font-semibold text-primary shadow-lg shadow-white/20 transition hover:scale-[1.02]'>
            Create Account
          </button>
        </div>

        <div className='relative hidden md:block'>
          <div className='absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-2xl' />
          <img src={assets.appointment_img} alt='appointment highlight' className='relative mx-auto w-full max-w-md rounded-[36px] object-cover shadow-2xl' />
        </div>
      </div>
    </div>
  )
}

export default Banner
