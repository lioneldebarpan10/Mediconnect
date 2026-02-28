import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
const Navbar = () => {

  const navigate = useNavigate();

  const [showMenu , setShowMenu] = useState(false);
  const [token , setToken] = useState(true); // when we have token we are logged in

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 '>
      <img src={assets.logo} alt="main-logo" className='w-44 cursor-pointer' onClick={() => navigate("/")}/>
      <ul className='md:flex items-start gap-5 font-medium hidden'>
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

            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 group-hover:block hidden'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                <p className = "hover:text-black cursor-pointer" onClick={()=> navigate("/my-profile")}>My Profile</p>
                <p className = "hover:text-black cursor-pointer" onClick={()=> navigate("/my-appointments")}>My Appointments</p>
                <p className = "hover:text-black cursor-pointer" onClick={()=> setToken(false)}>Log out</p>
              </div>
            </div>

          </div>
          :
          <button className='bg-[#5f6FFF] text-white px-8 py-3 rounded-full font-medium hidden md:block cursor-pointer' onClick={() => navigate('/login')}>CREATE ACCOUNT</button>
        }
        <img src= {assets.menu_icon} alt="menu-icon" className='w-6 md:hidden' onClick={() => setShowMenu(true)}/>

        {/*Mobile Menu*/ }
        <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}> 
          <div className='flex items-center justify-between px-5 py-6'>
            <img src={assets.logo} alt="logo" className='w-36'/>
            <img src={assets.cross_icon} alt="cross-icon" onClick={() => setShowMenu(false)} className='w-7'/>
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink to= "/"  onClick={() => setShowMenu(false) } ><p className= "px-4 py-2 rounded inline-block">HOME</p></NavLink>
            <NavLink to = "/doctors" onClick={() => setShowMenu(false) }><p className= "px-4 py-2 rounded inline-block">ALL DOCTORS</p></NavLink>
            <NavLink to = "/about" onClick={() => setShowMenu(false) }><p className= "px-4 py-2 rounded inline-block">ABOUT </p></NavLink>
            <NavLink to = "/contact" onClick={() => setShowMenu(false) } ><p className= "px-4 py-2 rounded inline-block">CONTACT</p></NavLink>
          </ul>
        </div>
        
      </div>

    </div>
  )
}

export default Navbar
