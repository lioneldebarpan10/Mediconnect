import React from 'react'
import { FaUserDoctor } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'

const Navbar = () => {

   return (

      <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]'>

         {/*Adding Mediconnect Logo */}
         <a href="#" style={{ display: 'flex', alignItems: 'center', fontSize: '1.2rem' }}>
            <FaUserDoctor style={{ marginRight: '8px' }} /> MediConnect
         </a>

         {/*Creating Navlinks */}
         <ul className='md:flex items-start gap-5 font-medium hidden'>

            <NavLink to='/'>
               <li className='py-1'>HOME</li>
               <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>

            <NavLink to='/doctors'>
               <li className='py-1'>ALL DOCTORS</li>
               <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink >

            <NavLink to='/about'>
               <li className='py-1'>ABOUT</li>
               <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>

            <NavLink to='/contact'>
               <li className='py-1'>CONTACT</li>
               <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>

         </ul>

         {/*Create account Button for Mediconnect */}

         <div className='flex items-center gap-4'>
            <button className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create Account</button>
            <img src="" alt="" className='w-6 md:hidden' />

            {/*Mobile Menu */}

            <div>
               <div>
                  <a href=""></a>
                  <img src="" alt="" />
               </div>

               <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                  <NavLink to='/'><p className='px-4 py-2 rounded full inline-block'>HOME</p></NavLink>
                  <NavLink to='/doctors'><p className='px-4 py-2 rounded full inline-block'>ALL DOCTORS</p></NavLink>
                  <NavLink to='/about'><p className='px-4 py-2 rounded full inline-block'>ABOUT</p></NavLink>
                  <NavLink to='contact'><p className='px-4 py-2 rounded full inline-block'>CONTACT</p></NavLink>
               </ul>
            </div>
         </div>
      </div>
   )
}

export default Navbar