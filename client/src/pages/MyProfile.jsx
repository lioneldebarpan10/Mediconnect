import React, { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {

  const [userData, setUserData] = useState({
    name: "John Doe",
    image: assets.profile_pic,
    email: "abcdev@gmail.com",
    phone: "+0-123-456-789",
    address: {
      line1: "57th cross,RichMond",
      line2: "Circle,Church Road,London"
    },
    gender: "Male",
    dob: "06-10-2005"
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      <img src={userData.image} alt="user-image"  className='w-36 rounded '/>
      {
        isEdit
          // whenever we change the input field it will update the name property
          ? <input type="text" onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} className='bg-gray-100 text-3xl font-medium max-w-60 mt-4'/>
          : <p className='text-neutral-800 text-3xl font-medium mt-4'>{userData.name}</p>
      }
      <hr  className='bg-zinc-400 h-[1px] border-none'/>
      <div>
        <p className='text-neutral-500 underline mt-4'>Contact Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700 mt-3'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
            isEdit
              // whenever we change the input field it will update the phone property
              ? <input type="text" onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} className='bg-gray-100 max-w-52'/>
              : <p className='text-blue-400'>{userData.phone}</p>
          }
          <p className='font-medium'>Address:</p>
          {
            isEdit
              // whenever we change the input field it will update the address property
              ? <p>
                <input type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} className='bg-gray-100 '/>
                <br />
                <input type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} className='bg-gray-100'/>
              </p>
              : <p className='text-gray-500'>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
          }
        </div>
      </div>

      <div>
        <p className='text-neutral-500 underline mt-4'>Basic Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700 mt-3'>
          <p className='font-medium'>Gender:</p>
          {
            isEdit
              // whenever we change the input field it will update the Gender
              ? <select onChange={(e) => setUserData(prev => ({...prev , gender: e.target.value }))} value={userData.gender} className='max-w-20 bg-gray-100'>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              : <p className='text-gray-400'>{userData.gender}</p>
          }
          <p className='font-medium'>Date of birth:</p>
          {
            isEdit ? 
            <input type="date" onChange={(e) => setUserData(prev => ({...prev , dob: e.target.value}))} value={userData.dob} className='max-w-28 bg-gray-100'/>
            : <p className='text-gray-400'>{userData.dob}</p>
          }
        </div>
      </div>

      <div className='mt-10 '>
        {
          isEdit ? 
          <button onClick={() => setIsEdit(false)}className='border px-8 py-2 rounded-full cursor-pointer hover:bg-[#5f6FFF] hover:text-white transition-all duration-500'>Save Information</button>
          :
          <button onClick={() => setIsEdit(true)} className='border px-8 py-2 rounded-full cursor-pointer hover:bg-[#5f6FFF] hover:text-white transition-all duration-500'>Edit Information</button>
        }
      </div>
    </div>
  )
}

export default MyProfile
