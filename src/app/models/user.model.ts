export interface User {
    name : string,
    usename: string,
    created_at: string,
    updated_at: string,
    designation: string,
    email: string,
    email_verified_at: string | null,
    id: Number,
    is_super_admin: boolean | null,
    remember_token: string | null,
}

export interface UserLogin extends User {
    user: User,
    access_token: string,
    token_type: string,
    refresh_token: string,
    expires_in: number
}
