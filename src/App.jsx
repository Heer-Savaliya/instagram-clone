import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import AppLayout from "./components/Layout/AppLayout";
import Home from "./pages/Home";
import Message from "./pages/Message";
import Loader from "./components/Ui/Loader";
import PrivateRoute from "./route/PrivateRoute";
import AddPost from "./pages/AddPost";
import Profile from "./pages/Profile";
import Favourites from "./pages/Favourites";
import Reels from "./pages/Reels";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import OtherUser from "./pages/OtherUser";
import ForgetPassword from "./pages/ForgetPassword";
import EditProfile from "./pages/EditProfile";
import Setting from "./pages/Setting";
import AllUsers from "./pages/AllUsers";

const App = () => {
  const [loading, setLoading] = useState(true);

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Registration />,
    },
    {
      path: "/forget-password",
      element: <ForgetPassword />,
    },
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: (
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          ),
        },
        {
          path: "/profile",
          element: (
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          ),
        },
        {
          path: "/other-profile/:id",
          element: (
            <PrivateRoute>
              <OtherUser />
            </PrivateRoute>
          ),
        },
        {
          path: "/favourite",
          element: (
            <PrivateRoute>
              <Favourites />
            </PrivateRoute>
          ),
        },
        {
          path: "/message",
          element: (
            <PrivateRoute>
              <Message />
            </PrivateRoute>
          ),
        },
        {
          path: "/add-post",
          element: (
            <PrivateRoute>
              <AddPost />
            </PrivateRoute>
          ),
        },
        {
          path: "/reels",
          element: (
            <PrivateRoute>
              <Reels />
            </PrivateRoute>
          ),
        },
        {
          path: "/help",
          element: (
            <PrivateRoute>
              <Help />
            </PrivateRoute>
          ),
        },
        {
          path: "/setting",
          element: (
            <PrivateRoute>
              <Setting />
            </PrivateRoute>
          ),
        },
        {
          path: "/edit-profile",
          element: (
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          ),
        },
        {
          path: "/all-users",
          element: (
            <PrivateRoute>
              <AllUsers />
            </PrivateRoute>
          ),
        },
        {
          path: "*",
          element: (
            <PrivateRoute>
              <NotFound />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <SearchProvider>
      <RouterProvider router={router} />
    </SearchProvider>
  );
};

export default App;
