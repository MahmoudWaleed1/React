import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function MainLayout() {
    const isLoggedIn = localStorage.getItem("token") != null;
    return (
        <>
            <Navbar />
            <div className='container py-2'>
                <Outlet />
            </div>
        </>
    )
}
