import { Navigate } from "react-router-dom";
import { LoginPage, RegisterPage } from "../auth/pages";


interface IRoute {
  path: string;
  element: JSX.Element;
  children?: IRoute[];
}

export const publicRoutes: IRoute[] = [
  {
    path: "signin",
    element: <LoginPage />,
  },
  {
    path: "signup",
    element: <RegisterPage />,
  },
  {
    path: "/*",
    element: <Navigate to="/auth/signin" />,
  },
];