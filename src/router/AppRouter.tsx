import { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import { AuthRoutes } from "../auth/routes";
import { MederiRoutes } from "../mederi/routes";
import { AuthContext } from "../context";
import { AuthStatus } from "../domain/enums";


export const AppRouter = () => {

  const { status } = useContext( AuthContext );

  return (
    <Routes>
      {
        status === AuthStatus.Authenticated ? (
          <Route path="/*" element={ <MederiRoutes /> } />
        ) : (
          <Route path="/auth/*" element={ <AuthRoutes /> } />
        )
      }
    </Routes>
  );
}