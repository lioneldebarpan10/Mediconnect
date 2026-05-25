import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center rounded-[36px] bg-gradient-to-r from-primary to-teal-600 px-6 py-12 text-white shadow-xl md:px-12 lg:px-20'>
      <div className='space-y-8'>
        <div className='max-w-2xl'>
          <p className='text-sm uppercase tracking-[0.35em] text-teal-200'>Trusted care, faster booking</p>
          <h1 className='text-4xl font-semibold leading-tight sm:text-5xl'>Book appointments with top doctors in seconds.</h1>
          <p className='mt-6 text-base leading-8 text-teal-100'>Find verified specialists, compare ratings, and reserve the best available slot for your needs — all from one modern healthcare platform.</p>
        </div>

        <div className='grid gap-4 sm:grid-cols-2'>
          <div className='rounded-[32px] bg-white/10 p-6'>
            <p className='text-sm uppercase tracking-[0.3em] text-teal-200'>Quick search</p>
            <p className='mt-3 text-lg font-semibold'>Browse specialists by category.</p>
          </div>
          <div className='rounded-[32px] bg-white/10 p-6'>
            <p className='text-sm uppercase tracking-[0.3em] text-teal-200'>Verified care</p>
            <p className='mt-3 text-lg font-semibold'>Trusted doctors with strong patient reviews.</p>
          </div>
        </div>

        <a href='#speciality' className='inline-flex items-center gap-3 rounded-full bg-white px-8 py-3 text-sm font-semibold text-primary shadow-lg shadow-teal-500/20 transition hover:scale-[1.02]'>
          Book Appointment
          <img src={assets.arrow_icon} alt='arrow-icon' className='w-4' />
        </a>
      </div>

      <div className='relative overflow-hidden rounded-[36px] bg-white/10 p-4 shadow-2xl ring-1 ring-white/20'>
        <div className='absolute -right-16 -top-16 h-32 w-32 rounded-full bg-white/10 blur-3xl' />
        <img src={assets.header_img} alt='Header illustration' className='relative w-full rounded-[28px] object-cover' />
      </div>
    </div>
  )
}

export default Header