import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext, MederiContext } from "../../../context";
import { MederiLayout } from "../../layout";
import { User } from "../../../domain/models";
import { UserRole } from "../../../domain/enums";
import { Loading, Modal, Pagination } from "../../../shared";
import { useFetchMultipleData, useModal } from "../../../hooks";

export const UsersPage = () => {

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { findAllUsers } = useContext(MederiContext);
  const { showModal, closeModal, setShowModal} = useModal("/");

  const { data: users, meta, isLoading, handlePageChange } = useFetchMultipleData<User>({
    fetchFunction: findAllUsers,
  });

  useEffect(() => {
    if (user.data.role !== UserRole.ADMINISTRADOR) {
      setShowModal(true);
    }
  }, [user]);

  if (isLoading) {
    return (
      <Loading
        isLoading={isLoading}
        errorMessage={`Error al cargar los datos de los usuarios`}
        loadingMessage="Cargando, por favor espere..."
      />
    );
  }

  return (
    <MederiLayout>
      {user.data.role !== UserRole.EMPLEADO && (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-[#F05A03] mb-6">
            Administración de Usuarios
          </h1>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-[#F57931] text-white">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Correo Electrónico</th>
                  <th className="px-4 py-2">Rol</th>
                  <th className="px-4 py-2">Activo</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: User) => (
                  <tr key={user.id} className="border-b">
                    <td className="px-4 py-2">{user.id}</td>
                    <td className="px-4 py-2">{`${user.names} ${user.lastNames}`}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.role}</td>
                    <td className="px-4 py-2">{user.isActive ? "Sí" : "No"}</td>
                    <td className="px-4 py-2">
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => navigate(`/users/${user.id}`)}
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {meta && (
            <Pagination meta={meta} onPageChange={handlePageChange} />
          )}
        </div>
      )}

      {showModal && (
        <Modal
          title="Acceso Restringido"
          message="Esta página es solo para administradores. Será redirigido."
          onClose={closeModal}
        />
      )}
    </MederiLayout>
  );
};
