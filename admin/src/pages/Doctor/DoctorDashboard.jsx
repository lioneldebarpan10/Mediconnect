import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {

  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment ,setDashData } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)


  useEffect(() => {

    if (dToken) {
      getDashData()
    }

  }, [dToken])

  return dashData && (
    <div className='p-4 md:p-6'>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
        <div className='bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-5 md:p-6 border border-primary/20 shadow-sm hover:shadow-md transition-all'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-slate-600 text-sm font-medium'>Total Earnings</p>
              <p className='text-2xl md:text-3xl font-bold text-primary mt-2'>{currency} {dashData.earnings}</p>
            </div>
            <div className='bg-primary/20 p-3 rounded-full'>
              <svg className='w-8 h-8 text-primary' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M8.16 2.75a.75.75 0 00-1.32.75l.25 1.5H4a.75.75 0 000 1.5h2.475l.5 3H4.75a.75.75 0 000 1.5h2.225l.25 1.5a.75.75 0 101.32.75l-.25-1.5h3.35l.25 1.5a.75.75 0 001.32-.75l-.25-1.5H16a.75.75 0 000-1.5h-2.475l-.5-3h2.225a.75.75 0 000-1.5h-2.225l-.25-1.5a.75.75 0 00-1.32-.75l.25 1.5H8.41l-.25-1.5zm3.34 5.25l.5 3h-3.35l-.5-3h3.35z' />
              </svg>
            </div>
          </div>
        </div>

        <div className='bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5 md:p-6 border border-blue-200 shadow-sm hover:shadow-md transition-all'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-slate-600 text-sm font-medium'>Appointments</p>
              <p className='text-2xl md:text-3xl font-bold text-blue-600 mt-2'>{dashData.appointments}</p>
            </div>
            <div className='bg-blue-200 p-3 rounded-full'>
              <svg className='w-8 h-8 text-blue-600' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M3 4a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V4zm12 12H5V4h10v12z' clipRule='evenodd' />
              </svg>
            </div>
          </div>
        </div>

        <div className='bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 md:p-6 border border-green-200 shadow-sm hover:shadow-md transition-all'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-slate-600 text-sm font-medium'>Total Patients</p>
              <p className='text-2xl md:text-3xl font-bold text-green-600 mt-2'>{dashData.patients}</p>
            </div>
            <div className='bg-green-200 p-3 rounded-full'>
              <svg className='w-8 h-8 text-green-600' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v-2h8v2zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-2a4 4 0 00-8 0v2a2 2 0 012 2h4a2 2 0 012-2z' />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-white rounded-2xl shadow-sm border border-gray-200 mt-8'>
        <div className='flex items-center gap-3 px-6 py-4 border-b border-gray-200'>
          <svg className='w-5 h-5 text-primary' fill='currentColor' viewBox='0 0 20 20'>
            <path d='M5 4a2 2 0 012-2h6a2 2 0 012 2v11a2 2 0 002 2h-2a2 2 0 002-2V4a2 2 0 00-2-2H7a2 2 0 00-2 2v11a2 2 0 002 2h2a2 2 0 00-2-2V4z' />
          </svg>
          <p className='font-semibold text-slate-900'>Latest Bookings</p>
        </div>

        <div className='divide-y divide-gray-100'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='flex items-center px-6 py-4 gap-4 hover:bg-slate-50 transition-colors' key={index}>
              <img className='rounded-full w-12 h-12 object-cover flex-shrink-0' src={item.userData.image} alt="" />
              <div className='flex-1 min-w-0'>
                <p className='text-slate-900 font-semibold'>{item.userData.name}</p>
                <p className='text-slate-500 text-sm'>Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled
                ? <p className='text-red-500 text-xs font-bold bg-red-50 px-3 py-1.5 rounded-full whitespace-nowrap'>Cancelled</p>
                : item.isCompleted
                  ? <p className='text-green-600 text-xs font-bold bg-green-50 px-3 py-1.5 rounded-full whitespace-nowrap'>Completed</p>
                  : <div className='flex gap-2 flex-shrink-0'>
                    <button onClick={() => cancelAppointment(item._id)} className='px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-xs font-medium'>
                      Cancel
                    </button>
                    <button onClick={() => completeAppointment(item._id)} className='px-3 py-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-xs font-medium'>
                      Complete
                    </button>
                  </div>
              }
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default DoctorDashboard