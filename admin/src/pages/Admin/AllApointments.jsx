import React, { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {

  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='max-w-6xl m-5'>

      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border border-gray-100 shadow-sm rounded-2xl text-sm max-h-[80vh] overflow-y-scroll min-h-[60vh]'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-4 px-6 bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold uppercase text-xs tracking-wider'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div key={index}>
            {/* Desktop View Row */}
            <div className='hidden sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-600 py-4 px-6 border-b border-gray-100 hover:bg-teal-50 transition-all duration-200'>
              <p className='font-medium text-gray-500'>{index + 1}</p>
              <div className='flex items-center gap-3'>
                <img src={item.userData.image} className='w-9 h-9 rounded-full object-cover ring-2 ring-gray-100' alt="" /> <p className='font-medium'>{item.userData.name}</p>
              </div>
              <p>{calculateAge(item.userData.dob)}</p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <div className='flex items-center gap-3'>
                <img src={item.docData.image} className='w-9 h-9 rounded-full object-cover bg-teal-100 ring-2 ring-teal-50' alt="" /> <p className='font-medium'>{item.docData.name}</p>
              </div>
              <p className='font-semibold text-primary'>{currency}{item.amount}</p>
              {item.cancelled ? <p className='bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold inline-block text-center'>Cancelled</p> : item.isCompleted ? <p className='bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold inline-block text-center'>Completed</p> : <img onClick={() => cancelAppointment(item._id)} className='w-8 cursor-pointer hover:scale-110 transition-transform' src={assets.cancel_icon} alt="cancel" />}
            </div>

            {/* Mobile View Card */}
            <div className='sm:hidden flex flex-col gap-3 p-4 border-b hover:bg-gray-50 text-gray-600'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <img src={item.userData.image} className='w-8 rounded-full' alt="" />
                  <p className='font-semibold text-gray-800'>{item.userData.name}</p>
                </div>
                <div>
                  {item.cancelled ? (
                    <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                  ) : item.isCompleted ? (
                    <p className='text-green-500 text-xs font-medium'>Completed</p>
                  ) : (
                    <img onClick={() => cancelAppointment(item._id)} className='w-8 cursor-pointer' src={assets.cancel_icon} alt="" />
                  )}
                </div>
              </div>
              <div className='text-xs flex flex-col gap-1.5 text-gray-500'>
                <p><span className='font-medium text-gray-700'>Date & Time:</span> {slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                <p><span className='font-medium text-gray-700'>Doctor:</span> {item.docData.name}</p>
                <div className='flex items-center justify-between mt-1'>
                  <p><span className='font-medium text-gray-700'>Fees:</span> {currency}{item.amount}</p>
                  <p><span className='font-medium text-gray-700'>Age:</span> {calculateAge(item.userData.dob)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default AllAppointments