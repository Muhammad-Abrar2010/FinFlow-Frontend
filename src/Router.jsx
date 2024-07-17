import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Root from "./Root";
import SwitchableForm from "./Pages/Auth/SwitchableForm";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <App></App>,
      },
      {
        path:"/auth",
        element: <SwitchableForm></SwitchableForm>
      }
    ],
  },
]);

export default router;
