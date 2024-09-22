import { useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MederiContext } from '../../../context';
import { Meta, IFindAllReservation } from '../../../domain/interfaces';
import { Reservation } from '../../../domain/models';
import { MederiLayout } from '../../layout'
import { Pagination } from '../../../shared';
import { formatDate } from '../../../config/helpers';

export const ReservationsPage = () => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { findAllReservations } = useContext(MederiContext);

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [meta, setMeta] = useState<Meta>();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  const fetchUsers = useCallback(async () => {
    const { data, meta }: IFindAllReservation = await findAllReservations({ page, limit });
    setReservations(data);
    setMeta(meta);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handlePageChange = (newPage: number) => {
    navigate(`?page=${newPage}&limit=${limit}`);
    window.location.href = `?page=${newPage}&limit=${limit}`;
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
                  <td className="px-4 py-2">{formatDate(reservation.reservationDate)}</td>
                  <td className="px-4 py-2">{formatDate(reservation.startTime)}</td>
                  <td className="px-4 py-2">{formatDate(reservation.endTime)}</td>
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