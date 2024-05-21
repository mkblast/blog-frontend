import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./ErrorPage";
import Post from "./components/Post";
import Signup from "./components/Signup";

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
    }
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
