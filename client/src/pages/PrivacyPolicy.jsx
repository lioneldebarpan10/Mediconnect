import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className='page-container py-12'>
      <div className='max-w-5xl mx-auto space-y-10'>
        <div className='text-center'>
          <p className='text-sm uppercase tracking-[0.3em] text-primary'>Privacy Policy</p>
          <h1 className='section-heading mt-4'>Your privacy matters at MediConnect.</h1>
          <p className='section-copy mx-auto mt-4'>We collect only the information needed to manage your appointments and provide a smooth healthcare experience. Here’s how we protect and use your data.</p>
        </div>

        <div className='space-y-6'>
          <div className='section-card p-8'>
            <h2 className='text-xl font-semibold text-slate-900'>What information we collect</h2>
            <p className='mt-4 text-slate-600 leading-7'>We may collect your name, email address, phone number, appointment details, and profile information to help you book appointments, manage your health records, and connect with doctors.</p>
          </div>

          <div className='section-card p-8'>
            <h2 className='text-xl font-semibold text-slate-900'>How we use your data</h2>
            <p className='mt-4 text-slate-600 leading-7'>Your information is used to confirm bookings, send reminders, improve service recommendations, and deliver customer support. We never sell your personal data to third parties.</p>
          </div>

          <div className='section-card p-8'>
            <h2 className='text-xl font-semibold text-slate-900'>How we protect it</h2>
            <p className='mt-4 text-slate-600 leading-7'>We use secure forms, encrypted connections, and restricted access to keep your information safe. Only authorized staff and doctors see the details required to fulfill your request.</p>
          </div>

          <div className='section-card p-8'>
            <h2 className='text-xl font-semibold text-slate-900'>Your rights</h2>
            <p className='mt-4 text-slate-600 leading-7'>You can update or delete your profile information anytime through your account settings. If you need help, contact our support team and we’ll assist you promptly.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
