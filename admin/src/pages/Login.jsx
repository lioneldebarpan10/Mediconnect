import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const Login = () => {

  const [state, setState] = useState('Admin')

  const { setAToken, backendUrl } = useContext(AdminContext);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log("Form submitted"); 

    try {
      // Admin State - calling Admin login API
      if (state === 'Admin') {

        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });

        if (data.success) {
          toast.success(data.message)
          localStorage.setItem('aToken' , data.token);
          setAToken(data.token); 
        }
        else{
          toast.error(data.message)
        }
      }
      // Doctor State - calling Doctor Login API
      else {

      }

    }
    catch (error) {
      console.log(error)

    }
  }






  return (
    <form className='min-h-[80vh] flex items-center' onSubmit={onSubmitHandler}>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-[#5e6FFF] '>{state}</span> Login</p>
        <div className='w-full'>
          <p>Email</p>
          <input type="email" required className='border border-[#DADADA] rounded w-full mt-1 p-2' onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input type="password" required className='border border-[#DADADA] rounded w-full mt-1 p-2' onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>
        <button className='bg-[#5e6FFF] text-white w-full py-2 rounded-md text-base cursor-pointer'>Login</button>

        {
          state === 'Admin'
            ? <p>Doctor Login? <span onClick={() => setState('Doctor')} className='text-[#5f6FFF] cursor-pointer underline'>Click here</span></p>
            : <p>Admin Login? <span onClick={() => setState('Admin')} className='text-[#5f6FFF] cursor-pointer underline'>Click here</span></p>

        }
      </div>
    </form>
  )
}

export default Login
