import { FC, ReactNode, useEffect, useReducer, useState } from 'react';

import { AuthContext } from './AuthContext';
import { SignInParams, SignUpParams } from '../../domain/interfaces';
import { authReducer } from './authReducer';
import { AuthRepository } from '../../domain/repositories';
import { AuthStatus, UserRole } from '../../domain/enums';
import { MederiAuthRepositoyImpl } from '../../infrastructure/repositories';
import { getDateTimeNow } from '../../config/helpers';

export interface AuthState {
    user: {
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
    };
    status: AuthStatus;
}

const AUTH_INITIAL_STATE = {
    user: {
        data: {
            id: '',
            identificationNumber: '',
            email: '',
            names: '',
            lastNames: '',
            role: undefined,
            isActive: undefined,
            createdAt: '',
            updatedAt: '',
        },
        token: ''
    },
    status: AuthStatus.NotAuthenticated,
};


interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const authRepository: AuthRepository = new MederiAuthRepositoyImpl();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (token && userData) {
            const parsedUser = JSON.parse(userData);
            const payload: AuthState = {
                user: {
                    data: parsedUser,
                    token
                },
                status: AuthStatus.Authenticated
            };
            dispatch({ type: '[Auth] - Load User From LocalStorage', payload });
        }
    }, []);

    const setLocalStorageData = (token: string, user: any) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('tokenIssuedAt', getDateTimeNow());
    };

    const clearLocalStorageData = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('tokenIssuedAt');
    };

    const handleRequest = async(requestFn: () => Promise<any>, onSuccess: (data: any) => void) => {
        try {
            setIsLoading(true);
            const data = await requestFn();
            onSuccess(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const signIn = async(signInParams: SignInParams) =>
        await handleRequest(() => authRepository.signIn(signInParams), ({ token, user }) => {
            const payload: AuthState = {
                user: { data: user, token },
                status: AuthStatus.Authenticated,
            };
            dispatch({ type: '[Auth] - Sign In', payload });
            setLocalStorageData(token, user);
        });

    const signUp = async(signUpParams: SignUpParams) =>
        await handleRequest(() => authRepository.signUp(signUpParams), ({ token, user }) => {
            const payload: AuthState = {
                user: { data: user, token },
                status: AuthStatus.Authenticated,
            };
            dispatch({ type: '[Auth] - Sign Up', payload });
            setLocalStorageData(token, user);
        });

    const reNewToken = async() =>
        await handleRequest(() => authRepository.reNewToken(), ({ token }) => {
            dispatch({ type: '[Auth] - Renew Token', payload: { token } });
            localStorage.setItem('token', token);
            localStorage.setItem('tokenIssuedAt', getDateTimeNow());
        });

    const logout = () => {
        setIsLoading(true);
        dispatch({ type: '[Auth] - Logout' });
        clearLocalStorageData();
        setIsLoading(false);
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            isLoading,

            signIn,
            signUp,
            reNewToken,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}