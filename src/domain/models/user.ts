import { UserRole } from "../enums";

export interface User {
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