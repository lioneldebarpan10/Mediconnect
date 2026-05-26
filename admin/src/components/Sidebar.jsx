import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 md:hidden ${sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setSidebarOpen(false)}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] transform bg-white border-r shadow-xl transition-transform duration-300 md:static md:translate-x-0 md:h-auto lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className='flex items-center justify-between border-b border-gray-100 px-4 py-4 md:hidden'>
          <img src={assets.admin_logo} alt='logo' className='h-10 w-auto' />
          <button
            type='button'
            className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100'
            onClick={() => setSidebarOpen(false)}
            aria-label='Close sidebar'
          >
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-5 w-5'>
              <path
                fillRule='evenodd'
                d='M6.28 5.22a.75.75 0 011.06 0L12 9.94l4.66-4.72a.75.75 0 111.06 1.06L13.06 11l4.72 4.66a.75.75 0 11-1.06 1.06L12 12.06l-4.66 4.72a.75.75 0 11-1.06-1.06L10.94 11 6.22 6.28a.75.75 0 010-1.06z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>

        <div className='h-full overflow-y-auto py-4'>
          {aToken && (
            <ul className='text-slate-600 space-y-1'>
              <NavLink
                to={'/admin-dashboard'}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `flex items-center gap-3 py-3 px-4 md:px-6 cursor-pointer rounded-lg transition-all duration-200 ${isActive ? 'bg-primary/10 text-primary border-l-4 border-primary font-semibold' : 'hover:bg-slate-100'}`}
              >
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
                </svg>
                <p className='md:block font-medium'>Dashboard</p>
              </NavLink>
              <NavLink
                to={'/all-appointments'}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `flex items-center gap-3 py-3 px-4 md:px-6 cursor-pointer rounded-lg transition-all duration-200 ${isActive ? 'bg-primary/10 text-primary border-l-4 border-primary font-semibold' : 'hover:bg-slate-100'}`}
              >
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M3 4a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V4zm12 12H5V4h10v12z' clipRule='evenodd' />
                </svg>
                <p className='md:block font-medium'>Appointments</p>
              </NavLink>
              <NavLink
                to={'/add-doctor'}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `flex items-center gap-3 py-3 px-4 md:px-6 cursor-pointer rounded-lg transition-all duration-200 ${isActive ? 'bg-primary/10 text-primary border-l-4 border-primary font-semibold' : 'hover:bg-slate-100'}`}
              >
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z' clipRule='evenodd' />
                </svg>
                <p className='md:block font-medium'>Add Doctors</p>
              </NavLink>
              <NavLink
                to={'/doctor-list'}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `flex items-center gap-3 py-3 px-4 md:px-6 cursor-pointer rounded-lg transition-all duration-200 ${isActive ? 'bg-primary/10 text-primary border-l-4 border-primary font-semibold' : 'hover:bg-slate-100'}`}
              >
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v-2h8v2zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-2a4 4 0 00-8 0v2a2 2 0 012 2h4a2 2 0 012-2z' />
                </svg>
                <p className='md:block font-medium'>Doctors List</p>
              </NavLink>
            </ul>
          )}

          {dToken && (
            <ul className='text-slate-600 space-y-1'>
              <NavLink
                to={'/doctor-dashboard'}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `flex items-center gap-3 py-3 px-4 md:px-6 cursor-pointer rounded-lg transition-all duration-200 ${isActive ? 'bg-primary/10 text-primary border-l-4 border-primary font-semibold' : 'hover:bg-slate-100'}`}
              >
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
                </svg>
                <p className='md:block font-medium'>Dashboard</p>
              </NavLink>
              <NavLink
                to={'/doctor-appointments'}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `flex items-center gap-3 py-3 px-4 md:px-6 cursor-pointer rounded-lg transition-all duration-200 ${isActive ? 'bg-primary/10 text-primary border-l-4 border-primary font-semibold' : 'hover:bg-slate-100'}`}
              >
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M3 4a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V4zm12 12H5V4h10v12z' clipRule='evenodd' />
                </svg>
                <p className='md:block font-medium'>Appointments</p>
              </NavLink>
              <NavLink
                to={'/doctor-profile'}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `flex items-center gap-3 py-3 px-4 md:px-6 cursor-pointer rounded-lg transition-all duration-200 ${isActive ? 'bg-primary/10 text-primary border-l-4 border-primary font-semibold' : 'hover:bg-slate-100'}`}
              >
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' clipRule='evenodd' />
                </svg>
                <p className='md:block font-medium'>Profile</p>
              </NavLink>
            </ul>
          )}
        </div>
      </aside>
    </>
  )
}

export default Sidebar
