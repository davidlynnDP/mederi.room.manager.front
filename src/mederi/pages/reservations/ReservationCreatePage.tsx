import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';

import { AuthContext, MederiContext } from "../../../context";
import { MederiLayout } from "../../layout";
import { IFindAllRooms } from "../../../domain/interfaces";
import { Room } from "../../../domain/models";

interface Values {
    userId: string;
    roomId: string;
    reservationDate: string;
    startTime: string;
    endTime: string;
}

export const ReservationCreatePage = () => {

    const navigate = useNavigate();
    const { createReservation, findAllRooms } = useContext( MederiContext );
    const { user } = useContext(AuthContext);

    const [rooms, setRooms] = useState<Room[]>([]);
  
    const [isLoading, setIsLoading] = useState<boolean>(true);
  
    const fetchRooms = useCallback(async () => {
      const { data }: IFindAllRooms = await findAllRooms({ page: 1, limit: 999 });
      setRooms(data);
      setIsLoading(false);
    }, []);
  
    useEffect(() => {
      fetchRooms();
    }, [fetchRooms]);

    const onSubmit = async(values: Values) => {
        const { userId, roomId, reservationDate, startTime, endTime } = values;

        const formattedReservationDate = new Date(`${reservationDate}T${startTime}:00Z`).toISOString();
        const formattedStartTime = new Date(`${reservationDate}T${startTime}:00Z`).toISOString();
        const formattedEndTime = new Date(`${reservationDate}T${endTime}:00Z`).toISOString();
    
        const payload = {
            userId,
            roomId,
            reservationDate: formattedReservationDate,
            startTime: formattedStartTime,
            endTime: formattedEndTime,
        };
    
        await createReservation(payload);
        navigate(`/reservations`);
    }

    const { handleSubmit, errors, touched, getFieldProps } = useFormik({
      initialValues: {
        userId: user.data.id ? user.data.id : '',
        roomId: '',
        reservationDate: '',
        startTime: '',
        endTime: ''
      },
      onSubmit: onSubmit,
      validationSchema: Yup.object({
        userId: Yup.string().uuid('ID de usuario inválido').required('Requerido'),
        roomId: Yup.string().uuid('ID de habitación inválido').required('Requerido'),
        reservationDate: Yup.date()
            .required('Requerido')
            .min(new Date(), 'La fecha de reserva no puede ser menor que hoy'),
        startTime: Yup.string()
            .required('Requerido')
            .test('is-valid-time', 'Hora de inicio inválida', value => {
                return !!value && /^\d{2}:\d{2}$/.test(value);
            }),
        endTime: Yup.string()
            .required('Requerido')
            .test('is-valid-time', 'Hora de fin inválida', value => {
                return !!value && /^\d{2}:\d{2}$/.test(value);
            })
            .test('is-after', 'La hora de fin debe ser posterior a la hora de inicio', function (value) {
                const { startTime } = this.parent;
                if (value && startTime) {
                    const start = new Date(`1970-01-01T${startTime}:00`);
                    const end = new Date(`1970-01-01T${value}:00`);
                    return end > start;
                }
                return true;
            }),
        }),
    });

    return (
        <MederiLayout>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-[#F05A03] mb-4">Crear Reserva</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="userId" className="block text-gray-700">ID de Usuario</label>
                        <input
                            id="userId"
                            type="text"
                            disabled
                            {...getFieldProps('userId')}
                            className={`mt-1 block w-full p-2 border rounded ${touched.userId && errors.userId ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {touched.userId && errors.userId ? (
                            <div className="text-red-500">{errors.userId}</div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="roomId" className="block text-gray-700">Habitación</label>
                        <select
                            id="roomId"
                            {...getFieldProps('roomId')}
                            className={`mt-1 block w-full p-2 border rounded ${touched.roomId && errors.roomId ? 'border-red-500' : 'border-gray-300'}`}
                        >
                            <option value="" label="Selecciona una habitación" />
                            {rooms.map((room) => (
                                <option key={room.id} value={room.id}>
                                    {room.name}
                                </option>
                            ))}
                        </select>
                        {touched.roomId && errors.roomId ? (
                            <div className="text-red-500">{errors.roomId}</div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="reservationDate" className="block text-gray-700">Fecha de Reserva</label>
                        <input
                            id="reservationDate"
                            type="date"
                            {...getFieldProps('reservationDate')}
                            className={`mt-1 block w-full p-2 border rounded ${touched.reservationDate && errors.reservationDate ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {touched.reservationDate && errors.reservationDate ? (
                            <div className="text-red-500">{errors.reservationDate}</div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="startTime" className="block text-gray-700">Hora de Inicio</label>
                        <input
                            id="startTime"
                            type="time"
                            {...getFieldProps('startTime')}
                            className={`mt-1 block w-full p-2 border rounded ${touched.startTime && errors.startTime ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {touched.startTime && errors.startTime ? (
                            <div className="text-red-500">{errors.startTime}</div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="endTime" className="block text-gray-700">Hora de Fin</label>
                        <input
                            id="endTime"
                            type="time"
                            {...getFieldProps('endTime')}
                            className={`mt-1 block w-full p-2 border rounded ${touched.endTime && errors.endTime ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {touched.endTime && errors.endTime ? (
                            <div className="text-red-500">{errors.endTime}</div>
                        ) : null}
                    </div>
                    <button
                        type="submit"
                        disabled={ isLoading }
                        className="px-4 py-2 bg-[#F05A03] text-white rounded hover:bg-[#F57931]"
                    >
                        Crear Reserva
                    </button>
                </form>
            </div>
        </MederiLayout>
    );

}
