import React, { useState, useContext, useRef, useEffect } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)
  const { token, setToken, userData } = useContext(AppContext)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
    navigate('/')
    setShowDropdown(false)
  }

  return (
    <header className='sticky top-0 z-50 border-b border-gray-200 bg-white'>
      <div className='page-container flex items-center justify-between gap-4 py-4'>
        <div className='flex items-center gap-3'>
          <img src={assets.logo} alt='main-logo' className='w-36 cursor-pointer' onClick={() => navigate('/')} />
        </div>

        <nav className='hidden md:flex flex-1 justify-center items-center gap-8 text-sm font-semibold text-slate-700'>
          <NavLink to='/' className={({ isActive }) => isActive ? 'text-primary' : 'hover:text-primary'}>HOME</NavLink>
          <NavLink to='/doctors' className={({ isActive }) => isActive ? 'text-primary' : 'hover:text-primary'}>ALL DOCTORS</NavLink>
          <NavLink to='/about' className={({ isActive }) => isActive ? 'text-primary' : 'hover:text-primary'}>ABOUT</NavLink>
          <NavLink to='/contact' className={({ isActive }) => isActive ? 'text-primary' : 'hover:text-primary'}>CONTACT</NavLink>
        </nav>

        <div className='flex items-center gap-3'>
          {token && userData ? (
            <div ref={dropdownRef} className='relative'>
              <button onClick={() => setShowDropdown((prev) => !prev)} className='flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:shadow-md'>
                <img src={userData.image} alt='profile-pic' className='h-8 w-8 rounded-full object-cover' />
                <span>Account</span>
              </button>
              {showDropdown && (
                <div className='absolute right-0 top-full mt-3 w-52 rounded-3xl border border-gray-200 bg-white p-4 shadow-xl'>
                  <button onClick={() => { navigate('/my-profile'); setShowDropdown(false) }} className='w-full text-left px-3 py-2 rounded-2xl hover:bg-gray-50'>My Profile</button>
                  <button onClick={() => { navigate('/my-appointments'); setShowDropdown(false) }} className='w-full text-left px-3 py-2 rounded-2xl hover:bg-gray-50'>My Appointments</button>
                  <button onClick={logout} className='w-full text-left px-3 py-2 rounded-2xl hover:bg-gray-50 text-red-600'>Log out</button>
                </div>
              )}
            </div>
          ) : (
            <button className='btn-primary hidden md:inline-flex' onClick={() => navigate('/login')}>Create Account</button>
          )}

          <button className='md:hidden rounded-full border border-gray-200 bg-white p-2 shadow-sm' onClick={() => setShowMenu(true)}>
            <img src={assets.menu_icon} alt='menu-icon' className='w-5' />
          </button>
        </div>
      </div>

      <div className={`${showMenu ? 'fixed inset-0 z-50 bg-white p-6' : 'hidden'} md:hidden`}>
        <div className='flex items-center justify-between'>
          <img src={assets.logo} alt='logo' className='w-36' />
          <button onClick={() => setShowMenu(false)} className='rounded-full border border-gray-200 p-2 shadow-sm'>
            <img src={assets.cross_icon} alt='close-menu' className='w-5' />
          </button>
        </div>
        <div className='mt-10 flex flex-col gap-4'>
          <NavLink onClick={() => setShowMenu(false)} to='/' className='rounded-2xl px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-100'>Home</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/doctors' className='rounded-2xl px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-100'>All Doctors</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/about' className='rounded-2xl px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-100'>About</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/contact' className='rounded-2xl px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-100'>Contact</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/privacy-policy' className='rounded-2xl px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-100'>Privacy Policy</NavLink>
          {token && userData ? (
            <>
              <button onClick={() => { setShowMenu(false); navigate('/my-profile') }} className='rounded-2xl border border-gray-200 px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-100'>My Profile</button>
              <button onClick={() => { setShowMenu(false); navigate('/my-appointments') }} className='rounded-2xl border border-gray-200 px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-100'>My Appointments</button>
              <button onClick={() => { setShowMenu(false); logout() }} className='btn-primary w-full text-center'>Logout</button>
            </>
          ) : (
            <button onClick={() => { setShowMenu(false); navigate('/login') }} className='btn-primary w-full text-center'>Create Account</button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
