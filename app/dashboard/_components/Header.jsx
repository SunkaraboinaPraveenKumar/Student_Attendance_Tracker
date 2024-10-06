"use client"
import { useTheme } from 'next-themes';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Image from 'next/image';
import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { UserButton, useUser } from '@clerk/nextjs';

function Header() {
  const { user } = useUser();
  const { theme, setTheme } = useTheme(); // Get current theme and setter

  return (
    <div className='p-4 shadow-sm border flex justify-between items-center'>
      {/* User Section */}
      <div className='flex items-center gap-2'>
        {
          user?
          <UserButton/>
          :
          <Image src={'/logo.png'} height={50} width={50}/>
        }
      </div>

      {/* Theme Toggle Section */}
      <div className='flex items-center gap-2'>
        {theme === 'dark' ? (
          <SunIcon
            className='h-6 w-6 text-yellow-500 cursor-pointer'
            onClick={() => setTheme('light')} // Switch to light mode
          />
        ) : (
          <MoonIcon
            className='h-6 w-6 text-gray-800 cursor-pointer'
            onClick={() => setTheme('dark')} // Switch to dark mode
          />
        )}
      </div>
    </div>
  );
}

export default Header;
