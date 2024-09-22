import { ReservationStatus, RoomType, UserRole } from "../enums";


//users
export interface UpdateUserParams {
    identificationNumber?: string;
    email?: string;
    names?: string;
    lastNames?: string;
    password?: string;
    role?: UserRole;
    isActive?: boolean;
}


//rooms
export interface CreateRoomParams {
    name: string;
    capacity: number;
    location: string;
    roomType: RoomType;
    resources: CreateRoomResourceParams[];
}

export interface CreateRoomResourceParams {
    name: string;
    category: string;
    description: string;
}


export interface UpdateRoomParams {
    name?: string;
    capacity?: number;
    location?: string;
    roomType?: RoomType;
    isAvailable?: boolean;
    resources?: UpdateRoomResourceParams[];
}

export interface UpdateRoomResourceParams {
    id?: string;
    name?: string;
    category?: string;
    description?: string;
}


//reservations
export interface CreateReservationsParams {
    userId: string;
    roomId: string;
    reservationDate: string;
    startTime: string;
    endTime: string;
}

export interface UpdateReservationsParams {
    userId?: string;
    roomId?: string;
    reservationDate?: string;
    startTime?: string;
    endTime?: string;
    status?: ReservationStatus;
}