import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const { aToken, setAToken } = useContext(AdminContext)
  const { dToken, setDToken } = useContext(DoctorContext)
  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    if (dToken) {
      setDToken('')
      localStorage.removeItem('dToken')
    }
    if (aToken) {
      setAToken('')
      localStorage.removeItem('aToken')
    }
  }

  return (
    <header className='sticky top-0 z-50 border-b border-gray-200 bg-white w-full'>
      <div className='flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-3 md:py-4'>
        <div className='flex items-center gap-3 md:gap-4 min-w-0 flex-1'>
          <button type='button' className='inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 md:hidden' onClick={() => setSidebarOpen(!sidebarOpen)} aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}>
            {sidebarOpen ? (
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-5 w-5'>
                <path fillRule='evenodd' d='M6.28 5.22a.75.75 0 011.06 0L12 9.94l4.66-4.72a.75.75 0 111.06 1.06L13.06 11l4.72 4.66a.75.75 0 11-1.06 1.06L12 12.06l-4.66 4.72a.75.75 0 11-1.06-1.06L10.94 11 6.22 6.28a.75.75 0 010-1.06z' clipRule='evenodd' />
              </svg>
            ) : (
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='h-5 w-5'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            )}
          </button>
          <img src={assets.admin_logo} alt='admin-logo' className='w-20 md:w-24 lg:w-28 cursor-pointer flex-shrink-0' onClick={() => navigate(aToken ? '/admin-dashboard' : '/doctor-dashboard')} />
          <div className='hidden md:flex flex-col min-w-0'>
            <p className='text-sm md:text-base lg:text-lg font-semibold text-slate-900 truncate'>{aToken ? 'Admin Portal' : 'Doctor Portal'}</p>
            <p className='text-xs md:text-sm text-slate-500 truncate'>Manage appointments and doctor workflows with ease.</p>
          </div>
        </div>

        <div className='flex items-center gap-2 md:gap-3 flex-shrink-0'>
          <span className='hidden sm:inline-flex items-center rounded-full bg-slate-100 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-semibold text-slate-700 flex-shrink-0'>
            {aToken ? 'Admin Access' : 'Doctor Access'}
          </span>
          <button className='btn-secondary text-xs md:text-sm px-3 md:px-6 py-2 md:py-3 flex-shrink-0' onClick={logout}>Log out</button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
