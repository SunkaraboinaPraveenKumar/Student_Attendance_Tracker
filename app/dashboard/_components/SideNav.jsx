"use client"
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { GraduationCap, LayoutIcon, Hand, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function SideNav() {
  const { user } = useKindeBrowserClient();
  const MenuList = [
    {
      id: 1,
      name: 'Dashboard',
      icon: LayoutIcon,
      path: '/dashboard'
    },
    {
      id: 2,
      name: 'Student',
      icon: GraduationCap,
      path: '/dashboard/students'
    },
    {
      id: 3,
      name: 'Attendance',
      icon: Hand,
      path: '/dashboard/attendance'
    },
    {
      id: 4,
      name: 'Settings',
      icon: Settings,
      path: '/dashboard/settings'
    },
  ];

  const path = usePathname();

  return (
    <div className='border shadow-md h-screen p-5 bg-white dark:bg-gray-900'>
      {/* Logo */}
      <Link href={'/dashboard'}>
        <Image src={'/logo.png'} height={50} width={50} alt='logo' className='cursor-pointer' />
      </Link>
      <hr className='my-5 border-gray-300 dark:border-gray-700' />

      {/* Menu List */}
      {MenuList.map((menu, index) => (
        <Link href={menu.path} key={index}>
          <h2
            className={`flex items-center gap-3 text-md p-4 text-slate-500 dark:text-gray-300 hover:bg-primary hover:text-white dark:hover:bg-blue-600 dark:hover:text-white cursor-pointer rounded-lg my-2
              ${path === menu.path && 'bg-primary text-white dark:bg-blue-600 dark:text-white'}`}
          >
            <menu.icon />
            {menu.name}
          </h2>
        </Link>
      ))}

      {/* User Info Section */}
      <div className='flex gap-2 items-center bottom-5 fixed p-2 bg-white dark:bg-gray-900 w-90%'>
        <Image src={user?.picture || '/default-avatar.png'} width={35} height={35} alt='user' className='rounded-full' />
        <div>
          <h2 className='text-sm font-bold text-black dark:text-white'>
            {user?.given_name} {user?.family_name}
          </h2>
          <h2 className='text-xs text-slate-400 dark:text-gray-400'>{user?.email}</h2>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
