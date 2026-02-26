import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';

const Appointment = () => {
  const { doctors, currency } = useContext(AppContext)
  const { docId } = useParams();
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null);

  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
    // get doc's info test - console.log(docInfo)
  }

  const getAvailableSlots = async () => {
    setDocSlots([]) // clear previous slots

    // getting current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      // getting date with index

      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      // seeting end time of the date with index
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)

      endTime.setHours(21, 0, 0, 0);


      // setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      }
      else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()


        // add slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        })
        // incremtn current time by 30min
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots(prev => ([...prev, timeSlots]))

    }

  }

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]) // fetch Doc info

  useEffect(() => {
    getAvailableSlots()

  }, [docInfo])

  /*
    useEffect(() => {
      console.log(docSlots);
    } , [docSlots]) // test - get available slots
  */

  return docInfo && (
    <div>

      {/**Doctor details section */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img src={docInfo.image} alt="" className='bg-[#5f6FFF] w-full sm:w-72 rounded-lg' />
        </div>

        <div className='flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/**Doctor Name , degree , speciality and experience */}
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{docInfo.name}
            <img src={assets.verified_icon} alt="verified-icon" className='w-5' />
          </p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>

          {/**Doctor about and fees */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>About
              <img src={assets.info_icon} alt="info-icon" />
            </p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-gray-600 font-medium mt-4'>Appointment fee: <span className='text-gray-800'>{currency}{docInfo.fees}</span></p>
        </div>
      </div>

      {/**Booking slots section */}
      <div className='sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]'>
        <p>Booking slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlots.length && docSlots.map((item, index) => (
              <div key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-[#5f6FFF] text-white' : 'border border-gray-500'}`}
                onClick={() => setSlotIndex(index)}>
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>

              </div>
            ))
          }
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {
            docSlots.length && docSlots[slotIndex].map((item, index) => (
              <p key={index} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer
                ${item.time === slotTime ? 'bg-[#5f6FFF] text-white' : 'border border-gray-500 text-gray-400'}`}
                onClick={() => setSlotTime(item.time)}>{item.time.toLowerCase()}</p>
            ))
          }
        </div>

        <button className='bg-[#5f6FFF] text-white text-sm font-light px-20 py-3 rounded-full my-6'>Book an Appointment</button>
      </div>

      <RelatedDoctors speciality={docInfo.speciality} docId={docId} />

    </div>
  )
}

export default Appointment
