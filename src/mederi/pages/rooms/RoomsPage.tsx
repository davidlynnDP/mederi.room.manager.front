import { useContext, useState, useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MederiContext } from "../../../context";
import { Meta, IFindAllRooms } from "../../../domain/interfaces";
import { Room } from "../../../domain/models";
import { Pagination } from "../../../shared";
import { MederiLayout } from "../../layout";

export const RoomsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { findAllRooms } = useContext(MederiContext);

  const [rooms, setRooms] = useState<Room[]>([]);
  const [meta, setMeta] = useState<Meta>();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const isAvailable = searchParams.get("isAvailable") === "true"

  const fetchRooms = useCallback(async () => {
    const { data, meta }: IFindAllRooms = await findAllRooms({ page, limit, isAvailable });
    setRooms(data);
    setMeta(meta);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const handlePageChange = (newPage: number) => {
    navigate(`?page=${newPage}&limit=${limit}&isAvailable=${isAvailable}`);
    window.location.href = `?page=${newPage}&limit=${limit}&isAvailable=${isAvailable}`;
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newAvailable = event.target.value === "true";
    navigate(`?page=${page}&limit=${limit}&isAvailable=${newAvailable}`);
    window.location.href = `?page=${page}&limit=${limit}&isAvailable=${newAvailable}`;
  };

  if (isLoading) {
    return (
      <MederiLayout>
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg text-[#F05A03] font-semibold">Cargando, por favor espere...</p>
        </div>
      </MederiLayout>
    );
  }

  return (
    <MederiLayout>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#F05A03]">Administración de Salas</h1>
          <button
            className="px-4 py-2 bg-[#F05A03] text-white rounded hover:bg-[#F57931]"
            onClick={() => navigate('/rooms/create')}
          >
            Crear Sala
          </button>
        </div>

        {/* Filtro de disponibilidad */}
        <div className="mb-6">
          <label htmlFor="status" className="mr-2 text-lg text-[#F05A03]">Disponibilidad:</label>
          <select
            id="status"
            value={isAvailable.toString()}
            onChange={handleStatusChange}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="true">Disponible</option>
            <option value="false">No Disponible</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-[#F57931] text-white">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Capacidad</th>
                <th className="px-4 py-2">Ubicación</th>
                <th className="px-4 py-2">Tipo de Sala</th>
                <th className="px-4 py-2">Disponible</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room: Room) => (
                <tr key={room.id} className="border-b">
                  <td className="px-4 py-2">{room.id}</td>
                  <td className="px-4 py-2">{room.name}</td>
                  <td className="px-4 py-2">{room.capacity}</td>
                  <td className="px-4 py-2">{room.location}</td>
                  <td className="px-4 py-2">{room.roomType}</td>
                  <td className="px-4 py-2">{room.isAvailable ? "Sí" : "No"}</td>
                  <td className="px-4 py-2">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => navigate(`/rooms/${room.id}`)}
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Componente de paginación */}
        {meta && <Pagination meta={meta} onPageChange={handlePageChange} />}
      </div>
    </MederiLayout>
  );
};
