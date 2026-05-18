import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {

   const { aToken, setAToken } = useContext(AdminContext)
   const { dToken , setDToken } = useContext(DoctorContext)
   const navigate = useNavigate();
   const logout = () => {
      navigate('/')
      dToken && setDToken('')
      dToken && localStorage.removeItem('dToken')
      aToken && setAToken('')
      aToken && localStorage.removeItem('aToken')
   }

   return (
      <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
         <div className='flex items-center gap-3 text-xs'>
            <img src={assets.admin_logo} alt="admin-logo" className='w-36 sm:w-40 cursor-pointer' />
            <p className='border px-3 py-1 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin' : 'Doctor'}</p>
         </div>
         <button className='bg-[#5f6FFF] text-white text-sm px-10 py-2 rounded-full hover:bg-blue-700 transition cursor-pointer' onClick={logout}>Log out</button>

      </div>
   )
}

export default Navbar
