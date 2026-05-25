import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([])
  const { backendUrl, token, getDoctorsData, currency } = useContext(AppContext)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const slotDateFormat = (slotDate) => {
    const [day, month, year] = slotDate.split('_')
    return `${day} ${months[Number(month) - 1]} ${year}`
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, { headers: { token } })
      if (data.success) {
        setAppointments(data.appointments.reverse())
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(`${backendUrl}/api/user/verifyRazorpay`, response, { headers: { token } })
          if (data.success) {
            getUserAppointments()
          }
        } catch (error) {
          toast.error(error.message)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/payment-razorpay`, { appointmentId }, { headers: { token } })
      if (data.success) {
        initPay(data.order)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div className='page-container py-10'>
      <div className='max-w-6xl mx-auto space-y-6'>
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
          <div>
            <h1 className='section-heading'>My Appointments</h1>
            <p className='section-copy mt-2'>Keep track of upcoming appointments, payment status, and cancellations in one place.</p>
          </div>
        </div>

        {appointments.length === 0 ? (
          <div className='section-card p-8 text-center text-slate-600'>No appointments booked yet.</div>
        ) : (
          <div className='space-y-4'>
            {appointments.map((item, index) => (
              <div key={index} className='section-card p-6 sm:p-8'>
                <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                  <div className='flex items-center gap-4'>
                    <img src={item.docData.image} alt={item.docData.name} className='h-24 w-24 rounded-3xl object-cover bg-slate-100' />
                    <div>
                      <p className='text-lg font-semibold text-slate-900'>{item.docData.name}</p>
                      <p className='text-sm text-slate-600'>{item.docData.speciality}</p>
                      <p className='text-sm text-slate-500 mt-2'>{slotDateFormat(item.slotDate)} | {item.slotTime}</p>
                    </div>
                  </div>
                  <div className='flex flex-col sm:items-end gap-3'>
                    {item.cancelled ? (
                      <span className='status-pill bg-red-100 text-red-600'>Cancelled</span>
                    ) : item.isCompleted ? (
                      <span className='status-pill bg-green-100 text-green-600'>Completed</span>
                    ) : (
                      <span className='status-pill bg-teal-100 text-teal-700'>Confirmed</span>
                    )}
                    <span className='text-sm text-slate-600'>Doctor fee: {currency}{item.amount}</span>
                  </div>
                </div>

                <div className='mt-6 grid gap-3 sm:grid-cols-2'>
                  <div className='rounded-3xl border border-gray-200 bg-slate-50 p-4'>
                    <p className='text-xs uppercase tracking-[0.2em] text-slate-500'>Address</p>
                    <p className='mt-2 text-sm text-slate-700'>{item.docData.address.line1}</p>
                    <p className='text-sm text-slate-700'>{item.docData.address.line2}</p>
                  </div>
                  <div className='flex flex-col gap-3 sm:items-end'>
                    {!item.cancelled && !item.isCompleted && (
                      <button onClick={() => cancelAppointment(item._id)} className='btn-secondary w-full text-center'>Cancel Appointment</button>
                    )}
                    {!item.cancelled && !item.payment && !item.isCompleted && (
                      <button onClick={() => appointmentRazorpay(item._id)} className='btn-primary w-full text-center'>Pay Online</button>
                    )}
                    {item.payment && !item.cancelled && !item.isCompleted && (
                      <span className='status-pill bg-blue-100 text-blue-700'>Paid</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyAppointments
