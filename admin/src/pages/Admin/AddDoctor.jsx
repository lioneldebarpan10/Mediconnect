import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {

  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [education, setEducation] = useState('')
  const [speciality, setSpeciality] = useState('General Physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Image not selected");
      }

      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', education)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))


      // console.log formData
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`)
      })

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })

      if (data.success) {
        return toast.success(data.message);
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')

      }
      else {
        return toast.error(data.message);
      }
    }
    catch (error) {
      console.log(error);
      return toast.error(error.message);
    }

  }

  return (
    <form className='m-5 w-full' onSubmit={onSubmitHandler}>
      <p className='mb-3 text-lg font-medium'>Add Doctor</p>
      <div className='bg-white px-8 py-8 border border-gray-400 w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        {/* Upload Image Section */}
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-img">
            <img src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" className='w-16 bg-gray-100 rounded-full cursor-pointer' />
          </label>
          <input type="file" id='doc-img' hidden onChange={(e) => setDocImg(e.target.files[0])} />
          <p>Upload Doctor <br />Picture</p>
        </div>

        {/* Form Fields */}
        <div className='flex flex-col lg:flex-row gap-10 text-gray-600'>
          {/* Left Column - Form Fields */}
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            {/* Doctor Name */}
            <div className='flex flex-col gap-1'>
              <p>Doctor Name</p>
              <input type="text" placeholder='Name' className='px-3 py-2 border border-gray-300 rounded' required onChange={(e) => setName(e.target.value)} value={name} />
            </div>

            {/* Doctor Email */}
            <div className='flex flex-col gap-1'>
              <p>Doctor Email</p>
              <input type="email" placeholder='Email' className='px-3 py-2 border border-gray-300 rounded' required onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>

            {/* Doctor Password */}
            <div className='flex flex-col gap-1'>
              <p>Doctor Password</p>
              <input type="password" placeholder='Password' className='px-3 py-2 border border-gray-300 rounded' required onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>

            {/* Experience */}
            <div className='flex flex-col gap-1'>
              <p>Doctor Experience</p>
              <select className='px-3 py-2 border border-gray-300 rounded'
                onChange={(e) => setExperience(e.target.value)} value={experience}>
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            {/* Address */}
            <div className='flex flex-col gap-1'>
              <p>Address</p>
              <input type="text" placeholder='Address 1' className='px-3 py-2 border border-gray-300 rounded' required onChange={(e) => setAddress1(e.target.value)} value={address1} />
              <input type="text" placeholder='Address 2' className='px-3 py-2 border border-gray-300 rounded' required onChange={(e) => setAddress2(e.target.value)} value={address2} />
            </div>
          </div>

          {/* Right Column - Speciality, Education, Fees & About Doctor */}
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            {/* Speciality */}
            <div className='flex flex-col gap-1'>
              <p>Speciality</p>
              <select className='px-3 py-2 border border-gray-300 rounded'
                onChange={(e) => setSpeciality(e.target.value)} value={speciality}>
                <option value="General Physician">General Physician</option>
                <option value="Gynaecologist">Gynaecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            {/* Education */}
            <div className='flex flex-col gap-1'>
              <p>Education</p>
              <input type="text" placeholder='Education' className='px-3 py-2 border border-gray-300 rounded' required onChange={(e) => setEducation(e.target.value)} value={education} />
            </div>

            {/* Fees */}
            <div className='flex flex-col gap-1'>
              <p>Doctor Fees</p>
              <input type="number" placeholder='Fees' className='px-3 py-2 border border-gray-300 rounded' required onChange={(e) => setFees(e.target.value)} value={fees} />
            </div>

            {/* About Doctor */}
            <div className='flex flex-col gap-1'>
              <p>About Doctor</p>
              <textarea placeholder='Write about doctor' rows={5} className='px-3 py-2 border border-gray-300 rounded resize-none' required onChange={(e) => setAbout(e.target.value)} value={about} />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className='flex justify-center mt-8'>
          <button className='bg-[#5f6FFF] text-white text-sm px-10 py-2 rounded-full hover:bg-blue-700 transition'>Add Doctor</button>
        </div>
      </div>
    </form>
  )
}

export default AddDoctor
