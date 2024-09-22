import { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MederiContext } from '../../../context';
import { Reservation } from '../../../domain/models';
import { MederiLayout } from '../../layout'

export const ReservationDetailPage = () => {

  const { reservationId } = useParams<{ reservationId: string }>();
  const navigate = useNavigate();
  const { getReservationById } = useContext(MederiContext);

  const [loading, setLoading] = useState(true);
  const [selectedReservation, setSelectedReservation] = useState<Reservation>();

  useEffect(() => {
    setTimeout(async () => {
      if (reservationId) { 
        const fetchedReservation = await getReservationById(reservationId!);
        setSelectedReservation(fetchedReservation);
        setLoading(false);
      }
    }, 1000);
  }, []);

  if (loading) {
    return (
      <MederiLayout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl text-[#F57931]">Cargando datos de la reservacion...</p>
        </div>
      </MederiLayout>
    );
  }

  if (!selectedReservation) {
    return (
      <MederiLayout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl text-red-600">Error al cargar los datos de la reservacion</p>
        </div>
      </MederiLayout>
    );
  }

  const { reservationDate, startTime, endTime, status, user, room } = selectedReservation;

  return (
    <MederiLayout>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
        <h1 className="text-3xl font-bold text-[#F05A03] mb-6">Detalles de la Reservación</h1>

        <div className="mb-4">
          <h2 className="text-lg font-semibold">Información de la Reserva</h2>
          <p className="text-gray-700">Fecha de Reservación: <span className="font-bold">{reservationDate}</span></p>
          <p className="text-gray-700">Hora de Inicio: <span className="font-bold">{startTime}</span></p>
          <p className="text-gray-700">Hora de Fin: <span className="font-bold">{endTime}</span></p>
          <p className="text-gray-700">Estado: <span className="font-bold">{status}</span></p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold">Información del Usuario</h2>
          <p className="text-gray-700">Nombre: <span className="font-bold">{user?.names} {user?.lastNames}</span></p>
          <p className="text-gray-700">Correo: <span className="font-bold">{user?.email}</span></p>
          <p className="text-gray-700">Identificación: <span className="font-bold">{user?.identificationNumber}</span></p>
          <button
            className="bg-[#F05A03] text-white px-4 py-2 mt-4 rounded-lg hover:bg-[#F57931]"
            onClick={() => navigate(`/reservations/user/${user?.id}`)}
          >
            Ver reservaciones del usuario
          </button>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold">Información de la Sala</h2>
          <p className="text-gray-700">Sala: <span className="font-bold">{room?.name}</span></p>
          <p className="text-gray-700">Ubicación: <span className="font-bold">{room?.location}</span></p>
          <p className="text-gray-700">Capacidad: <span className="font-bold">{room?.capacity}</span></p>
          <p className="text-gray-700">Tipo de Sala: <span className="font-bold">{room?.roomType}</span></p>
          <button
            className="bg-[#F05A03] text-white px-4 py-2 mt-4 rounded-lg hover:bg-[#F57931]"
            onClick={() => navigate(`/reservations/room/${room?.id}`)}
          >
            Ver reservaciones de la sala
          </button>
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="bg-[#F05A03] text-white px-4 py-2 rounded-lg hover:bg-[#F57931]"
            onClick={() => navigate('/reservations')}
          >
            Volver a Reservaciones
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            onClick={() => navigate(`/reservations/${ reservationId }/edit`)}
          >
            Editar Reservación
          </button>
        </div>
      </div>
    </MederiLayout>
  );
}