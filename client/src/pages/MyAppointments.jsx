import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {

  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const { backendUrl, token , getDoctorsData } = useContext(AppContext);
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


  // converting slot date format
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const getUserAppointments = async () => {
    try {

      const { data } = await axios.get(backendUrl + "/api/user/appointments", { headers: { token } })

      if (data.success) {
        setAppointments(data.appointments.reverse())
        // console.log(data.appointments)
      }
    }
    catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      // test log - console.log(appointmentId);
      const { data } = await axios.post(backendUrl + "/api/user/cancel-appointment" , {appointmentId} , {headers: {token}})
      if(data.success){
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData();
      }
      else{
        toast.error(data.message);
      }
    }
    catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);

        try{
          const { data } = await axios.post(backendUrl + '/api/user/verifyRazorpay',response, {headers: {token}})
          if(data.success){
            getUserAppointments()
            navigate('/my-appointments')
          }
        }
        catch(error){
          console.log(error)
          toast.error(error.message)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorpay = async(appointmentId) => {

    try{
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', {appointmentId} , {headers: {token}})
      if(data.success){
        // test-log console.log(data.order)
        initPay(data.order)
      }
    }
    catch(error){
      console.log(error)
      res.json({success: false , message: error.message})
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])


  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        {appointments.map((item, index) => (
          <div key={index} className='grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] items-start sm:items-center gap-4 sm:gap-6 py-4 border-b'>
            <div>
              <img src={item.docData.image} alt="display-appointment-image" className='w-full sm:w-32 h-auto sm:h-32 bg-indigo-50 object-cover rounded-md' />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='text-zinc-700 mt-1 font-medium'>Address:</p>
              <p className='text-xs'>{item.docData.address.line1}</p>
              <p className='text-xs'>{item.docData.address.line2}</p>
              <p className='text-xs mt-1'><span className='text-xs font-medium text-neutral-700'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
            </div>
            <div className='flex flex-col sm:flex-col gap-2 sm:items-end w-full sm:w-auto'>
              {!item.cancelled && <button onClick={() => appointmentRazorpay(item._id)} className='text-sm text-stone-500 text-center w-full sm:w-36 py-2 border rounded hover:text-white hover:bg-[#5f6FFF] transition-all duration-500 cursor-pointer'>Pay Online</button>}
              {!item.cancelled && <button onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 text-center w-full sm:w-36 py-2 border rounded hover:text-white hover:bg-red-500 transition-all duration-500 cursor-pointer'>Cancel Appointment</button>}
              {item.cancelled && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment Cancelled</button>}
            </div>

          </div>

        ))
        }

      </div>
    </div>
  )
}

export default MyAppointments
