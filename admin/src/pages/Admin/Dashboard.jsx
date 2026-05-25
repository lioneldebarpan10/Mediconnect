import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className='p-4 md:p-6'>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
        <div className='bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-5 md:p-6 border border-primary/20 shadow-sm hover:shadow-md transition-all'>
          <div className='flex items-center gap-4'>
            <img className='w-14' src={assets.doctor_icon} alt="Doctors" />
            <div>
              <p className='text-sm font-medium text-slate-500'>Total Doctors</p>
              <p className='text-3xl font-bold text-slate-900 mt-2'>{dashData.doctors}</p>
            </div>
          </div>
        </div>

        <div className='bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-5 md:p-6 border border-blue-200 shadow-sm hover:shadow-md transition-all'>
          <div className='flex items-center gap-4'>
            <img className='w-14' src={assets.appointments_icon} alt="Appointments" />
            <div>
              <p className='text-sm font-medium text-slate-500'>Appointments</p>
              <p className='text-3xl font-bold text-blue-600 mt-2'>{dashData.appointments}</p>
            </div>
          </div>
        </div>

        <div className='bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl p-5 md:p-6 border border-emerald-200 shadow-sm hover:shadow-md transition-all'>
          <div className='flex items-center gap-4'>
            <img className='w-14' src={assets.patients_icon} alt="Patients" />
            <div>
              <p className='text-sm font-medium text-slate-500'>Patients</p>
              <p className='text-3xl font-bold text-emerald-700 mt-2'>{dashData.patients}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-white rounded-3xl shadow-sm border border-gray-200 mt-8 overflow-hidden'>
        <div className='flex items-center gap-3 px-6 py-5 border-b border-gray-200'>
          <img src={assets.list_icon} alt="Latest bookings" className='w-5 h-5' />
          <p className='text-lg font-semibold text-slate-900'>Latest Bookings</p>
        </div>

        <div className='divide-y divide-gray-100'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50 transition-colors' key={index}>
              <div className='flex items-center gap-4'>
                <img className='rounded-full w-12 h-12 object-cover' src={item.docData.image} alt={item.docData.name} />
                <div>
                  <p className='text-slate-900 font-semibold'>{item.docData.name}</p>
                  <p className='text-sm text-slate-500'>Booking on {slotDateFormat(item.slotDate)}</p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                {item.cancelled ? (
                  <span className='text-red-500 bg-red-50 px-3 py-1 rounded-full text-xs font-semibold'>Cancelled</span>
                ) : item.isCompleted ? (
                  <span className='text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full text-xs font-semibold'>Completed</span>
                ) : (
                  <button onClick={() => cancelAppointment(item._id)} className='px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100 transition'>Cancel</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Dashboard