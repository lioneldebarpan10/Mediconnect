import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {
  const [state, setState] = useState('Admin')
  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password })
        if (data.success) {
          toast.success(data.message)
          localStorage.setItem('aToken', data.token)
          setAToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/doctor/login`, { email, password })
        if (data.success) {
          toast.success(data.message)
          localStorage.setItem('dToken', data.token)
          setDToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='page-shell min-h-screen bg-slate-50'>
      <div className='page-container py-16'>
        <div className='grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center'>
          <div className='space-y-6'>
            <div className='max-w-xl'>
              <p className='text-sm uppercase tracking-[0.3em] text-primary'>Secure access</p>
              <h1 className='section-heading mt-4'>{state} Login</h1>
              <p className='section-copy mt-4'>Access your portal with a secure login experience for both administrators and doctors.</p>
            </div>

            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm'>
                <p className='font-semibold text-slate-900'>Admin access</p>
                <p className='mt-2 text-sm text-slate-600'>Manage doctors, appointments, and platform settings.</p>
              </div>
              <div className='rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm'>
                <p className='font-semibold text-slate-900'>Doctor access</p>
                <p className='mt-2 text-sm text-slate-600'>View appointments, update status, and manage your profile.</p>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmitHandler} className='form-card p-8 shadow-xl'>
            <div className='flex flex-col gap-6'>
              <div>
                <p className='text-3xl font-semibold text-slate-900'>{state} Login</p>
                <p className='text-sm text-slate-600 mt-2'>Choose your portal type and sign in securely.</p>
              </div>

              <div className='flex gap-2 rounded-full bg-slate-100 p-1'>
                {['Admin', 'Doctor'].map((item) => (
                  <button key={item} type='button' onClick={() => setState(item)} className={`flex-1 rounded-full py-3 text-sm font-semibold transition ${state === item ? 'bg-white text-primary shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
                    {item}
                  </button>
                ))}
              </div>

              <div className='flex flex-col gap-3'>
                <label className='form-label'>Email</label>
                <input type='email' required className='form-input' onChange={(e) => setEmail(e.target.value)} value={email} />
              </div>

              <div className='flex flex-col gap-3'>
                <label className='form-label'>Password</label>
                <input type='password' required className='form-input' onChange={(e) => setPassword(e.target.value)} value={password} />
              </div>

              <button className='btn-primary w-full py-3'>Continue</button>

              <p className='text-center text-sm text-slate-600'>
                {state === 'Admin' ? 'Need Doctor access?' : 'Need Admin access?'}{' '}
                <button type='button' onClick={() => setState(state === 'Admin' ? 'Doctor' : 'Admin')} className='text-primary font-semibold'>Switch here</button>
              </p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login
