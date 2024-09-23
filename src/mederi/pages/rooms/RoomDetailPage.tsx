import { useParams, useNavigate } from 'react-router-dom';
import { MederiLayout } from '../../layout'
import { Loading } from '../../../shared';
import { useFetchRoom } from '../../../hooks';

export const RoomDetailPage = () => {

  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { loading, selectedRoom } = useFetchRoom(roomId!);

  if (!roomId || loading || !selectedRoom) {
    return (
      <Loading
        isLoading={loading}
        errorMessage={`Error al cargar los datos de la sala`}
        loadingMessage="Cargando, por favor espere..."
      />
    );
  }

  return (
    <MederiLayout>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#F05A03]">{selectedRoom.name}</h1>
          <button
            onClick={() => navigate(`/rooms/${roomId}/edit`)}
            className="bg-[#F57931] text-white py-2 px-4 rounded hover:bg-[#F05A03] transition duration-300"
          >
            Editar Sala
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-600">Capacidad:</h2>
            <p className="text-xl">{selectedRoom.capacity} personas</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-600">Ubicación:</h2>
            <p className="text-xl">{selectedRoom.location}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-600">Tipo de Sala:</h2>
            <p className="text-xl capitalize">{selectedRoom.roomType.toLowerCase()}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-600">Disponibilidad:</h2>
            <p className={`text-xl font-semibold ${selectedRoom.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
              {selectedRoom.isAvailable ? 'Disponible' : 'No Disponible'}
            </p>
          </div>

          <div className="col-span-2">
            <h2 className="text-lg font-semibold text-gray-600">Recursos:</h2>
            <ul className="mt-4">
              {selectedRoom.resources?.map((resource) => (
                <li key={resource.id} className="border-b border-gray-200 py-4">
                  <h3 className="text-xl font-bold text-[#F05A03]">{resource.name}</h3>
                  <p className="text-gray-600">Categoría: {resource.category}</p>
                  <p className="text-gray-600">Descripción: {resource.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          onClick={() => navigate('/rooms')}
          className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 transition duration-300"
        >
          Volver a las Salas
        </button>
      </div>
    </MederiLayout>
  );
}