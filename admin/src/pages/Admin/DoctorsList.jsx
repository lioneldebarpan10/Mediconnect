import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const { doctors, getAllDoctors, aToken , changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg  font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctors.map((item, index) => (
            <div key={index} className='bg-white border border-gray-100 shadow-sm hover:shadow-lg rounded-2xl max-w-56 overflow-hidden cursor-pointer group hover:-translate-y-2 transition-all duration-300'>
              <img src={item.image} alt='doctor-img' className='block w-full h-56 object-cover bg-teal-50 group-hover:bg-primary transition-colors duration-500'/>
              <div className='p-5'>
                <p className='text-gray-900 font-semibold text-lg'>{item.name}</p>
                <p className='text-gray-500 text-sm mt-1'>{item.speciality}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input type="checkbox" checked={item.available} onChange={() => changeAvailability(item._id)}/>
                  <p>Available</p>
                </div>
              </div>
            </div>

          ))
        }
      </div>

    </div>
  )
}

export default DoctorsList
