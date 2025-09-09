import React, { useContext } from 'react'
import { authContext } from '../contexts/AuthContext';
import LoginPage from "../pages/LoginPage"

export default function ProtectedRoute({ children }) {

    const { isLoggedIn } = useContext(authContext)

    return (
        
            isLoggedIn ? children : <LoginPage/>

    )
}
