import React from 'react'
import { assets , specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-slate-900'>
      <h1 className='text-3xl md:text-4xl font-bold'>Find by Speciality</h1>
      <p className='sm:w-2/3 text-center text-slate-600 max-w-2xl'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>

      <div className='flex sm:justify-center gap-3 sm:gap-4 pt-8 w-full overflow-x-auto px-4 sm:px-0 pb-2'>
        {
          specialityData.map((item) => (
            <Link key={item.speciality} to={`/doctors/${item.speciality}`} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 group' onClick={() => scrollTo(0, 0)}>
              <div className='w-16 sm:w-24 rounded-full flex items-center justify-center mb-3 transition-all duration-300 group-hover:-translate-y-2'>
                <img src={item.image} alt={item.speciality} className='w-16 sm:w-20 drop-shadow-md group-hover:drop-shadow-lg' />
              </div>
              <p className='font-medium text-center text-slate-700 group-hover:text-primary transition-colors'>{item.speciality}</p>
            </Link>
          ))
        }
      </div>
      
    </div>
  )
}

export default SpecialityMenu

