import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const MyProfile = () => {
  const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      image && formData.append('image', image)

      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return userData ? (
    <div className='page-container py-10'>
      <div className='max-w-6xl mx-auto grid gap-8 lg:grid-cols-[320px_1fr]'>
        <div className='form-card flex flex-col items-center gap-6 p-8'>
          {isEdit ? (
            <label htmlFor='image' className='relative inline-block cursor-pointer'>
              <img src={image ? URL.createObjectURL(image) : userData.image} alt='profile' className='h-40 w-40 rounded-full object-cover shadow-lg' />
              <div className='absolute inset-0 flex items-center justify-center rounded-full bg-slate-900/20 opacity-0 transition hover:opacity-100'>
                <span className='text-white text-sm'>Upload</span>
              </div>
              <input id='image' type='file' className='hidden' onChange={(e) => setImage(e.target.files[0])} />
            </label>
          ) : (
            <img src={userData.image} alt='profile' className='h-40 w-40 rounded-full object-cover shadow-lg ring-4 ring-teal-50' />
          )}

          {isEdit ? (
            <input type='text' value={userData.name} onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))} className='form-input text-center text-xl font-semibold' />
          ) : (
            <p className='text-3xl font-semibold text-slate-900 text-center'>{userData.name}</p>
          )}

          {isEdit ? (
            <button type='button' onClick={updateUserProfileData} className='btn-primary w-full py-3'>Save Information</button>
          ) : (
            <button type='button' onClick={() => setIsEdit(true)} className='btn-secondary w-full py-3'>Edit Profile</button>
          )}
        </div>

        <div className='form-card p-8'>
          <h2 className='text-2xl font-semibold text-slate-900 border-b pb-4 mb-6'>Contact Information</h2>
          <div className='grid gap-6 sm:grid-cols-[1fr_2fr] text-slate-700'>
            <div className='font-medium text-slate-500'>Email Address</div>
            <div className='text-slate-900 font-medium'>{userData.email}</div>
            <div className='font-medium text-slate-500'>Phone Number</div>
            <div>
              {isEdit ? (
                <input type='text' className='form-input' value={userData.phone} onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))} />
              ) : (
                <span className='text-slate-900'>{userData.phone}</span>
              )}
            </div>
            <div className='font-medium text-slate-500'>Address</div>
            <div>
              {isEdit ? (
                <div className='space-y-3'>
                  <input type='text' placeholder='Line 1' className='form-input' value={userData.address.line1} onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} />
                  <input type='text' placeholder='Line 2' className='form-input' value={userData.address.line2} onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} />
                </div>
              ) : (
                <span className='text-slate-900 leading-relaxed'>{userData.address.line1}<br />{userData.address.line2}</span>
              )}
            </div>
          </div>

          <h2 className='text-2xl font-semibold text-slate-900 border-b pb-4 mb-6 mt-10'>Basic Information</h2>
          <div className='grid gap-6 sm:grid-cols-[1fr_2fr] text-slate-700'>
            <div className='font-medium text-slate-500'>Gender</div>
            <div>
              {isEdit ? (
                <select value={userData.gender} onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))} className='form-input'>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                </select>
              ) : (
                <span className='text-slate-900'>{userData.gender}</span>
              )}
            </div>
            <div className='font-medium text-slate-500'>Date of Birth</div>
            <div>
              {isEdit ? (
                <input type='date' className='form-input' value={userData.dob} onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))} />
              ) : (
                <span className='text-slate-900'>{userData.dob}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default MyProfile
