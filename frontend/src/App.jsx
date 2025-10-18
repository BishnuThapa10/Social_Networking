import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout.jsx";
import LoginForm from "./features/auth/LoginForm.jsx";
import Home from "./features/home/Home.jsx";
import RegisterForm from "./features/auth/RegisterForm.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import ProctedRoute from "./components/ProctedRoute.jsx";


export default function App() {

  const router = createBrowserRouter([
    {

      path: '/',
      element: <RootLayout />,
      children: [
        {
          element: <ProctedRoute/>,
          children : [
             {
          index: true,
          element: <Home />
        },
          ]
        },
       
        {
          element: <PublicRoute />,
          children: [
            {
              path: 'login',
              element: <LoginForm />
            },

            {
              path: 'register',
              element: <RegisterForm />
            },
          ]
        }

      ]

    }
  ]);

  return <RouterProvider router={router} />

}
