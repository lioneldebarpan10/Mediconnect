import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {
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
    <header className='sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm'>
      <div className='page-container flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between'>
        <div className='flex items-center gap-3'>
          <img src={assets.admin_logo} alt='admin-logo' className='w-28 cursor-pointer' onClick={() => navigate(aToken ? '/admin-dashboard' : '/doctor-dashboard')} />
          <div className='hidden md:block'>
            <p className='text-lg font-semibold text-slate-900'>{aToken ? 'Admin Portal' : 'Doctor Portal'}</p>
            <p className='text-sm text-slate-500'>Manage appointments and doctor workflows with ease.</p>
          </div>
        </div>

        <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
          <span className='inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700'>
            {aToken ? 'Admin Access' : 'Doctor Access'}
          </span>
          <button className='btn-secondary' onClick={logout}>Log out</button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
