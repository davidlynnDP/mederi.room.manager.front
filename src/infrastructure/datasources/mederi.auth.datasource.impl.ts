import { mederiApi } from "../../config/api";
import { AuthDataSource } from "../../domain/datasources";
import { SignInParams, SignUpParams } from "../../domain/interfaces";
import { User } from "../../domain/models";


interface UserOAuthResponse {
    user:  User;
    token: string;
}


export class MederiAuthDatasourceImpl implements AuthDataSource {

    async signIn({ email, password }: SignInParams): Promise<UserOAuthResponse> {
        try {
            const response = await mederiApi.post<UserOAuthResponse>('/auth/login', {
                email: email,
                password: password
            });
            
            return response.data;
        } catch ( error ) {
            console.log(error);
            throw error;
        }
    }

    async signUp({ identificationNumber,
                   email,
                   names,
                   lastNames,
                   password,
                   role }: SignUpParams): Promise<UserOAuthResponse> {

        try {
            const response = await mederiApi.post<UserOAuthResponse>('/auth/register', {
                identificationNumber: identificationNumber,
                email: email,
                names: names,
                lastNames: lastNames,
                password: password,
                role: role
            });

            return response.data;
        } catch ( error ) {
            console.log(error);
            throw error;
        }
    }

    async reNewToken(): Promise<UserOAuthResponse> {
        try {
            const response = await mederiApi.get<UserOAuthResponse>('/auth/new_token');

            return response.data;
        } catch ( error ) {
            console.log(error);
            throw error;
        }
    }

}