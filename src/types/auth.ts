// path: crs-frontend/src/types/auth.ts
export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    username: string;
    role: 'ADMIN' | 'STUDENT';
}