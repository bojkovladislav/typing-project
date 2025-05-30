import { sendData, user_endpoint } from '.';
import {
  AuthorizedUserData,
  CreatedUser,
  UserLoginData,
  UserSignupData,
} from '../types/user';
import { apiOperations } from './apiMiddleware';

const api = new apiOperations();

async function authenticate<GivenData, ResponseUserData>(
  data: GivenData,
  method: 'login' | 'signup'
) {
  return await api.POST<{ token: string; user: ResponseUserData }>(async () => {
    const response = await sendData<
      { token: string; user: ResponseUserData },
      GivenData
    >(`${user_endpoint}/${method}`, data);

    return response.data;
  });
}

export async function signup(data: UserSignupData) {
  return await authenticate<UserSignupData, CreatedUser>(data, 'signup');
}

export async function login(data: UserLoginData) {
  return await authenticate<UserLoginData, AuthorizedUserData>(data, 'login');
}
