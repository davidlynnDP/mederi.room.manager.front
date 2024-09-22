import { createContext } from 'react';
import { SignInParams, SignUpParams } from "../../domain/interfaces";
import { AuthStatus, UserRole } from '../../domain/enums';


interface AuthUserState {
    data: {
        id: string;
        identificationNumber: string;
        email: string;
        names: string;
        lastNames: string;
        role?: UserRole;
        isActive?: boolean;
        createdAt: string;
        updatedAt: string;
    };
    token: string;
}

interface AuthContextProps {

    user: AuthUserState;
    status: AuthStatus;
    isLoading: boolean;

    signIn: (signInParams: SignInParams) => Promise<void>;
    signUp: (signUpParams: SignUpParams) => Promise<void>;
    reNewToken: () => Promise<void>;
    logout: () => void;
}


export const AuthContext = createContext({} as AuthContextProps);