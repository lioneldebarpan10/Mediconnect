import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const filterList = [
  'General Physician',
  'Gynaecologist',
  'Dermatologist',
  'Pediatricians',
  'Neurologist',
  'Gastroenterologist'
]

const Doctors = () => {
  const { speciality } = useParams()
  const { doctors } = useContext(AppContext)
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setFilterDoc(speciality ? doctors.filter((doc) => doc.speciality === speciality) : doctors)
  }, [doctors, speciality])

  return (
    <div className='page-container py-10'>
      <div className='space-y-6'>
        <div className='space-y-3 text-center'>
          <p className='section-heading'>Find the right doctor for your needs</p>
          <p className='section-copy mx-auto'>Browse specialists by category, compare their expertise, and book appointments in seconds.</p>
        </div>

        <div className='flex flex-col gap-6 lg:flex-row lg:items-start'>
          <aside className={`lg:w-72 ${showFilter ? 'block' : 'hidden'} sm:block`}>
            <div className='section-card p-6'>
              <div className='flex items-center justify-between gap-3 mb-6'>
                <div>
                  <p className='text-lg font-semibold text-slate-900'>Filter by speciality</p>
                  <p className='text-sm text-slate-500'>Tap a category to narrow results.</p>
                </div>
                <button className='text-sm text-primary md:hidden' onClick={() => setShowFilter((prev) => !prev)}>
                  {showFilter ? 'Hide' : 'Show'}
                </button>
              </div>
              <div className='grid gap-3'>
                {filterList.map((item) => (
                  <button
                    key={item}
                    onClick={() => navigate(item === speciality ? '/doctors' : `/doctors/${item}`)}
                    className={`w-full rounded-3xl border px-4 py-3 text-left text-sm transition ${speciality === item ? 'border-primary bg-primary/10 text-primary' : 'border-gray-200 bg-white text-slate-700 hover:border-primary hover:bg-teal-50'}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <section className='flex-1 space-y-6'>
            <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
              <div>
                <p className='text-sm uppercase tracking-[0.3em] text-primary'>Doctors</p>
                <h2 className='text-2xl font-semibold text-slate-900 mt-2'>{speciality ? speciality : 'All Specialists'}</h2>
              </div>
              <p className='text-sm text-slate-600'>{filterDoc.length} doctors available now</p>
            </div>

            <div className='grid gap-5 sm:grid-cols-2 xl:grid-cols-3'>
              {filterDoc.map((item) => (
                <div key={item._id} className='section-card overflow-hidden cursor-pointer hover:shadow-xl transition' onClick={() => navigate(`/appointment/${item._id}`)}>
                  <div className='bg-teal-50 p-4 flex items-center justify-center'>
                    <img src={item.image} alt={item.name} className='h-48 object-cover rounded-3xl' />
                  </div>
                  <div className='p-5 space-y-3'>
                    <div className='flex items-center gap-2 text-sm text-green-600'>
                      <span className='h-2 w-2 rounded-full bg-green-600' />
                      <span>Available now</span>
                    </div>
                    <p className='text-lg font-semibold text-slate-900'>{item.name}</p>
                    <p className='text-sm text-slate-600'>{item.degree} • {item.speciality}</p>
                    <p className='text-sm text-slate-500'>{item.about.slice(0, 80)}...</p>
                    <div className='flex items-center justify-between gap-3 pt-2'>
                      <span className='rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700'>Fee: ₦{item.fees}</span>
                      <span className='rounded-full bg-primary/10 px-3 py-1 text-xs text-primary'>{item.experience} experience</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Doctors
