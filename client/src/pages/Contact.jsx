import React from 'react'

const Contact = () => {
  return (
    <div className='page-container py-12'>
      <div className='max-w-6xl mx-auto space-y-12'>
        <div className='text-center'>
          <p className='text-sm uppercase tracking-[0.3em] text-primary'>Contact Us</p>
          <h1 className='section-heading mt-4'>We’re always ready to support your health journey.</h1>
          <p className='section-copy mx-auto mt-4'>Have a question about appointments, billing, or doctor availability? Send us a message and we’ll respond quickly.</p>
        </div>

        <div className='grid gap-8 lg:grid-cols-[1.2fr_0.8fr]'>
          <div className='space-y-6'>
            <div className='section-card p-8'>
              <p className='text-xl font-semibold text-slate-900 mb-4'>Visit our office</p>
              <p className='text-slate-600 leading-relaxed'>Lekki Ikate, Lagos, Nigeria</p>
              <div className='mt-6 grid gap-4 sm:grid-cols-2'>
                <div className='rounded-3xl bg-slate-50 p-5'>
                  <p className='text-sm font-semibold text-slate-700'>Phone</p>
                  <p className='mt-2 text-base text-slate-900'>+234 800 123 4567</p>
                </div>
                <div className='rounded-3xl bg-slate-50 p-5'>
                  <p className='text-sm font-semibold text-slate-700'>Email</p>
                  <p className='mt-2 text-base text-slate-900'>support@mediconnect.com</p>
                </div>
              </div>
            </div>

            <div className='section-card p-8 bg-primary/5'>
              <p className='text-xl font-semibold text-slate-900 mb-4'>Need immediate help?</p>
              <p className='text-slate-600 leading-relaxed'>Our care team is available Monday through Friday to answer questions and schedule urgent bookings.</p>
              <div className='mt-6 space-y-3 text-sm text-slate-700'>
                <p><span className='font-semibold'>Hours:</span> Mon - Fri, 8am - 7pm</p>
                <p><span className='font-semibold'>Support:</span> Live chat and email support available</p>
              </div>
            </div>
          </div>

          <div className='section-card p-8'>
            <p className='text-xl font-semibold text-slate-900 mb-6'>Send us a message</p>
            <form className='space-y-4'>
              <div className='grid gap-4 sm:grid-cols-2'>
                <input type='text' placeholder='Your name' className='form-input' />
                <input type='email' placeholder='Email address' className='form-input' />
              </div>
              <input type='text' placeholder='Subject' className='form-input' />
              <textarea rows='6' placeholder='How can we help?' className='form-input resize-none'></textarea>
              <button type='submit' className='btn-primary w-full'>Send Message</button>
            </form>
          </div>
        </div>

        <div className='grid gap-4 sm:grid-cols-3'>
          {[
            { title: 'Fast responses', description: 'Expect a reply within 24 hours.' },
            { title: 'Verified doctors', description: 'All providers are certified and vetted.' },
            { title: 'Trusted support', description: 'We guide you through every booking step.' }
          ].map((item) => (
            <div key={item.title} className='section-card p-6'>
              <p className='text-lg font-semibold text-slate-900'>{item.title}</p>
              <p className='mt-3 text-slate-600'>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Contact
