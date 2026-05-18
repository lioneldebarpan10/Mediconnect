import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {

  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className='max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fee</p>
          <p>Action</p>
        </div>

        {
          appointments.reverse().map((item, index) => (
            <div key={index}>
              {/* Desktop View Row */}
              <div className='hidden sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'>
                <p>{index + 1}</p>
                <div className='flex items-center gap-2'>
                  <img src={item.userData.image} className='w-8 rounded-full' alt="" /> <p>{item.userData.name}</p>
                </div>
                <div>
                  <p className='text-xs inline border border-[#5f6FFF] px-2 py-0.5 rounded-full text-[#5f6FFF] font-medium bg-blue-50'>
                    {item.payment ? 'Online' : 'CASH'}
                  </p>
                </div>
                <p>{calculateAge(item.userData.dob)}</p>
                <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                <p>{currency}{item.amount}</p>
                {item.cancelled
                  ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                  : item.isCompleted
                    ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                    : <div className='flex gap-1'>
                      <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer hover:scale-105 transition-all' src={assets.cancel_icon} alt="cancel-icon" />
                      <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer hover:scale-105 transition-all' src={assets.tick_icon} alt="tick-icon" />
                    </div>
                }
              </div>

              {/* Mobile View Card */}
              <div className='sm:hidden flex flex-col gap-3 p-4 border-b hover:bg-gray-50 text-gray-600'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <img src={item.userData.image} className='w-8 rounded-full' alt="" />
                    <p className='font-semibold text-gray-800'>{item.userData.name}</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <p className='text-[10px] inline border border-[#5f6FFF] px-2 py-0.5 rounded-full text-[#5f6FFF] font-medium bg-blue-50'>
                      {item.payment ? 'Online' : 'CASH'}
                    </p>
                    {item.cancelled
                      ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                      : item.isCompleted
                        ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                        : <div className='flex items-center gap-1'>
                          <img onClick={() => cancelAppointment(item._id)} className='w-8 cursor-pointer hover:scale-105 transition-all' src={assets.cancel_icon} alt="cancel-icon" />
                          <img onClick={() => completeAppointment(item._id)} className='w-8 cursor-pointer hover:scale-105 transition-all' src={assets.tick_icon} alt="tick-icon" />
                        </div>
                    }
                  </div>
                </div>
                <div className='text-xs flex flex-col gap-1.5 text-gray-500'>
                  <p><span className='font-medium text-gray-700'>Date & Time:</span> {slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                  <div className='flex items-center justify-between mt-1'>
                    <p><span className='font-medium text-gray-700'>Fee:</span> {currency}{item.amount}</p>
                    <p><span className='font-medium text-gray-700'>Age:</span> {calculateAge(item.userData.dob)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default DoctorAppointments
