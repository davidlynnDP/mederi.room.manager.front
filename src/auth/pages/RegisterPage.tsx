import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";

import { AuthLayout } from "../layout"
import { AuthContext } from "../../context";
import { UserRole } from "../../domain/enums";

interface Values {
  identificationNumber: string;
  email: string;
  names: string;
  lastNames: string;
  password: string;
  confirmPassword: string;
}

export const RegisterPage = () => {

  const { signUp, isLoading } = useContext( AuthContext );
  const [ showPassword, setShowPassword ] = useState<boolean>(false);
  const navigate = useNavigate();

  const { handleSubmit, errors, touched, getFieldProps } = useFormik({
    initialValues: {
      identificationNumber: '',
      email: '',
      names: '',
      lastNames: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async(values: Values) => {
      console.log( values );
      await signUp({
        identificationNumber: values.identificationNumber,
        email: values.email,
        names: values.names,
        lastNames: values.lastNames,
        password: values.password,
        role: UserRole.EMPLEADO
      });
      navigate('/');
    },
    validationSchema: Yup.object({
      identificationNumber: Yup.number()
        .typeError('El número de identificación debe ser un número')
        .required('Número de identificación es requerido'),
      names: Yup.string()
        .matches(/^(\w+\s?){1,2}$/, 'El nombre debe tener máximo dos palabras')
        .required('Nombre es requerido'),
      lastNames: Yup.string()
        .matches(/^(\w+\s?){1,2}$/, 'Los apellidos deben tener máximo dos palabras')
        .required('Apellidos son requeridos'),
      email: Yup.string()
        .email('El correo no tiene un formato válido')
        .required('Email es requerido'),
      password: Yup.string()
        .required('Contraseña es requerida'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
        .required('Confirma tu contraseña'),
    })
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center h-screen bg-[#F05A03]">
        {/* Título */}
        <div className="text-5xl font-bold text-white mb-10">Méderi</div>

        {/* Formulario de Registro */}
        <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-center text-[#F05A03] mb-6">
            Crear cuenta
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Columna 1 */}
              <div>
                <div>
                  <label htmlFor="identificationNumber" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Número de Identificación
                  </label>
                  <input
                    type="text"
                    {...getFieldProps('identificationNumber')}
                    className={`mt-1 w-full mb-2 p-3 border rounded-lg ${
                      touched.identificationNumber && errors.identificationNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="1234567890"
                  />
                  {touched.identificationNumber && errors.identificationNumber ? (
                    <div className="text-red-500 text-sm mt-1">{errors.identificationNumber}</div>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    {...getFieldProps('email')}
                    className={`mt-1 w-full mb-2 p-3 border rounded-lg ${
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
                      className={`mt-1 w-full mb-2 p-3 border rounded-lg ${
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
              </div>

              {/* Columna 2 */}
              <div>
                <div>
                  <label htmlFor="names" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Nombre(s)
                  </label>
                  <input
                    type="text"
                    {...getFieldProps('names')}
                    className={`mt-1 w-full mb-2 p-3 border rounded-lg ${
                      touched.names && errors.names ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="John"
                  />
                  {touched.names && errors.names ? (
                    <div className="text-red-500 text-sm mt-1">{errors.names}</div>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="lastNames" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    {...getFieldProps('lastNames')}
                    className={`mt-1 w-full mb-2 p-3 border rounded-lg ${
                      touched.lastNames && errors.lastNames ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Doe"
                  />
                  {touched.lastNames && errors.lastNames ? (
                    <div className="text-red-500 text-sm mt-1">{errors.lastNames}</div>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Confirmar contraseña
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...getFieldProps('confirmPassword')}
                    className={`mt-1 w-full mb-2 p-3 border rounded-lg ${
                      touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="********"
                  />
                  {touched.confirmPassword && errors.confirmPassword ? (
                    <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>
                  ) : null}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={ isLoading }
                className="w-full bg-[#F05A03] text-white p-3 rounded-lg hover:bg-[#F57931] transition-colors"
              >
                Registrarse
              </button>
            </div>

            <div className="text-center text-sm text-gray-500">
              ¿Ya tienes cuenta?{' '}
              <Link to="/auth/signin" className="text-[#F05A03] hover:text-[#F57931]">
                Inicia sesión aquí
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
 
}

