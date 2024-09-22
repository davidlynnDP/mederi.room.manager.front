import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage } from '../pages';


export const AuthRoutes = () => {

  return (
    <Routes>
        <Route path="signin" element={ <LoginPage /> } />
        <Route path="signup" element={ <RegisterPage /> } />

        <Route path='/*' element={ <Navigate to="/auth/signin" /> } />
    </Routes>
  )
  
}