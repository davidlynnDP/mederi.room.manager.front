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
  UpdateReservationsParams,
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

export const MederiProvider: FC<MederiProviderProps> = ({ children }) => {

  const [state, dispatch] = useReducer(mederiReducer, MEDERI_INITIAL_STATE);
  const mederiRepository: MederiRepository = new MederiRepositoryImpl();

  const findAllUsers = async (paginationParams: PaginationParams) => {
    const users = await mederiRepository.findAllUsers(paginationParams);
    dispatch({ type: '[Mederi] - Set Users', payload: users.data });
    return users;
  };

  const findOneUser = async (id: string) => {
    const user = await mederiRepository.findOneUser(id);
    return user;
  };

  const updateUser = async (id: string, updateUserParams: UpdateUserParams) => {
    const updatedUser = await mederiRepository.updateUser(id, updateUserParams);
    dispatch({ type: '[Mederi] - Update User', payload: updatedUser });
    return updatedUser;
  };

  const removeUser = async (id: string) => {
    const removedUser = await mederiRepository.removeUser(id);
    dispatch({ type: '[Mederi] - Delete User', payload: { id } });
    return removedUser;
  };

  const createRoom = async (createRoomParams: CreateRoomParams) => {
    const newRoom = await mederiRepository.createRoom(createRoomParams);
    dispatch({ type: '[Mederi] - Create Room', payload: newRoom });
    return newRoom;
  };

  const findAllRooms = async (paginationParams: PaginationParams) => {
    const rooms = await mederiRepository.findAllRooms(paginationParams);
    dispatch({ type: '[Mederi] - Set Rooms', payload: rooms.data });
    return rooms;
  };

  const findRoomById = async (id: string) => {
    const room = await mederiRepository.findRoomById(id);
    return room;
  };

  const updateRoom = async (id: string, updateRoomParams: UpdateRoomParams) => {
    const updatedRoom = await mederiRepository.updateRoom(id, updateRoomParams);
    dispatch({ type: '[Mederi] - Update Room', payload: updatedRoom });
    return updatedRoom;
  };

  const deleteRoom = async (id: string) => {
    const removedRoom = await mederiRepository.deleteRoom(id);
    dispatch({ type: '[Mederi] - Delete Room', payload: { id } });
    return removedRoom;
  };

  const createReservation = async (createReservationsParams: CreateReservationsParams) => {
    const newReservation = await mederiRepository.createReservation(createReservationsParams);
    dispatch({ type: '[Mederi] - Create Reservation', payload: newReservation });
    return newReservation;
  };

  const findAllReservations = async (paginationParams: PaginationParams) => {
    const reservations = await mederiRepository.findAllReservations(paginationParams);
    dispatch({ type: '[Mederi] - Set Reservations', payload: reservations.data });
    return reservations;
  };

  const getReservationById = async (id: string) => {
    const reservation = await mederiRepository.getReservationById(id);
    return reservation;
  };

  const updateReservation = async (id: string, updateReservationsParams: UpdateReservationsParams) => {
    const updatedReservation = await mederiRepository.updateReservation(id, updateReservationsParams);
    dispatch({ type: '[Mederi] - Update Reservation', payload: updatedReservation });
    return updatedReservation;
  };

  const deleteReservation = async (id: string) => {
    const removedReservation = await mederiRepository.deleteReservation(id);
    dispatch({ type: '[Mederi] - Delete Reservation', payload: { id } });
    return removedReservation;
  };

  const getReservationsByUser = async (id: string, paginationParams: PaginationParams) => {
    const reservations = await mederiRepository.getReservationsByUser(id, paginationParams);
    return reservations;
  };

  const getReservationsByRoom = async (id: string, paginationParams: PaginationParams) => {
    const reservations = await mederiRepository.getReservationsByRoom(id, paginationParams);
    return reservations;
  };

  const purgeInfo = () => {
    dispatch({ type: '[Mederi] - Logout' });
  };

  return (
    <MederiContext.Provider
      value={{
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

        purgeInfo,
      }}
    >
      {children}
    </MederiContext.Provider>
  );
};
