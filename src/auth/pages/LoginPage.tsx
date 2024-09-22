import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { AuthLayout } from "../layout";
import { AuthContext } from "../../context";

interface Values {
  password: string;
  email: string;
}

export const LoginPage = () => {

  const { signIn, isLoading } = useContext( AuthContext );
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const { handleSubmit, errors, touched, getFieldProps } = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    onSubmit: async (values: Values) => {
      console.log(values);
      await signIn({ email: values.email, password: values.password });
      navigate('/');
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('El correo no tiene un formato válido')
        .required('Requerido'),
      password: Yup.string()
        .required('Requerido'),
    }),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center h-screen bg-[#F05A03]">
        <div className="text-5xl font-bold text-white mb-10">Méderi</div>
        
        <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-3xl font-bold text-center text-[#F05A03] mb-6">
            Iniciar sesión
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Correo electrónico
              </label>
              <input
                type="email"
                {...getFieldProps('email')}
                className={`mt-1 w-full p-3 border rounded-lg ${
                  touched.email && errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="example@mail.com"
              />
              {touched.email && errors.email ? (
                <div className="text-red-500 text-sm mt-1">{errors.email}</div>
              ) : null}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...getFieldProps('password')}
                  className={`mt-1 w-full p-3 border rounded-lg ${
                    touched.password && errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="********"
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              {touched.password && errors.password ? (
                <div className="text-red-500 text-sm mt-1">{errors.password}</div>
              ) : null}
            </div>

            <div>
              <button
                type="submit"
                disabled={ isLoading }
                className="w-full bg-[#F05A03] text-white p-3 rounded-lg hover:bg-[#F57931] transition-colors"
              >
                Iniciar sesión
              </button>
            </div>

            <div className="text-center text-sm text-gray-500">
              ¿No tienes cuenta?{' '}
              <Link to="/auth/signup" className="text-[#F05A03] hover:text-[#F57931]">
                Regístrate aquí
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};
