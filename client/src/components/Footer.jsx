import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/**Left Section */}
        <div>
          <img src={assets.logo} alt="footer-logo" className='mb-5 w-40' />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat excepturi itaque quo iste, aspernatur velit voluptatibus, ratione iure quia tempora mollitia error minima obcaecati quasi? Consequatur deserunt doloremque quae, quod minus cumque eum recusandae laudantium.</p>

        </div>

        {/**Center Section */}
        <div>
          <p className='text-xl font-medium mb-5'>Company</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy Policy</li>
          </ul>

        </div>

        {/**Rigtht Section */}
        <div>
          <p className='text-xl font-medium mb-5'>Get in Touch</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+0-123-456-789</li>
            <li>dbrpn07cse@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className='text-sm text-center py-5 font-bold text-gray-600'>Copyright ©2026 Debarpan Deb - All Right Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
