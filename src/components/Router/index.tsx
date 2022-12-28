import { createBrowserRouter, RouterProvider } from "react-router-dom";
import path from "../../constance/path";
import Container from "../layouts/Container";
import Home from "../pages/Home";
import Movies from '../pages/Movies'

const router = createBrowserRouter([
  {
    path: path.home,
    element: <Container />,
    children: [
      {
        path: path.home,
        element: <Home/>,
      },
      {
        path: path.movies,
        element: <Movies/>,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
