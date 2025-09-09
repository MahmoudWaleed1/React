import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthLayout from './layouts/AuthLayout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MainLayout from './layouts/MainLayout'
import Feed from './pages/Feed'
import PostDetails from './pages/PostDetails'
import NotFound from './pages/NotFound'
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute'
import ProtectedAuthRoute from './ProtectedRoutes/ProtectedAuthRoute'

const router = createBrowserRouter([
  {
    path: '', element: <AuthLayout />, children: [
      { path: 'login', element:<ProtectedAuthRoute>  <LoginPage /> </ProtectedAuthRoute> },
      { path: 'register', element:<ProtectedAuthRoute>  <RegisterPage /> </ProtectedAuthRoute> },
    ]
  },
  {
    path: '', element: <MainLayout />, children: [
      { index: true, element: <ProtectedRoute> <Feed /> </ProtectedRoute> },
      { path: 'post/:id', element: <ProtectedRoute> <PostDetails /> </ProtectedRoute> },
      { path: '*', element: <NotFound /> }
    ]
  }
])

function App() {



  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
