import { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";

import { AuthLayout } from "../layout"
import { AuthContext } from "../../context";
import { UserRole } from "../../domain/enums";
import { TextField, PasswordField } from "../components";

interface Values {
  identificationNumber: string;
  email: string;
  names: string;
  lastNames: string;
  password: string;
  confirmPassword: string;
}

export const RegisterPage = () => {

  const { signUp, isLoading } = useContext(AuthContext);
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
    onSubmit: async (values: Values) => {
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

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center h-screen bg-[#F05A03]">
        <div className="text-5xl font-bold text-white mb-10">Méderi</div>
        <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-center text-[#F05A03] mb-6">Crear cuenta</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <TextField
                label="Número de Identificación"
                type="text"
                fieldProps={getFieldProps('identificationNumber')}
                touched={touched.identificationNumber}
                error={errors.identificationNumber}
                placeholder="1234567890"
              />
              <TextField
                label="Correo electrónico"
                type="email"
                fieldProps={getFieldProps('email')}
                touched={touched.email}
                error={errors.email}
                placeholder="example@mail.com"
              />
              <TextField
                label="Nombre(s)"
                type="text"
                fieldProps={getFieldProps('names')}
                touched={touched.names}
                error={errors.names}
                placeholder="John"
              />
              <TextField
                label="Apellidos"
                type="text"
                fieldProps={getFieldProps('lastNames')}
                touched={touched.lastNames}
                error={errors.lastNames}
                placeholder="Doe"
              />
              <PasswordField
                label="Contraseña"
                fieldProps={getFieldProps('password')}
                touched={touched.password}
                error={errors.password}
              />
              <PasswordField
                label="Confirmar contraseña"
                fieldProps={getFieldProps('confirmPassword')}
                touched={touched.confirmPassword}
                error={errors.confirmPassword}
              />
            </div>

            <button type="submit" disabled={isLoading} className="w-full bg-[#F05A03] text-white p-3 rounded-lg hover:bg-[#F57931]">
              Registrarse
            </button>

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

