export interface AuthI {
    email: string;
    password: string;
}

export interface AuthResponseI {
    user: { 
        email: string;
    }
    accessToken: string;
}