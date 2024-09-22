import { isAxiosError } from "axios";
import { MederiDataSource } from "../../domain/datasources";
import { mederiApi } from "../../config/api";
import { CreateReservationsParams, 
         CreateRoomParams, 
         IFindAllReservation, 
         IFindAllRooms, 
         IFindAllUsers, 
         PaginationParams, 
         UpdateReservationsParams, 
         UpdateRoomParams, 
         UpdateUserParams } from "../../domain/interfaces";
import { Reservation, Room, User } from "../../domain/models";

interface ApiCallParams {
    method: 'get' | 'post' | 'patch' | 'delete';
    url: string;
    data?: object;
    params?: object;
}

export class MederiDryDatasourceImpl implements MederiDataSource {

    private handleError(error: unknown): never {

        if (isAxiosError(error)) {
            console.error(`API error: ${error.response?.status} - ${error.response?.statusText}`);
            throw new Error(`API Error: ${error.response?.statusText || 'Unknown Error'}`);
        } else {
            console.error(`Unexpected error: ${error}`);
            throw new Error('An unexpected error occurred');
        }
    }

    private async apiCall<T>({ method, url, data, params }: ApiCallParams): Promise<T> {
        try {
            const response = await mederiApi.request<T>({
                method,
                url,
                data,
                params
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }
    
    async findAllUsers(paginationParams: PaginationParams): Promise<IFindAllUsers> {
        const { page, limit } = paginationParams;
        return await this.apiCall<IFindAllUsers>({
            method: 'get',
            url: '/users/find',
            params: { page, limit },
        });
    }

    async findOneUser(id: string): Promise<User> {
        return this.apiCall<User>({
            method: 'get',
            url: `/users/find/${ id }`,
        });
    }

    async updateUser(id: string, updateUserParams: UpdateUserParams): Promise<User> {
        return this.apiCall<User>({
            method: 'patch',
            url: `/users/${ id }`,
            data: updateUserParams,
        });
    }

    async removeUser(id: string): Promise<User> {
        return this.apiCall<User>({
            method: 'delete',
            url: `/users/${ id }`,
        });
    }

    async createRoom(createRoomParams: CreateRoomParams): Promise<Room> {
        return this.apiCall<Room>({
            method: 'post',
            url: '/rooms',
            data: createRoomParams,
        });
    }

    async findAllRooms(paginationParams: PaginationParams): Promise<IFindAllRooms> {
        const { page, limit, isAvailable } = paginationParams;
        return this.apiCall<IFindAllRooms>({
            method: 'get',
            url: '/rooms/find',
            params: { page, limit, isAvailable },
        });
    }

    async findRoomById(id: string): Promise<Room> {
        return this.apiCall<Room>({
            method: 'get',
            url: `/rooms/find/${ id }`,
        });
    }

    async updateRoom(id: string, updateRoomParams: UpdateRoomParams): Promise<Room> {
        return this.apiCall<Room>({
            method: 'patch',
            url: `/rooms/${ id }`,
            data: updateRoomParams,
        });
    }

    async deleteRoom(id: string): Promise<Room> {
        return this.apiCall<Room>({
            method: 'delete',
            url: `/rooms/${ id }`,
        });
    }

    async createReservation(createReservationsParams: CreateReservationsParams): Promise<Reservation> {
        return this.apiCall<Reservation>({
            method: 'post',
            url: '/reservations',
            data: createReservationsParams,
        });
    }

    async findAllReservations(paginationParams: PaginationParams): Promise<IFindAllReservation> {
        const { page, limit, status } = paginationParams;
        return this.apiCall<IFindAllReservation>({
            method: 'get',
            url: '/reservations/find',
            params: { page, limit, status },
        });
    }

    async getReservationById(id: string): Promise<Reservation> {
        return this.apiCall<Reservation>({
            method: 'get',
            url: `/reservations/find/${id}`,
        });
    }

    async updateReservation(id: string, updateReservationsParams: UpdateReservationsParams): Promise<Reservation> {
        return this.apiCall<Reservation>({
            method: 'patch',
            url: `/reservations/${ id }`,
            data: updateReservationsParams,
        });
    }

    async deleteReservation(id: string): Promise<Reservation> {
        return this.apiCall<Reservation>({
            method: 'delete',
            url: `/reservations/${ id }`,
        });
    }

    async getReservationsByUser(id: string, paginationParams: PaginationParams): Promise<IFindAllReservation> {
        const { page, limit, status } = paginationParams;
        return this.apiCall<IFindAllReservation>({
            method: 'get',
            url: `/reservations/user/${ id }`,
            params: { page, limit, status },
        });
    }

    async getReservationsByRoom(id: string, paginationParams: PaginationParams): Promise<IFindAllReservation> {
        const { page, limit, status } = paginationParams;
        return this.apiCall<IFindAllReservation>({
            method: 'get',
            url: `/reservations/room/${ id }`,
            params: { page, limit, status },
        });
    }
    
}