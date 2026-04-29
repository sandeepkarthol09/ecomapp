export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
  role: string;
}
