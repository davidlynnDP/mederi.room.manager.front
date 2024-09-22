import { SignInParams, SignUpParams } from "../interfaces";
import { User } from "../models";

interface UserOAuthResponse {
    user:  User;
    token: string;
}

export interface AuthRepository {

    signIn(signInParams: SignInParams): Promise<UserOAuthResponse>;
    signUp(signUpParams: SignUpParams): Promise<UserOAuthResponse>;
    reNewToken(): Promise<UserOAuthResponse>;
    
}
