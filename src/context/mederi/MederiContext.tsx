import { createContext } from "react";
import { User, Reservation, Room } from "../../domain/models";
import { PaginationParams,
         CreateReservationsParams,
         CreateRoomParams,
         UpdateReservationsParams,
         UpdateRoomParams,
         UpdateUserParams,
         IFindAllReservation,
         IFindAllRooms, 
         IFindAllUsers } from "../../domain/interfaces";

interface MederiContextProps {

    users: User[];
    rooms: Room[];
    reservations: Reservation[];

    findAllUsers(paginationParams: PaginationParams): Promise<IFindAllUsers>;
    findOneUser(id: string): Promise<User>;
    updateUser(id: string, updateUserParams: UpdateUserParams): Promise<User>;
    removeUser(id: string): Promise<User>;

    createRoom(createRoomParams: CreateRoomParams): Promise<Room>;
    findAllRooms(paginationParams: PaginationParams): Promise<IFindAllRooms>;
    findRoomById(id: string): Promise<Room>;
    updateRoom(id: string, updateRoomParams: UpdateRoomParams): Promise<Room>;
    deleteRoom(id: string): Promise<Room>;

    createReservation(createReservationsParams: CreateReservationsParams): Promise<Reservation>;
    findAllReservations(paginationParams: PaginationParams): Promise<IFindAllReservation>;
    getReservationById(id: string): Promise<Reservation>;
    updateReservation(id: string, updateReservationsParams: UpdateReservationsParams): Promise<Reservation>;
    deleteReservation(id: string): Promise<Reservation>;
    getReservationsByUser(id: string, paginationParams: PaginationParams): Promise<IFindAllReservation>;
    getReservationsByRoom(id: string, paginationParams: PaginationParams): Promise<IFindAllReservation>;

    purgeInfo: () => void
}


export const MederiContext = createContext({} as MederiContextProps);