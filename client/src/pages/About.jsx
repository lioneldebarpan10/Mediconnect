import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='page-container py-12'>
      <div className='max-w-6xl mx-auto space-y-12'>
        <div className='text-center'>
          <p className='text-sm uppercase tracking-[0.3em] text-primary'>About Us</p>
          <h1 className='section-heading mt-4'>Trusted healthcare booking for every family.</h1>
          <p className='section-copy mx-auto mt-4'>MediConnect connects you with verified doctors and makes appointment management simple, fast, and secure.</p>
        </div>

        <div className='grid gap-10 lg:grid-cols-[1fr_1fr] items-center'>
          <div className='section-card overflow-hidden shadow-xl'>
            <img src={assets.about_image} alt='About us' className='w-full object-cover' />
          </div>
          <div className='space-y-6'>
            <p className='text-xl font-semibold text-slate-900'>Welcome to <span className='text-primary'>MediConnect</span></p>
            <p className='text-slate-600 leading-relaxed'>We help you book the right specialist, manage appointments, and keep your medical journey on track with responsive support and a beautiful digital experience.</p>
            <div className='section-card rounded-[32px] border-teal-100 bg-teal-50 p-8'>
              <p className='text-lg font-semibold text-slate-900 mb-3'>Our Vision</p>
              <p className='text-slate-700 leading-relaxed'>To simplify trusted healthcare access for every community through intuitive online booking and verified medical professionals.</p>
            </div>
          </div>
        </div>

        <div className='grid gap-6 md:grid-cols-3'>
          {[
            { title: 'Fast booking', description: 'Book the next available specialist in just a few steps.' },
            { title: 'Verified doctors', description: 'We only list trusted practitioners with quality reviews.' },
            { title: 'Easy care', description: 'Manage appointments, reminders, and records from one place.' }
          ].map((item) => (
            <div key={item.title} className='section-card p-8 hover:shadow-xl transition'>
              <p className='text-base font-semibold text-slate-900'>{item.title}</p>
              <p className='mt-4 text-slate-600'>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About
