import { AuthStatus } from '../../domain/enums';
import { AuthState } from './AuthProvider';

type AuthActionType =
    | { type: '[Auth] - Sign In'; payload: AuthState }
    | { type: '[Auth] - Sign Up'; payload: AuthState }
    | { type: '[Auth] - Load User From LocalStorage'; payload: AuthState }
    | { type: '[Auth] - Renew Token'; payload: { token: string } }
    | { type: '[Auth] - Logout' }
    

export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {
    switch (action.type) {
        case '[Auth] - Sign In':
        case '[Auth] - Sign Up':
        case '[Auth] - Load User From LocalStorage':
            return {
                ...state,
                user: action.payload.user,
                status: AuthStatus.Authenticated,
            };

        case '[Auth] - Renew Token':
            return {
                ...state,
                user: {
                    ...state.user,
                    token: action.payload.token,
                },
                status: AuthStatus.Authenticated,
            };

        case '[Auth] - Logout':
            return {
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
                    token: '',
                },
                status: AuthStatus.NotAuthenticated,
            };

        default:
            return state;
    }
};
