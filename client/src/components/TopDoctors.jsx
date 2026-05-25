import React, { useContext } from 'react'
import {AppContext} from '../context/AppContext'

import { useNavigate } from 'react-router-dom'

const TopDoctors = () => {
  const navigate = useNavigate();
  const {doctors} = useContext(AppContext);
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-slate-900'>
      <h1 className='text-3xl md:text-4xl font-bold'>Top Doctors to Book</h1>
      <p className='sm:w-2/3 text-center text-slate-600 max-w-2xl'>Simply browse through our extensive list of trusted doctors.</p>

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8 px-4 sm:px-0'>
        {doctors.slice(0 , 10).map((item , index) => (
            <div key={index} className='group bg-white rounded-2xl overflow-hidden border border-primary/10 hover:border-primary/30 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer' onClick={() => navigate(`/appointment/${item._id}`)}>
              <div className='relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 h-48 sm:h-56'>
                <img src={item.image} alt='doctor-image' className='block w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' />
              </div>
              <div className='p-4 sm:p-5'>
                <div className='flex items-center gap-2 mb-3'>
                  <div className='w-2 h-2 rounded-full bg-green-500'></div>
                  <p className='text-xs font-semibold text-green-600'>Available</p>
                </div>
                <p className='text-slate-900 text-lg font-bold line-clamp-1'>{item.name}</p>
                <p className='text-primary text-sm font-medium mt-1'>{item.speciality}</p>
              </div>
            </div>
          ))
        }
      </div>
      <button className='mt-8 px-8 sm:px-12 py-3 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold transition-all hover:shadow-lg' onClick={() => {navigate("/doctors"); scrollTo(0,0) }}>View All Doctors</button>  
    </div>
  )
}

export default TopDoctors
