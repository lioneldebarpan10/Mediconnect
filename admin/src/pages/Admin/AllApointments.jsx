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

      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[60vh]'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
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
            <div className='hidden sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'>
              <p>{index + 1}</p>
              <div className='flex items-center gap-2'>
                <img src={item.userData.image} className='w-8 rounded-full' alt="" /> <p>{item.userData.name}</p>
              </div>
              <p>{calculateAge(item.userData.dob)}</p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <div className='flex items-center gap-2'>
                <img src={item.docData.image} className='w-8 rounded-full bg-gray-200' alt="" /> <p>{item.docData.name}</p>
              </div>
              <p>{currency}{item.amount}</p>
              {item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> : item.isCompleted ? <p className='text-green-500 text-xs font-medium'>Completed</p> : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />}
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