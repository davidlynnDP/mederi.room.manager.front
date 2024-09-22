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


export class MederiDatasourceImpl implements MederiDataSource {

    private handleError(error: unknown): never {

        if (isAxiosError(error)) {
            console.error(`API error: ${error.response?.status} - ${error.response?.statusText}`);
            throw new Error(`API Error: ${error.response?.statusText || 'Unknown Error'}`);
        } else {
            console.error(`Unexpected error: ${error}`);
            throw new Error('An unexpected error occurred');
        }
    }

    async findAllUsers(paginationParams: PaginationParams): Promise<IFindAllUsers> {

        const { page, limit } = paginationParams; 
        try {
            const response = await mederiApi.get<IFindAllUsers>(`/users/find`, {
                params: {
                    page: page, 
                    limit: limit
                }
            });

            return response.data;
        } catch ( error ) {
            this.handleError(error);
        }
    }

    async findOneUser(id: string): Promise<User> {

        try {
            const response = await mederiApi.get<User>(`/users/find/${ id }`);

            return response.data;
        } catch ( error ) {
            this.handleError(error);
        }
    }

    async updateUser(id: string, updateUserParams: UpdateUserParams): Promise<User> {
        try {
            const response = await mederiApi.patch<User>(`/users/${ id }`, {
                ...updateUserParams
            });

            return response.data
        } catch ( error ) {
            this.handleError(error);
        }
    }

    async removeUser(id: string): Promise<User> {
        try {
            const response = await mederiApi.delete<User>(`/users/${ id }`);

            return response.data
        } catch ( error ) {
            this.handleError(error);
        }
    }

    async createRoom(createRoomParams: CreateRoomParams): Promise<Room> {

        const { name, capacity, location, roomType, resources } = createRoomParams;
        try {
            const response = await mederiApi.post<Room>(`/rooms`, {
                name: name,
                capacity: capacity, 
                location: location,
                roomType: roomType,
                resources: resources
            });

            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async findAllRooms(paginationParams: PaginationParams): Promise<IFindAllRooms> {

        const { page, limit, isAvailable } = paginationParams;
        try {
            const response = await mederiApi.get<IFindAllRooms>(`/rooms/find`, { 
                params: { 
                    page: page, 
                    limit: limit,
                    isAvailable: isAvailable
                } 
            });

            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async findRoomById(id: string): Promise<Room> {

        try {
            const response = await mederiApi.get<Room>(`/rooms/find/${ id }`);

            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async updateRoom(id: string, updateRoomParams: UpdateRoomParams): Promise<Room> {
        try {
            const response = await mederiApi.patch<Room>(`/rooms/${ id }`, {
                ...updateRoomParams
            });

            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async deleteRoom(id: string): Promise<Room> {
        try {
            const response = await mederiApi.delete<Room>(`/rooms/${ id }`);

            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async createReservation(createReservationsParams: CreateReservationsParams): Promise<Reservation> {

        const { userId, roomId, reservationDate, startTime, endTime } = createReservationsParams;
        try {
            const response = await mederiApi.post<Reservation>(`/reservations`, {
                userId: userId,
                roomId: roomId,
                reservationDate: reservationDate,
                startTime: startTime,
                endTime: endTime,
            });

            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async findAllReservations(paginationParams: PaginationParams): Promise<IFindAllReservation> {

        const { page, limit, status } = paginationParams;
        try {
            const response = await mederiApi.get<IFindAllReservation>(`/reservations/find`, { 
                params: { 
                    page: page, 
                    limit: limit, 
                    status: status 
                }
            });

            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async getReservationById(id: string): Promise<Reservation> {
        try {
            const response = await mederiApi.get<Reservation>(`/reservations/find/${ id }`);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async updateReservation(id: string, updateReservationsParams: UpdateReservationsParams): Promise<Reservation> {
        try {
            const response = await mederiApi.patch<Reservation>(`/reservations/${ id }`, {
                ...updateReservationsParams
            });

            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async deleteReservation(id: string): Promise<Reservation> {
        try {
            const response = await mederiApi.delete<Reservation>(`/reservations/${ id }`);

            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async getReservationsByUser(id: string, paginationParams: PaginationParams): Promise<IFindAllReservation> {
        const { page, limit, status } = paginationParams;
        try {
            const response = await mederiApi.get<IFindAllReservation>(`/reservations/user/${ id }`, { 
                params: { 
                    page: page, 
                    limit: limit, 
                    status: status 
                }
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async getReservationsByRoom(id: string, paginationParams: PaginationParams): Promise<IFindAllReservation> {
        const { page, limit, status } = paginationParams;
        try {
            const response = await mederiApi.get<IFindAllReservation>(`/reservations/room/${ id }`, { 
                params: { 
                    page: page, 
                    limit: limit, 
                    status: status 
                }
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }
    
}