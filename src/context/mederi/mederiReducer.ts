import { User, Room, Reservation } from "../../domain/models";
import { MederiState } from "./MederiProvider";

type MederiActionType = 
    | { type: '[Mederi] - Create User', payload: User }
    | { type: '[Mederi] - Set Users', payload: User[] }
    | { type: '[Mederi] - Update User', payload: User }
    | { type: '[Mederi] - Delete User', payload: { id: string } }
    | { type: '[Mederi] - Create Room', payload: Room }
    | { type: '[Mederi] - Set Rooms', payload: Room[] }
    | { type: '[Mederi] - Update Room', payload: Room }
    | { type: '[Mederi] - Delete Room', payload: { id: string } }
    | { type: '[Mederi] - Create Reservation', payload: Reservation }
    | { type: '[Mederi] - Set Reservations', payload: Reservation[] }
    | { type: '[Mederi] - Update Reservation', payload: Reservation }
    | { type: '[Mederi] - Delete Reservation', payload: { id: string } }
    | { type: '[Mederi] - Logout' }

export const mederiReducer = (state: MederiState, action: MederiActionType): MederiState => {
    switch (action.type) {
        case '[Mederi] - Create User':
            return {
                ...state,
                users: [...state.users, action.payload],
            };

        case '[Mederi] - Set Users':
            return {
                ...state,
                users: action.payload,
            };

        case '[Mederi] - Update User':
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.payload.id ? action.payload : user
                ),
            };

        case '[Mederi] - Delete User':
            return {
                ...state,
                users: state.users.filter( user => user.id !== action.payload.id ),
            };

        case '[Mederi] - Create Room':
            return {
                ...state,
                rooms: [...state.rooms, action.payload],
                //Type 'Room' is not assignable to type 'import("d:/Users/DAVID/Desktop/PROYECTO_MEDERI/mederi.room.manager.front/src/domain/models/room").Room'.ts(2322)
            };

        case '[Mederi] - Set Rooms':
            return {
                ...state,
                rooms: action.payload,
                //Type 'Room[]' is not assignable to type 'import("d:/Users/DAVID/Desktop/PROYECTO_MEDERI/mederi.room.manager.front/src/domain/models/room").Room[]'.

            };

        case '[Mederi] - Update Room':
            return {
                ...state,
                rooms: state.rooms.map(room =>
                    room.id === action.payload.id ? action.payload : room
                ),
                //Type 'Room[]' is not assignable to type 'import("d:/Users/DAVID/Desktop/PROYECTO_MEDERI/mederi.room.manager.front/src/domain/models/room").Room[]'.ts(2322)

            };

        case '[Mederi] - Delete Room':
            return {
                ...state,
                rooms: state.rooms.filter( room => room.id !== action.payload.id ),
            };

        case '[Mederi] - Create Reservation':
            return {
                ...state,
                reservations: [...state.reservations, action.payload],
                //Type 'Reservation | Reservation' is not assignable to type 'Reservation'.

            };

        case '[Mederi] - Set Reservations':
            return {
                ...state,
                reservations: action.payload,
                //Type 'import("d:/Users/DAVID/Desktop/PROYECTO_MEDERI/mederi.room.manager.front/src/context/mederi/mederiReducer").Reservation[]' is not assignable to type 'import("d:/Users/DAVID/Desktop/PROYECTO_MEDERI/mederi.room.manager.front/src/domain/models/reservation").Reservation[]'.

            };

        case '[Mederi] - Update Reservation':
            return {
                ...state,
                reservations: state.reservations.map(reservation =>
                    reservation.id === action.payload.id ? action.payload : reservation
                ),
                //Type 'import("d:/Users/DAVID/Desktop/PROYECTO_MEDERI/mederi.room.manager.front/src/context/mederi/mederiReducer").Reservation[]' is not assignable to type 'import("d:/Users/DAVID/Desktop/PROYECTO_MEDERI/mederi.room.manager.front/src/domain/models/reservation").Reservation[]'.ts(2322)

            };

        case '[Mederi] - Delete Reservation':
            return {
                ...state,
                reservations: state.reservations.filter( reservation => reservation.id !== action.payload.id ),
            };

        case '[Mederi] - Logout':
            return {
                users: [],
                rooms: [],
                reservations: [],
            };

        default:
            return state;
    }
};
