import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {

  const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
  const { currency, backendUrl } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {

    try {

      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        about: profileData.about,
        available: profileData.available
      }

      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }

      setIsEdit(false)

    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }

  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  return profileData && (
    <div className='p-4 md:p-6'>
      <div className='section-card p-6 md:p-8'>
        <div className='flex flex-col lg:flex-row gap-8'>
          <div className='w-full lg:w-80 flex flex-col gap-5'>
            <div className='overflow-hidden rounded-3xl bg-slate-100'>
              <img src={profileData.image} alt={profileData.name} className='w-full h-full object-cover' />
            </div>
            <div className='rounded-3xl bg-slate-50 p-5'>
              <div className='flex items-center justify-between gap-3'>
                <div>
                  <p className='text-sm text-slate-500'>Availability</p>
                  <p className='text-lg font-semibold text-slate-900'>{profileData.available ? 'Available now' : 'Currently offline'}</p>
                </div>
                <span className={`status-pill ${profileData.available ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                  {profileData.available ? 'Online' : 'Offline'}
                </span>
              </div>
              <div className='mt-5 grid grid-cols-1 gap-3'>
                <div className='rounded-2xl bg-white p-4 border border-slate-200'>
                  <p className='text-xs uppercase tracking-[0.2em] text-slate-500'>Fees</p>
                  <p className='text-xl font-semibold text-slate-900 mt-2'>{currency} {profileData.fees}</p>
                </div>
                <div className='rounded-2xl bg-white p-4 border border-slate-200'>
                  <p className='text-xs uppercase tracking-[0.2em] text-slate-500'>Experience</p>
                  <p className='text-xl font-semibold text-slate-900 mt-2'>{profileData.experience}</p>
                </div>
              </div>
            </div>
          </div>

          <div className='flex-1'>
            <div className='flex flex-col gap-4'>
              <div>
                <p className='text-3xl font-semibold text-slate-900'>{profileData.name}</p>
                <p className='text-sm text-slate-500 mt-2'>{profileData.degree} • {profileData.speciality}</p>
              </div>

              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div className='rounded-3xl bg-slate-50 p-5 border border-slate-200'>
                  <p className='text-sm text-slate-500'>Clinic / Hospital</p>
                  <p className='text-base font-semibold text-slate-900 mt-2'>{profileData.clinic || 'Not specified'}</p>
                </div>
                <div className='rounded-3xl bg-slate-50 p-5 border border-slate-200'>
                  <p className='text-sm text-slate-500'>Speciality</p>
                  <p className='text-base font-semibold text-slate-900 mt-2'>{profileData.speciality}</p>
                </div>
              </div>

              <div className='rounded-3xl bg-slate-50 p-6 border border-slate-200'>
                <div className='flex items-center justify-between'>
                  <p className='text-sm font-semibold text-slate-900'>About Doctor</p>
                  <span className='text-xs text-slate-500'>Profile Overview</span>
                </div>
                {isEdit ? (
                  <textarea
                    onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                    className='mt-4 min-h-[140px] w-full rounded-3xl border border-slate-300 bg-white p-4 text-sm text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none'
                    rows={6}
                    value={profileData.about}
                  />
                ) : (
                  <p className='mt-4 text-sm leading-7 text-slate-600'>{profileData.about || 'No bio available yet.'}</p>
                )}
              </div>

              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div className='rounded-3xl bg-white p-5 border border-slate-200'>
                  <p className='text-sm text-slate-500'>Appointment Fee</p>
                  {isEdit ? (
                    <input
                      type='number'
                      className='mt-3 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20'
                      value={profileData.fees}
                      onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                    />
                  ) : (
                    <p className='mt-3 text-base font-semibold text-slate-900'>{currency} {profileData.fees}</p>
                  )}
                </div>
                <div className='rounded-3xl bg-white p-5 border border-slate-200'>
                  <p className='text-sm text-slate-500'>Address</p>
                  {isEdit ? (
                    <div className='mt-3 space-y-3'>
                      <input
                        type='text'
                        className='w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20'
                        value={profileData.address?.line1 || ''}
                        onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                        placeholder='Street address'
                      />
                      <input
                        type='text'
                        className='w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20'
                        value={profileData.address?.line2 || ''}
                        onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                        placeholder='City, state'
                      />
                    </div>
                  ) : (
                    <p className='mt-3 text-sm text-slate-700 leading-6'>{profileData.address?.line1 || 'Not added yet'}<br />{profileData.address?.line2 || ''}</p>
                  )}
                </div>
              </div>

              <div className='rounded-3xl bg-white p-5 border border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                <div className='flex items-center gap-3'>
                  <input
                    type='checkbox'
                    id='profile-availability'
                    onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
                    checked={profileData.available}
                    className='h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary'
                  />
                  <label htmlFor='profile-availability' className='text-sm text-slate-700'>Available for appointments</label>
                </div>
                <div className='flex flex-wrap gap-3'>
                  <button onClick={() => setIsEdit(prev => !prev)} className='btn-secondary'>
                    {isEdit ? 'Cancel' : 'Edit Profile'}
                  </button>
                  {isEdit && (
                    <button onClick={updateProfile} className='btn-primary'>Save Changes</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile