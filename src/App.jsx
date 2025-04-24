import React, { useState } from 'react'
import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import AppLayout from './components/Layout/AppLayout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Message from './pages/Message';

const App = () => {
  const [loading,setLoading] = useState(true);

  const router = createBrowserRouter([
    {
      path:'/login',
      element: <Login />
    },
    {
      path:'/register',
      element:<Registration />
    },
    {
      path:'/',
      element:<AppLayout />,
      children:[
        {
          path:"/",
          element:(
            <Home />
          )
        },
        {
          path:"/about",
          element:(
            <About />
          )
        },
        {
          path:"/contact",
          element:(
            <Contact />
          )
        },
        {
          path:"/message",
          element:(
            <Message />
          )
        },
      ]
    }
  ])
  return (
    <div>
      <h1 className='text-red-600'>App</h1>
    </div>
  )
}

export default App
