// import React from 'react'
import { FaCopyright } from "react-icons/fa";
import { Link } from "react-router-dom"; // For routing in your project
import logo from '../assets/logo.jpg'; // Adjust the path to your logo image
import dayjs from 'dayjs';

export default function Footer() {
  return (
    <div className="relative bottom-0 w-full">
      <footer className='bg-primaryBg w-full py-10 text-white'>
        <div className='flex flex-col gap-8 lg:flex-row px-24'>
          {/* Logo and Brand */}
          <div className='flex flex-col gap-4 lg:flex-1 lg:gap-8'>
            <div className='flex items-center gap-2'>
              <h3 className='font-volkhov text-3xl'>Convent</h3>
              <img src={logo} alt="Convent Logo" className='w-10' />
            </div>
            <p>Stay Connected, Stay Engaged – Your Campus, Your Events, Your Way.</p>
          </div>

          {/* Links Section */}
          <ul className='flex flex-col gap-2 lg:flex-1 lg:gap-4'>
            <h4 className='mb-4 font-volkhov text-xl'>Links</h4>
            <li>
              <Link className='hover:text-brand' to='/'>
                Home
              </Link>
            </li>
            <li>
              <Link className='hover:text-brand' to='/event/:id'>
                Events
              </Link>
            </li>
            <li>
              <Link className='hover:text-brand' to='/plus'>
                Convent Plus
              </Link>
            </li>
          </ul>
        </div>

        {/* Divider */}
        <div className='my-8 max-w-full border-b border-dark lg:my-10' />

        {/* Footer Bottom Section */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-4 px-24'>
          <p className='flex items-center'>
            Copyright &copy; Convent {dayjs().year()}. All rights reserved.
          </p>
          <Link
            to='terms-and-conditions'
            className='text-fontprimary hover:text-brand'
          >
            Terms and Conditions
          </Link>
        </div>



      </footer>
    </div>
  );
}
