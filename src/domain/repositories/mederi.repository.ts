import { IFindAllReservation, IFindAllRooms, IFindAllUsers, PaginationParams, UpdateUserParams } from "../interfaces";
import { User, Room, Reservation } from "../models"
import { CreateRoomParams, 
         UpdateRoomParams, 
         CreateReservationsParams, 
         UpdateReservationsParams } from '../interfaces/mederi.interface';

export interface MederiRepository {

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

}