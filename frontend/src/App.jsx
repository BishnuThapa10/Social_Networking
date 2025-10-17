import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout.jsx";
import Home from "./home/Home.jsx";
import LoginForm from "./features/auth/LoginForm.jsx";


export default function App() {
  
  const router = createBrowserRouter([
    {

      path:'/',
      element: <RootLayout/> ,
      children: [
        {
          index: true,
          element: <Home/>
        },

        {
          path:'login',
          element:<LoginForm/>
        },
      ]

    }
  ]);

  return <RouterProvider router={router}/>

}
