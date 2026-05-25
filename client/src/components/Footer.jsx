import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='page-container pt-16 pb-10'>
      <div className='section-card p-10 grid gap-10 md:grid-cols-[1.7fr_1fr_1fr]'>
        <div className='space-y-5'>
          <img src={assets.logo} alt='footer-logo' className='w-36' />
          <p className='text-slate-600 leading-7'>MediConnect makes it easy to find trusted doctors, book appointments, and stay on top of your health with a modern online experience.</p>
          <div className='flex gap-3 text-sm text-slate-500'>
            <span>+234 800 123 4567</span>
            <span>•</span>
            <span>support@mediconnect.com</span>
          </div>
        </div>

        <div className='space-y-5'>
          <p className='text-xl font-semibold text-slate-900'>Company</p>
          <div className='grid gap-3 text-slate-600'>
            <Link to='/' className='transition hover:text-primary'>Home</Link>
            <Link to='/about' className='transition hover:text-primary'>About</Link>
            <Link to='/contact' className='transition hover:text-primary'>Contact</Link>
            <Link to='/privacy-policy' className='transition hover:text-primary'>Privacy Policy</Link>
          </div>
        </div>

        <div className='space-y-5'>
          <p className='text-xl font-semibold text-slate-900'>Support</p>
          <div className='grid gap-3 text-slate-600'>
            <p>Customer Care</p>
            <p>FAQs</p>
            <p>Terms</p>
          </div>
        </div>
      </div>

      <div className='mt-8 border-t border-gray-200 pt-6 text-center text-sm text-slate-500'>
        © 2026 MediConnect. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
