import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
const Navbar = () => {

  const navigate = useNavigate();

  const [showMenu , setShowMenu] = useState(false);
  const [token , setToken] = useState(true); // when we have token we are logged in

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 '>
      <img src={assets.logo} alt="main-logo" className='w-44 cursor-pointer' />
      <ul className='hiddden md:flex items-start gap-5 font-medium'>
        <NavLink to='/'>
          <li className='py-1'>HOME</li>
          <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/doctors'>
          <li className='py-1'>ALL DOCTORS</li>
          <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/about'>
          <li className='py-1'>ABOUT</li>
          <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/contact'>
          <li className='py-1'>CONTACT</li>
          <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-4' >
        {
          token ? 
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img src= {assets.profile_pic} alt="profile-pic" className='rounded-full w-8'/>
            <img src= {assets.dropdown_icon} alt="dropdoen-icon"  className='w-2.5'/>

            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 className = "hover:text-black cursor-pointer"'>
                <p className = "hover:text-black cursor-pointer" onClick={()=> navigate("/my-profile")}>My Profile</p>
                <p className = "hover:text-black cursor-pointer" onClick={()=> navigate("/my-appointments")}>My Appointments</p>
                <p className = "hover:text-black cursor-pointer" onClick={()=> setToken(false)}>Log out</p>
              </div>
            </div>

          </div>
          :
          <button className='bg-[#5f6FFF] text-white px-8 py-3 rounded-full font-medium hidden md:block cursor-pointer' onClick={() => navigate('/login')}>CREATE ACCOUNT</button>
        }
        
      </div>

    </div>
  )
}

export default Navbar
