export interface UserInfo {
    firstname: string;
    lastname: string;
    email: string;
    profilePicURL?: string;
    settings?: {
        theme:string;
    }
    accessToken?:string;
    refreshToken?:string;
}