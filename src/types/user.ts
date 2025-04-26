export interface UserSignupData {
  username: string;
  email: string;
  password: string;
}

export interface CreatedUser {
  id: number;
  username: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserLoginData {
  email: string;
  password: string;
}
