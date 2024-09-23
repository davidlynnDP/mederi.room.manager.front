import { FC, ReactNode, useReducer } from "react";
import { MederiRepository } from "../../domain/repositories";
import { MederiContext } from "./MederiContext";
import { mederiReducer } from "./mederiReducer";
import { User, Room, Reservation } from "../../domain/models";
import { MederiRepositoryImpl } from "../../infrastructure/repositories/mederi.repository.impl";
import {
  PaginationParams,
  UpdateUserParams,
  CreateRoomParams,
  UpdateRoomParams,
  CreateReservationsParams,
  UpdateReservationsParams
} from "../../domain/interfaces";


export interface MederiState {
  users: User[];
  rooms: Room[];
  reservations: Reservation[];
}

const MEDERI_INITIAL_STATE: MederiState = {
  users: [],
  rooms: [],
  reservations: [],
};


interface MederiProviderProps {
  children: ReactNode;
}

export const MederiProviderDry: FC<MederiProviderProps> = ({ children }) => {

  const [state, dispatch] = useReducer(mederiReducer, MEDERI_INITIAL_STATE);

  const mederiRepository: MederiRepository = new MederiRepositoryImpl();

  async function handleAsync<T>(asyncFn: () => Promise<T>, onSuccess: (result: T) => void) {
    const result = await asyncFn();
    onSuccess(result);
    return result;
  }

  const findAllUsers = async(paginationParams: PaginationParams) =>
    await handleAsync(
      () => mederiRepository.findAllUsers(paginationParams),
      (users) => dispatch({ type: '[Mederi] - Set Users', payload: users.data })
    );

  const findOneUser = async(id: string) =>
    await handleAsync(() => mederiRepository.findOneUser(id), () => { });

  const updateUser = async(id: string, updateUserParams: UpdateUserParams) =>
    await handleAsync(
      () => mederiRepository.updateUser(id, updateUserParams),
      (updatedUser) => dispatch({ type: '[Mederi] - Update User', payload: updatedUser })
    );

  const removeUser = async(id: string) =>
    await handleAsync(
      () => mederiRepository.removeUser(id),
      () => dispatch({ type: '[Mederi] - Delete User', payload: { id } })
    );

  const createRoom = async(createRoomParams: CreateRoomParams) =>
    await handleAsync(
      () => mederiRepository.createRoom(createRoomParams),
      (newRoom) => dispatch({ type: '[Mederi] - Create Room', payload: newRoom })
    );

  const findAllRooms = async(paginationParams: PaginationParams) =>
    await handleAsync(
      () => mederiRepository.findAllRooms(paginationParams),
      (rooms) => dispatch({ type: '[Mederi] - Set Rooms', payload: rooms.data })
    );

  const findRoomById = async(id: string) =>
    await handleAsync(() => mederiRepository.findRoomById(id), () => { });

  const updateRoom = async(id: string, updateRoomParams: UpdateRoomParams) =>
    handleAsync(
      () => mederiRepository.updateRoom(id, updateRoomParams),
      (updatedRoom) => dispatch({ type: '[Mederi] - Update Room', payload: updatedRoom })
    );

  const deleteRoom = async(id: string) =>
    await handleAsync(
      () => mederiRepository.deleteRoom(id),
      () => dispatch({ type: '[Mederi] - Delete Room', payload: { id } })
    );

  const createReservation = async(createReservationsParams: CreateReservationsParams) =>
    await handleAsync(
      () => mederiRepository.createReservation(createReservationsParams),
      (newReservation) => dispatch({ type: '[Mederi] - Create Reservation', payload: newReservation })
    );

  const findAllReservations = async(paginationParams: PaginationParams) =>
    await handleAsync(
      () => mederiRepository.findAllReservations(paginationParams),
      (reservations) => dispatch({ type: '[Mederi] - Set Reservations', payload: reservations.data })
    );

  const getReservationById = async(id: string) =>
    await handleAsync(() => mederiRepository.getReservationById(id), () => { });

  const updateReservation = async(id: string, updateReservationsParams: UpdateReservationsParams) =>
    await handleAsync(
      () => mederiRepository.updateReservation(id, updateReservationsParams),
      (updatedReservation) => dispatch({ type: '[Mederi] - Update Reservation', payload: updatedReservation })
    );

  const deleteReservation = async(id: string) =>
    await handleAsync(
      () => mederiRepository.deleteReservation(id),
      () => dispatch({ type: '[Mederi] - Delete Reservation', payload: { id } })
    );

  const getReservationsByUser = async(id: string, paginationParams: PaginationParams) =>
    await handleAsync(() => mederiRepository.getReservationsByUser(id, paginationParams), () => { });

  const getReservationsByRoom = async(id: string, paginationParams: PaginationParams) =>
    await handleAsync(() => mederiRepository.getReservationsByRoom(id, paginationParams), () => { });

  const purgeInfo = () => {
    dispatch({ type: '[Mederi] - Logout' });
  };

  return (
    <MederiContext.Provider value={{
      ...state,
  
      findAllUsers,
      findOneUser,
      updateUser,
      removeUser,
  
      createRoom,
      findAllRooms,
      findRoomById,
      updateRoom,
      deleteRoom,
  
      createReservation,
      findAllReservations,
      getReservationById,
      updateReservation,
      deleteReservation,
      getReservationsByUser,
      getReservationsByRoom,
  
      purgeInfo
    }}>
      {children}
    </MederiContext.Provider>
  )

}

