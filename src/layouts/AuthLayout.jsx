import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function AuthLayout() {
    return (
        <>
            <Navbar />
            <div className='max-w-xl mx-auto my-10 shadow-xl px-4 py-10 rounded-lg *:flex *:flex-col *:gap-6'>
                <Outlet />
            </div>
        </>
    )
}
