import React, { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import AppLayout from './components/Layout/AppLayout';
import Home from './pages/Home';
import About from './pages/About';
import Message from './pages/Message';
import Loader from './components/Ui/Loader';
import PrivateRoute from './route/PrivateRoute';
import AddPost from './pages/AddPost';
import Profile from './pages/Profile';
import Favourites from './pages/Favourites';

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
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          )
        },
        {
          path:"/about",
          element:(
            <PrivateRoute>
              <About />
            </PrivateRoute>
          )
        },
        {
          path:"/profile",
          element:(
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          )
        },
        {
          path:"/favourite",
          element:(
            <PrivateRoute>
              <Favourites />
            </PrivateRoute>
          )
        },
        {
          path:"/message",
          element:(
            <PrivateRoute>
              <Message />
            </PrivateRoute>
          )
        },
        {
          path:"/add-post",
          element:(
            <PrivateRoute>
              <AddPost />
            </PrivateRoute>
          )
        },
      ]
    }
  ]);

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setLoading(false);
    },2000);
    return ()=> clearTimeout(timer);
  },[]);
  return (
      loading ? <Loader />:<RouterProvider router={router}></RouterProvider>
  )
}

export default App
