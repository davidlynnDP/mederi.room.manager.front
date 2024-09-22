import { UserRole } from "../enums";

export interface SignInParams {
    email: string;
    password: string;
}

export interface SignUpParams {
    identificationNumber: string;
    email: string;
    names: string;
    lastNames: string;
    password: string;
    role: UserRole;
}