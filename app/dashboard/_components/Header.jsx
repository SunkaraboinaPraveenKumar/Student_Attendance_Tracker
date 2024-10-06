"use client"
import { useTheme } from 'next-themes';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Image from 'next/image';
import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

function Header() {
  const { user } = useKindeBrowserClient(); // Get authenticated user
  const { theme, setTheme } = useTheme(); // Get current theme and setter

  return (
    <div className='p-4 shadow-sm border flex justify-between items-center'>
      {/* User Section */}
      <div className='flex items-center gap-2'>
        <Image
          src={user?.picture || '/default-avatar.png'} // Default avatar if user picture is not available
          height={35}
          width={35}
          alt='user'
          className='rounded-full'
        />
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
