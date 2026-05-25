import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {
  const { doctors, currency, backendUrl, token, getDoctorsData } = useContext(AppContext)
  const { docId } = useParams()
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const navigate = useNavigate()

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = () => {
    if (!docInfo || !docInfo.slots_booked) return
    setDocSlots([])

    const today = new Date()
    const nextDays = Array.from({ length: 7 }).map((_, index) => {
      const currentDate = new Date(today)
      currentDate.setDate(today.getDate() + index)
      return currentDate
    })

    const slots = nextDays.map((date) => {
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const slotDate = `${day}_${month}_${year}`
      const times = []
      const baseTime = new Date(date)
      baseTime.setHours(10, 0, 0, 0)
      const endTime = new Date(date)
      endTime.setHours(21, 0, 0, 0)

      while (baseTime < endTime) {
        const formattedTime = baseTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        const isBooked = docInfo.slots_booked?.[slotDate]?.includes(formattedTime)
        if (!isBooked) {
          times.push({ datetime: new Date(baseTime), time: formattedTime })
        }
        baseTime.setMinutes(baseTime.getMinutes() + 30)
      }
      return times
    })

    setDocSlots(slots)
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment')
      return navigate('/login')
    }

    if (!slotTime || !docSlots[slotIndex]?.length) {
      toast.error('Please select a slot')
      return
    }

    try {
      const date = docSlots[slotIndex][0].datetime
      const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`
      const { data } = await axios.post(`${backendUrl}/api/user/book-appointment`, { docId, slotDate, slotTime }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  return docInfo ? (
    <div className='page-container py-10'>
      <div className='max-w-6xl mx-auto space-y-8'>
        <div className='grid gap-6 lg:grid-cols-[320px_1fr]'>
          <div className='section-card overflow-hidden'>
            <img src={docInfo.image} alt={docInfo.name} className='block w-full h-80 object-cover' />
            <div className='p-6'>
              <p className='text-2xl font-semibold text-slate-900'>{docInfo.name}</p>
              <p className='mt-3 text-sm text-slate-600'>{docInfo.degree} • {docInfo.speciality}</p>
              <p className='mt-2 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700'>{docInfo.experience}</p>
              <div className='mt-6 space-y-3 text-sm text-slate-600'>
                <p>{docInfo.about}</p>
                <p><span className='font-semibold text-slate-800'>Fee:</span> {currency}{docInfo.fees}</p>
              </div>
            </div>
          </div>

          <div className='space-y-6'>
            <div className='section-card p-6'>
              <p className='text-xl font-semibold text-slate-900 mb-4'>Select Booking Slot</p>
              <div className='grid gap-3 sm:grid-cols-2 md:grid-cols-3'>
                {docSlots.map((weekSlots, index) => {
                  const date = weekSlots[0]?.datetime
                  const label = date ? `${daysOfWeek[date.getDay()]} ${date.getDate()}/${date.getMonth() + 1}` : 'No slots'
                  return (
                    <button key={index} type='button' onClick={() => { setSlotIndex(index); setSlotTime('') }} className={`rounded-3xl border p-4 text-left transition ${slotIndex === index ? 'border-primary bg-primary/10 text-primary' : 'border-gray-200 bg-white hover:border-primary hover:bg-teal-50'}`}>
                      <p className='text-xs uppercase tracking-[0.2em] text-slate-500'>{label}</p>
                      <p className='mt-2 text-lg font-semibold text-slate-900'>{weekSlots.length} slots</p>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className='section-card p-6'>
              <p className='text-xl font-semibold text-slate-900 mb-4'>Available Times</p>
              <div className='flex flex-wrap gap-3'>
                {!docSlots[slotIndex]?.length && <p className='text-sm text-slate-500'>No available time slots for the selected day.</p>}
                {docSlots[slotIndex]?.map((item, idx) => (
                  <button key={idx} type='button' onClick={() => setSlotTime(item.time)} className={`rounded-full border px-5 py-3 text-sm font-medium transition ${slotTime === item.time ? 'bg-primary text-white border-primary' : 'bg-white border-gray-200 text-slate-700 hover:border-primary hover:bg-teal-50'}`}>
                    {item.time}
                  </button>
                ))}
              </div>
              <button onClick={bookAppointment} type='button' className={`mt-6 btn-primary w-full py-3 ${!slotTime ? 'opacity-60 cursor-not-allowed' : ''}`} disabled={!slotTime}>
                Book Appointment
              </button>
            </div>
          </div>
        </div>

        <div className='section-card p-6'>
          <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
        </div>
      </div>
    </div>
  ) : null
}

export default Appointment
