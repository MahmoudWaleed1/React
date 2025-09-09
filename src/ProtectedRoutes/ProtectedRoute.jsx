import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { authContext } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
    const { isLoggedIn } = useContext(authContext)

    return isLoggedIn ? children : <Navigate to="/login" />;
}