export interface UserFullInfo {
  id: number;
  email: string;
  password: string;
  name: string;
  check: boolean;
}

export interface UserCredentials {
  id: number;
  email: string;
  password: string;
}

export interface UserModel {
  id: number;
  email: string;
  name: string;
}
