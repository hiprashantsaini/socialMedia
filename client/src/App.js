import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AdminDashboard from './components/AdminDashboard'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Signup from './components/Signup'
import UserForm from './components/UserForm'
import appContext from './utils/appContext'
const routes = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <AdminDashboard />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/post',
    element: <ProtectedRoute/>,
    children:[
      {
        path:'',
        element:<UserForm/>
      }
    ]
  }
])

const App = () => {
  const [userInfo, setUserInfo] = useState(null);
  return (
    <div>
      <appContext.Provider value={{userInfo:userInfo,setUserInfo:setUserInfo}}>
        <RouterProvider router={routes} />
      </appContext.Provider>
    </div>
  )
}

export default App