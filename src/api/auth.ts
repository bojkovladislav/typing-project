import { sendData } from '.';
import {
  AuthorizedUserData,
  CreatedUser,
  UserLoginData,
  UserSignupData,
} from '../types/user';
import { apiOperations } from './apiMiddleware';

const BASE_URL = 'http://localhost:3000/api/user';

const api = new apiOperations();

async function authenticate<GivenData, ResponseUserData>(
  data: GivenData,
  method: 'login' | 'signup'
) {
  return await api.POST(async () => {
    const response = await sendData<
      { token: string; user: ResponseUserData } | undefined,
      GivenData
    >(`${BASE_URL}/${method}`, data);

    return response.data;
  });
}

export async function signup(data: UserSignupData) {
  return await authenticate<UserSignupData, CreatedUser>(data, 'signup');
}

export async function login(data: UserLoginData) {
  return await authenticate<UserLoginData, AuthorizedUserData>(data, 'login');
}
