import { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";

import { AuthLayout } from "../layout";
import { AuthContext } from "../../context";
import { TextField, PasswordField } from "../components";

interface Values {
  password: string;
  email: string;
}

export const LoginPage = () => {

  const { signIn, isLoading } = useContext( AuthContext );
  const navigate = useNavigate();

  const { handleSubmit, errors, touched, getFieldProps } = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    onSubmit: async (values: Values) => {
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

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center h-screen bg-[#F05A03]">
        <div className="text-5xl font-bold text-white mb-10">Méderi</div>
        
        <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-3xl font-bold text-center text-[#F05A03] mb-6">
            Iniciar sesión
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <TextField
              label="Correo electrónico"
              type="email"
              placeholder="example@mail.com"
              fieldProps={getFieldProps('email')}
              touched={touched.email}
              error={errors.email}
            />

            <PasswordField
              label="Contraseña"
              fieldProps={getFieldProps('password')}
              touched={touched.password}
              error={errors.password}
            />

            <div>
              <button
                type="submit"
                disabled={isLoading}
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
