import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';

import { MederiLayout } from "../../layout"
import { AuthContext, MederiContext } from "../../../context";
import { UserRole } from "../../../domain/enums";

interface Values {
  identificationNumber?: string;
  email?: string;
  names?: string;
  lastNames?: string;
  role?: UserRole;
}

export const UserEditPage = () => {

  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { user } = useContext( AuthContext );
  const { updateUser, removeUser, findOneUser } = useContext( MederiContext );

  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<Values>();

  useEffect(() => {
    setTimeout(async () => {
      if (user.data.role === UserRole.ADMINISTRADOR && userId) {
        const fetchedUser = await findOneUser(userId);
        setSelectedUser(fetchedUser);
      } else {
        const { id,
                isActive,
                createdAt,
                updatedAt, ...resume } = user.data;
        setSelectedUser( resume );
      }
      setLoading(false);
    }, 1000);
  }, []);
  
  if (!userId) {
    return (
      <MederiLayout>
        <div className="text-center mt-10">
          <p className="text-red-600 text-xl">Error: No se ha proporcionado un ID de usuario válido.</p>
        </div>
      </MederiLayout>
    );
  }

  const { handleSubmit, errors, touched, getFieldProps } = useFormik({
    initialValues: {
      identificationNumber: '',
      email: '',
      names: '',
      lastNames: '',
      role: undefined,
    },
    onSubmit: async(values: Values) => {
      await updateUser(
        userId,{
          identificationNumber: values.identificationNumber,
          email: values.email,
          names: values.names,
          lastNames: values.lastNames,
          role: values.role
        }
      );
      navigate(`/users/${ userId }`);
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
      role: Yup.string()
        .oneOf([UserRole.ADMINISTRADOR, UserRole.EMPLEADO], 'Rol no válido') 
        .required('Rol es requerido'),
    })
  });
  
  const handleRemove = async () => {
    await removeUser(userId!);
    navigate("/users");
  };

  return (
    <MederiLayout>
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-[#F05A03] mb-8 text-center">Editar Usuario</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Número de Identificación */}
          <div>
            <label className="block text-lg font-medium text-gray-700" htmlFor="identificationNumber">
              Número de Identificación
            </label>
            <input
              type="text"
              id="identificationNumber"
              placeholder={ selectedUser?.identificationNumber }
              {...getFieldProps("identificationNumber")}
              className={`mt-2 block w-full p-3 border ${
                touched.identificationNumber && errors.identificationNumber ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:ring-[#F05A03] focus:border-[#F05A03]`}
            />
            {touched.identificationNumber && errors.identificationNumber ? (
              <div className="text-red-500 text-sm mt-1">{errors.identificationNumber}</div>
            ) : null}
          </div>

          {/* Email */}
          <div>
            <label className="block text-lg font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder={ selectedUser?.email }
              {...getFieldProps("email")}
              className={`mt-2 block w-full p-3 border ${
                touched.email && errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:ring-[#F05A03] focus:border-[#F05A03]`}
            />
            {touched.email && errors.email ? (
              <div className="text-red-500 text-sm mt-1">{errors.email}</div>
            ) : null}
          </div>

          {/* Nombres */}
          <div>
            <label className="block text-lg font-medium text-gray-700" htmlFor="names">
              Nombres
            </label>
            <input
              type="text"
              id="names"
              {...getFieldProps("names")}
              placeholder={ selectedUser?.names }
              className={`mt-2 block w-full p-3 border ${
                touched.names && errors.names ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:ring-[#F05A03] focus:border-[#F05A03]`}
            />
            {touched.names && errors.names ? (
              <div className="text-red-500 text-sm mt-1">{errors.names}</div>
            ) : null}
          </div>

          {/* Apellidos */}
          <div>
            <label className="block text-lg font-medium text-gray-700" htmlFor="lastNames">
              Apellidos
            </label>
            <input
              type="text"
              id="lastNames"
              placeholder={ selectedUser?.lastNames }
              {...getFieldProps("lastNames")}
              className={`mt-2 block w-full p-3 border ${
                touched.lastNames && errors.lastNames ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:ring-[#F05A03] focus:border-[#F05A03]`}
            />
            {touched.lastNames && errors.lastNames ? (
              <div className="text-red-500 text-sm mt-1">{errors.lastNames}</div>
            ) : null}
          </div>

          {/* Role (solo visible para administradores) */}
          {user.data.role === UserRole.ADMINISTRADOR && (
            <div>
              <label className="block text-lg font-medium text-gray-700" htmlFor="role">
                Rol
              </label>
              <select
                id="role"
                {...getFieldProps("role")}
                defaultValue={ selectedUser?.role }
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#F05A03] focus:border-[#F05A03]"
              >
                <option value={UserRole.EMPLEADO}>Empleado</option>
                <option value={UserRole.ADMINISTRADOR}>Administrador</option>
              </select>
            </div>
          )}

          {/* Botones */}
          <div className="flex justify-between items-center mt-6">
            <button
              type="submit"
              disabled={ loading }
              className="bg-[#F57931] text-white py-2 px-6 rounded-lg hover:bg-[#F05A03] transition duration-200"
            >
              Actualizar Usuario
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition duration-200"
            >
              Inactivar Cuenta
            </button>
          </div>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-6 w-full bg-[#F57931] text-white py-3 px-6 rounded-lg hover:bg-[#F05A03] transition duration-200"
          >
            Volver
          </button>
        </form>
      </div>
    </MederiLayout>
  );
}
