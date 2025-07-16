export interface LoginResponse {
  id: number;
  token: string;
  userId: string;
  username: string;
  email: string;
  roles: string[];
}
