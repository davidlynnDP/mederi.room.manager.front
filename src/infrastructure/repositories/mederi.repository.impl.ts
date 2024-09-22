import { MederiDataSource } from "../../domain/datasources";
import {
    PaginationParams,
    UpdateUserParams,
    CreateRoomParams,
    UpdateRoomParams,
    CreateReservationsParams,
    UpdateReservationsParams,
    IFindAllReservation,
    IFindAllUsers,
    IFindAllRooms
} from "../../domain/interfaces";
import { User, Room, Reservation } from "../../domain/models";
import { MederiRepository } from "../../domain/repositories";
import { MederiDatasourceImpl } from "../datasources/mederi.datasource.impl";


export class MederiRepositoryImpl implements MederiRepository {

    private datasource: MederiDataSource;

    constructor(datasource?: MederiDataSource) {
        this.datasource = datasource ?? new MederiDatasourceImpl(); //MederiDryDatasourceImpl | MederiDatasourceImpl
    }

    async findAllUsers(paginationParams: PaginationParams): Promise<IFindAllUsers> {
        return this.datasource.findAllUsers(paginationParams);
    }

    async findOneUser(id: string): Promise<User> {
        return this.datasource.findOneUser(id);
    }

    async updateUser(id: string, updateUserParams: UpdateUserParams): Promise<User> {
        return this.datasource.updateUser(id, updateUserParams);
    }

    async removeUser(id: string): Promise<User> {
        return this.datasource.removeUser(id);
    }

    async createRoom(createRoomParams: CreateRoomParams): Promise<Room> {
        return this.datasource.createRoom(createRoomParams);
    }

    async findAllRooms(paginationParams: PaginationParams): Promise<IFindAllRooms> {
        return this.datasource.findAllRooms(paginationParams);
    }

    async findRoomById(id: string): Promise<Room> {
        return this.datasource.findRoomById(id);
    }

    async updateRoom(id: string, updateRoomParams: UpdateRoomParams): Promise<Room> {
        return this.datasource.updateRoom(id, updateRoomParams);
    }

    async deleteRoom(id: string): Promise<Room> {
        return this.datasource.deleteRoom(id);
    }

    async createReservation(createReservationsParams: CreateReservationsParams): Promise<Reservation> {
        return this.datasource.createReservation(createReservationsParams);
    }

    async findAllReservations(paginationParams: PaginationParams): Promise<IFindAllReservation> {
        return this.datasource.findAllReservations(paginationParams);
    }

    async getReservationById(id: string): Promise<Reservation> {
        return this.datasource.getReservationById(id);
    }

    async updateReservation(id: string, updateReservationsParams: UpdateReservationsParams): Promise<Reservation> {
        return this.datasource.updateReservation(id, updateReservationsParams);
    }

    async deleteReservation(id: string): Promise<Reservation> {
        return this.datasource.deleteReservation(id);
    }

    async getReservationsByUser(id: string, paginationParams: PaginationParams): Promise<IFindAllReservation> {
        return this.datasource.getReservationsByUser(id, paginationParams);
    }

    async getReservationsByRoom(id: string, paginationParams: PaginationParams): Promise<IFindAllReservation> {
        return this.datasource.getReservationsByRoom(id, paginationParams);
    }

}