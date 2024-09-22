import { useContext, useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { MederiContext } from '../../../context';
import { Meta, IFindAllReservation } from '../../../domain/interfaces';
import { Reservation } from '../../../domain/models';
import { MederiLayout } from '../../layout'
import { formatDate } from '../../../config/helpers';
import { Pagination } from '../../../shared';
import { ReservationStatus } from '../../../domain/enums';

export const ReservationByRoomPage = () => {

    const { roomId } = useParams<{ roomId: string }>();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { getReservationsByRoom } = useContext(MederiContext);

    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [meta, setMeta] = useState<Meta>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const status: ReservationStatus = (searchParams.get("status") as ReservationStatus) || ReservationStatus.PENDIENTE;

    const fetchReservations = useCallback(async () => {
        if (roomId) {
            const { data, meta }: IFindAllReservation = await getReservationsByRoom(roomId, { page, limit });
            setReservations(data);
            setMeta(meta);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchReservations();
    }, [fetchReservations]);

    const handlePageChange = (newPage: number) => {
        navigate(`?page=${newPage}&limit=${limit}&status=${status}`);
        window.location.href = `?page=${newPage}&limit=${limit}&status=${status}`;
    };

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = event.target.value as ReservationStatus;
        navigate(`?page=${page}&limit=${limit}&status=${newStatus}`);
        window.location.href = `?page=${page}&limit=${limit}&status=${newStatus}`;
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
                        Reservas para la Habitación
                    </h1>
                </div>

                <div className="mb-4">
                    <label htmlFor="status" className="mr-2 font-semibold text-[#F05A03]">Filtrar por estado:</label>
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
