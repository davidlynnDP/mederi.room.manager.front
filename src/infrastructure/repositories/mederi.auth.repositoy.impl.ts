import { AuthDataSource } from "../../domain/datasources";
import { AuthRepository } from "../../domain/repositories";
import { MederiAuthDatasourceImpl } from "../datasources/mederi.auth.datasource.impl";
import { SignInParams, SignUpParams } from "../../domain/interfaces";
import { User } from "../../domain/models";

interface UserOAuthResponse {
    user: User;
    token: string;
}

export class MederiAuthRepositoyImpl implements AuthRepository {

    private datasource: AuthDataSource;

    constructor(datasource?: AuthDataSource) {
        this.datasource = datasource ?? new MederiAuthDatasourceImpl();
    }

    async signIn(signInParams: SignInParams): Promise<UserOAuthResponse> {
        return this.datasource.signIn(signInParams);
    }

    async signUp(signUpParams: SignUpParams): Promise<UserOAuthResponse> {
        return this.datasource.signUp(signUpParams);
    }

    async reNewToken(): Promise<UserOAuthResponse> {
        return this.datasource.reNewToken();
    }

}