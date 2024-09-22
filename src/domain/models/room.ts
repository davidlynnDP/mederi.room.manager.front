import { RoomType } from "../enums";

export interface Room {
    id:          string;
    name:        string;
    capacity:    number;
    location:    string;
    roomType:    RoomType;
    isAvailable: boolean;
    createdAt:   string;
    updatedAt:   string;
    
    resources?:   Resource[];
}

export interface Resource {
    id:          string;
    name:        string;
    category:    string;
    description: string;
    createdAt:   string;
    updatedAt:   string;
    roomId:      string;
}
