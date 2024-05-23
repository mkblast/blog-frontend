import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./ErrorPage";
import Post from "./components/Post";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Logout from "./components/Logout";

function Router() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/posts/:postId",
      element: <Post />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/signup",
      element: <Signup />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/logout",
      element: <Logout />,
      errorElement: <ErrorPage />,
    }
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
