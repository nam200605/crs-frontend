export interface User {
    id: string;
    username: string;
    role: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface Course {
    id: string;
    code: string;
    name: string;
    credits: number;
}