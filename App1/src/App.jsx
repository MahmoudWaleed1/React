import Home from "./Components/Home/Home.jsx"
import About from "./Components/About/About.jsx"
import Portfolio from "./Components/Portfolio/Portfolio.jsx"
import Contact from "./Components/Contact/Contact.jsx"
import Layout from "./Components/Layout/Layout.jsx"
import NotFound from "./Components/NotFound/NotFound.jsx"
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom"

  export default function App() {
  const router = createBrowserRouter([
    {
    path: "", element: <Layout/>, children: [
    {path:"", element: <Home/>},
    {path:"home", element: <Navigate to={"/"}/>},
    {path:"about", element: <About/>},
    {path:"portfolio", element: <Portfolio/>},
    {path:"contact", element: <Contact/>},
    {path:"*", element: <NotFound/>},
    ]
  }
])

  return <>
      <RouterProvider router={router}></RouterProvider>
          </>  
}
