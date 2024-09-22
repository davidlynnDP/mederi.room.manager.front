import { ReservationStatus, RoomType, UserRole } from "../enums";

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

    user?:            User;
    room?:            Room;
}

interface Room {
    id:       string;
    name:     string;
    capacity: number;
    location: string;
    roomType: RoomType;
}

interface User {
    id:                   string;
    identificationNumber: string;
    email:                string;
    names:                string;
    lastNames:            string;
    role:                 UserRole;
}
