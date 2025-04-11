export interface ResultData<DATA> {
  error: string;
  message: string;
  data: DATA;
}

export interface GoogleAuthData {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
}

export interface UserData {
  id: string;
  email: string;
  username: string;
  picture: string;
}
