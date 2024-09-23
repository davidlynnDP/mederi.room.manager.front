import { useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MederiContext } from '../../../context';
import { Reservation } from '../../../domain/models';
import { MederiLayout } from '../../layout'
import { Loading, Pagination } from '../../../shared';
import { formatDate } from '../../../config/helpers';
import { ReservationStatus } from '../../../domain/enums';
import { useFetchMultipleData } from '../../../hooks';

export const ReservationsPage = () => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { findAllReservations } = useContext(MederiContext);

  const status: ReservationStatus = (searchParams.get("status") as ReservationStatus) || ReservationStatus.PENDIENTE;
  const { data: reservations, meta, isLoading, handlePageChange, page, limit } = useFetchMultipleData<Reservation>({
    fetchFunction: findAllReservations,
    additionalParams: { status }
  });

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as ReservationStatus;
    navigate(`?page=${page}&limit=${limit}&status=${newStatus}`);
    window.location.href = `?page=${page}&limit=${limit}&status=${newStatus}`;
  };

  if (isLoading) {
    return (
      <Loading
        isLoading={isLoading}
        errorMessage={`Error al cargar los datos de las reservaciones`}
        loadingMessage="Cargando, por favor espere..."
      />
    );
  }
  
  return (
    <MederiLayout>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#F05A03]">
            Administración de Reservas
          </h1>
          <button
            className="px-4 py-2 bg-[#F05A03] text-white rounded hover:bg-[#F57931]"
            onClick={() => navigate('/reservations/create')}
          >
            Crear Reserva
          </button>
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="mr-2 font-semibold text-[#F05A03]">
            Filtrar por estado:
          </label>
          <select
            id="status"
            className="px-4 py-2 border rounded"
            value={status}
            onChange={handleStatusChange}
          >
            <option value={ReservationStatus.PENDIENTE}>Pendiente</option>
            <option value={ReservationStatus.CONFIRMADO}>Confirmado</option>
            <option value={ReservationStatus.CANCELADO}>Cancelado</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-[#F57931] text-white">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Fecha de Reserva</th>
                <th className="px-4 py-2">Hora de Inicio</th>
                <th className="px-4 py-2">Hora de Fin</th>
                <th className="px-4 py-2">Estado</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation: Reservation) => (
                <tr key={reservation.id} className="border-b">
                  <td className="px-4 py-2">{reservation.id}</td>
                  <td className="px-4 py-2">{formatDate(reservation.reservationDate, true, false)}</td>
                  <td className="px-4 py-2">{formatDate(reservation.startTime, false, true)}</td>
                  <td className="px-4 py-2">{formatDate(reservation.endTime, false, true)}</td>
                  <td className="px-4 py-2">{reservation.status}</td>
                  <td className="px-4 py-2">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => navigate(`/reservations/${reservation.id}`)}
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
    </MederiLayout>
  );
}