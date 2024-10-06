import React from 'react'

function Card({ icon, title, value }) {
  return (
    <div className='flex p-7 items-center bg-sky-100 dark:bg-gray-800 gap-5 rounded-lg shadow-md'>
      <div className='p-2 h-10 w-10 rounded-full bg-white dark:bg-gray-700 text-primary dark:text-white'>
        {icon}
      </div>
      <div>
        <h2 className='font-bold text-black dark:text-white'>{title}</h2>
        <h2 className='text-lg text-gray-700 dark:text-gray-300'>{value}</h2>
      </div>
    </div>
  )
}

export default Card;
