import { ReservationStatus, RoomType, UserRole } from "../enums";

export interface IFindAllUsers {
    data: User[];
    meta: Meta;
}

export interface IFindAllRooms {
    data: Room[];
    meta: Meta;
}

export interface IFindAllReservation {
    data: Reservation[];
    meta: Meta;
}


export interface Reservation {
    id:              string;
    reservationDate: string;
    startTime:       string;
    endTime:         string;
    status:          ReservationStatus;
    createdAt:       string;
    updatedAt:       string;
    userId:          string;
    roomId:          string;
}

interface Room {
    id:          string;
    name:        string;
    capacity:    number;
    location:    string;
    roomType:    RoomType;
    isAvailable: boolean;
    createdAt:   string;
    updatedAt:   string;
}

interface User {
    id:                   string;
    identificationNumber: string;
    email:                string;
    names:                string;
    lastNames:            string;
    role:                 UserRole;
    isActive:             boolean;
    createdAt:            string;
    updatedAt:            string;
}

export interface Meta {
    total:    number;
    page:     number;
    lastPage: number;
}
