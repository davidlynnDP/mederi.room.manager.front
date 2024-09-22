import { FC, ReactNode, useEffect, useReducer, useState } from 'react';
import { AuthContext } from './AuthContext';
import { SignInParams, SignUpParams } from '../../domain/interfaces';
import { authReducer } from './authReducer';
import { AuthRepository } from '../../domain/repositories';
import { AuthStatus, UserRole } from '../../domain/enums';
import { MederiAuthRepositoyImpl } from '../../infrastructure/repositories/mederi.auth.repositoy.impl';
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

    const [ state, dispatch ] = useReducer( authReducer, AUTH_INITIAL_STATE );
    const [ status, setStatus ] = useState( AuthStatus.NotAuthenticated );
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

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
            setStatus(AuthStatus.Authenticated);
        }
    }, []);

    const signIn = async(signInParams: SignInParams) => {
        try {
            setIsLoading(true);
            const { token, user } = await authRepository.signIn(signInParams);
            const payload: AuthState = {
                user: {
                    data: user,
                    token: token
                },
                status
            }
            dispatch({ type: '[Auth] - Sign In', payload });
            localStorage.setItem('token', token );
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('tokenIssuedAt', getDateTimeNow() );
            setIsLoading(false);
        } catch ( error ) {
            console.log( error );
        }
    };

    const signUp = async(signUpParams: SignUpParams) => {
        try {
            setIsLoading(true);
            const { token, user } = await authRepository.signUp( signUpParams );
            const payload: AuthState = {
                user: {
                    data: user,
                    token: token
                },
                status
            }
            dispatch({ type: '[Auth] - Sign Up', payload });
            localStorage.setItem('token', token );
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('tokenIssuedAt', getDateTimeNow() );
            setIsLoading(false);
        } catch ( error ) {
            console.log( error );
        }
    };

    const reNewToken = async() => {
        try {
            setIsLoading(true);
            const { token } = await authRepository.reNewToken();
            dispatch({ type: '[Auth] - Renew Token', payload: { token }});
            localStorage.setItem('token', token );
            localStorage.setItem('tokenIssuedAt', getDateTimeNow() );
            setIsLoading(false);
        } catch ( error ) {
            console.log( error );
        }
    };

    const logout = () => {
        setIsLoading(true);
        dispatch({ type: '[Auth] - Logout' });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('tokenIssuedAt');
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
            { children }
        </AuthContext.Provider>
    )
}