export interface LoginResponse {
  token: string;
  userId: string;
  username: string;
  email: string;
  roles: string[];
}
