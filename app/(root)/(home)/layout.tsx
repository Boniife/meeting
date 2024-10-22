import React, { ReactNode } from 'react'

const HomeLayout = ({ children}: {children: ReactNode}) => {
  return (
    <main className='relative'>
        Navbar 

        <div className='flex'>
            Sidebar


        </div>
      {children}
    </main>
  )
}

export default HomeLayout
