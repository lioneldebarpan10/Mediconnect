import React from 'react'
import { FaUserDoctor } from 'react-icons/fa6'
import {Navlink} from 'react-router-dom'

const Navbar = () => {

   return (

      <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]'>

         {/*Adding Mediconnect Logo */}
         <a href="#">
            <FaUserDoctor />

         </a>

         {/*Creating Navlinks */}
         <ul>
            <Navlink to='/'>

               <li>HOME</li>
               <hr />

            </Navlink>
            <Navlink to='/doctors'>

               <li>ALL DOCTORS</li>
               <hr />

            </Navlink >
            <Navlink to='/about'>

               <li>ABOUT</li>
               <hr />

            </Navlink>
            <Navlink to='/contact'>

               <li>CONTACT</li>
               <hr />

            </Navlink>
         </ul>

         {/*Create account Button for Mediconnect */}

         <div>
            <button>Create Account</button>

            {/*Mobile Menu */}


         </div>

         


      </div>
   )
}