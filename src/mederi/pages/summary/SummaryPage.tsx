import { useContext } from "react";
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

import { MederiContext } from "../../../context";
import { Reservation, Room } from "../../../domain/models";
import { MederiLayout } from "../../layout";
import { DEFECT_ALL } from "../../../config/helpers";
import { useFetchMultipleData } from "../../../hooks";

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);


const ChartComponent = ({ data, title, type }: { data: any; title: string; type: 'pie' | 'bar' }) => {
  const ChartType = type === 'pie' ? Pie : Bar;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <ChartType data={data} />
    </div>
  );
};

export const SummaryPage = () => {

  const { findAllRooms, findAllReservations } = useContext(MederiContext);
  const { data: rooms } = useFetchMultipleData<Room>({
    fetchFunction: () => findAllRooms(DEFECT_ALL),
  });
  const { data: reservations } = useFetchMultipleData<Reservation>({
    fetchFunction: () => findAllReservations(DEFECT_ALL),
  });

  const totalRooms = rooms.length;
  const totalCapacity = rooms.reduce((acc, room) => acc + room.capacity, 0);
  const totalReservations = reservations.length;

  const roomTypesDistribution = rooms.reduce((acc, room) => {
    acc[room.roomType] = (acc[room.roomType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const reservationStatusDistribution = reservations.reduce((acc, reservation) => {
    acc[reservation.status] = (acc[reservation.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const roomTypeChartData = {
    labels: Object.keys(roomTypesDistribution),
    datasets: [
      {
        label: 'Tipo de Sala',
        data: Object.values(roomTypesDistribution),
        backgroundColor: ['#F05A03', '#F57931', '#FFA500', '#FF8C00'],
      },
    ],
  };

  const reservationStatusChartData = {
    labels: Object.keys(reservationStatusDistribution),
    datasets: [
      {
        label: 'Estado de Reserva',
        data: Object.values(reservationStatusDistribution),
        backgroundColor: ['#4CAF50', '#FF5252', '#FFC107'],
      },
    ],
  };

  return (
    <MederiLayout>
      <div className="p-6">
        <h1 className="text-4xl font-bold text-[#F05A03] mb-6">Panel de Estadísticas</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Total de Habitaciones</h2>
            <p className="text-3xl font-bold text-[#F05A03]">{totalRooms}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Capacidad Total</h2>
            <p className="text-3xl font-bold text-[#F05A03]">{totalCapacity} personas</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Total de Reservas</h2>
            <p className="text-3xl font-bold text-[#F05A03]">{totalReservations}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartComponent data={roomTypeChartData} title="Distribución por Tipo de Sala" type="pie" />
          <ChartComponent data={reservationStatusChartData} title="Distribución de Estados de Reservas" type="bar" />
        </div>
      </div>
    </MederiLayout>
  );
}
