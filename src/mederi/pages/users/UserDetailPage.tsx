import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext, MederiContext } from '../../../context';
import { MederiLayout } from '../../layout'
import { FaEdit, FaSignOutAlt } from 'react-icons/fa';
import { User } from '../../../domain/models';

export const UserDetailPage = () => {

  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { purgeInfo, findOneUser } = useContext(MederiContext);

  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User>();

  useEffect(() => {
    setTimeout(async () => {
      if (userId) { 
        const fetchedUser = await findOneUser(userId!);
        setSelectedUser(fetchedUser);
        setLoading(false);
      }
    }, 1000);
  }, []);

  const handleLogout = () => {
    logout();
    purgeInfo();
    navigate('/auth/signin');
  };

  if (loading) {
    return (
      <MederiLayout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl text-[#F57931]">Cargando datos del usuario...</p>
        </div>
      </MederiLayout>
    );
  }

  if (!selectedUser) {
    return (
      <MederiLayout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl text-red-600">Error al cargar los datos del usuario</p>
        </div>
      </MederiLayout>
    );
  }

  return (
    <MederiLayout>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-[#F05A03] mb-6 text-center">Detalles del Usuario</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-[#F57931] mb-2">Información General</h2>
            <p><strong>ID:</strong> {selectedUser.id}</p>
            <p><strong>Número de Identificación:</strong> {selectedUser.identificationNumber}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Nombres:</strong> {selectedUser.names}</p>
            <p><strong>Apellidos:</strong> {selectedUser.lastNames}</p>
            <p><strong>Rol:</strong> {selectedUser.role}</p>
            <p><strong>Activo en la plataforma:</strong> {selectedUser.isActive ? 'Sí' : 'No'}</p>
          </div>
          
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-[#F57931] mb-2">Fechas</h2>
            <p><strong>Creado el:</strong> {new Date(selectedUser.createdAt).toLocaleDateString()}</p>
            <p><strong>Actualizado el:</strong> {new Date(selectedUser.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate(`/users/${ userId }/edit`)}
            className="bg-[#F57931] text-white py-2 px-4 rounded flex items-center hover:bg-[#F05A03] transition duration-200"
          >
            <FaEdit className="mr-2" /> Editar Usuario
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded flex items-center hover:bg-red-700 transition duration-200"
          >
            <FaSignOutAlt className="mr-2" /> Cerrar Sesión
          </button>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-4 w-full bg-[#F57931] text-white py-2 px-4 rounded hover:bg-[#F05A03] transition duration-200"
        >
          Volver
        </button>
      </div>
    </MederiLayout>
  );
}