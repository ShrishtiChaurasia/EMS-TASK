import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Homepage from "../Pages/Homepage";
import AddTask from "../Pages/AddTask";
import EditTask from "../Pages/EditTask";
import ErrorPage from "../Pages/ErrorPage";

const approut = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/add",
        element: <AddTask />,
      },
      {
        path: "/:id/edit",
        element: <EditTask />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default approut;
