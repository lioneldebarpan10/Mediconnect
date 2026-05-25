import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Account created successfully')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Login successful')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <div className='page-container min-h-[calc(100vh-140px)] py-12'>
      <div className='grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-center'>
        <div className='space-y-8'>
          <div className='max-w-xl'>
            <p className='text-sm uppercase tracking-[0.3em] text-primary'>Welcome to MediConnect</p>
            <h1 className='section-heading mt-4'>{state === 'Sign Up' ? 'Create your account' : 'Welcome back'}</h1>
            <p className='section-copy mt-4'>Securely book doctor appointments, manage your profile, and stay informed with one easy platform.</p>
          </div>

          <div className='grid gap-4 sm:grid-cols-2'>
            <div className='rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm'>
              <p className='font-semibold text-slate-900'>Faster bookings</p>
              <p className='mt-2 text-sm text-slate-600'>Save time and book the best doctors in a few clicks.</p>
            </div>
            <div className='rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm'>
              <p className='font-semibold text-slate-900'>Verified doctors</p>
              <p className='mt-2 text-sm text-slate-600'>All doctors are screened for quality and credibility.</p>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmitHandler} className='form-card p-8 shadow-xl'>
          <div className='flex flex-col gap-6'>
            <div>
              <p className='text-3xl font-semibold text-slate-900'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
              <p className='text-sm text-slate-600 mt-2'>Please {state === 'Sign Up' ? 'create an account' : 'sign in'} to book appointments instantly.</p>
            </div>

            <div className='flex gap-2 rounded-full bg-slate-100 p-1'>
              {['Sign Up', 'Login'].map((item) => (
                <button key={item} type='button' onClick={() => setState(item)} className={`flex-1 rounded-full py-3 text-sm font-semibold transition ${state === item ? 'bg-white text-primary shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
                  {item}
                </button>
              ))}
            </div>

            {state === 'Sign Up' && (
              <div className='flex flex-col gap-2'>
                <label className='form-label'>Full Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type='text' className='form-input' required />
              </div>
            )}

            <div className='flex flex-col gap-2'>
              <label className='form-label'>Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' className='form-input' required />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='form-label'>Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' className='form-input' required />
            </div>

            <button type='submit' className='btn-primary w-full py-3'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</button>

            <p className='text-sm text-slate-600 text-center'>
              {state === 'Sign Up' ? 'Already have an account?' : 'Need a new account?'}{' '}
              <button type='button' onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')} className='text-primary font-semibold underline'>
                {state === 'Sign Up' ? 'Login here' : 'Create one'}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
