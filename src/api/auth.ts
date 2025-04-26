import { sendData } from '.';
import { CreatedUser, UserLoginData, UserSignupData } from '../types/user';
import { apiOperations } from './apiMiddleware';

const BASE_URL = 'http://localhost:3000/api/user';

const api = new apiOperations();

export async function signup(data: UserSignupData) {
  return await api.POST(async () => {
    const response = await sendData<
      { token: string; user: CreatedUser } | undefined,
      UserSignupData
    >(`${BASE_URL}/signup`, data);
    return response.data;
  });
}

export async function login(data: UserLoginData) {
  return await api.POST(async () => {
    return await sendData(`${BASE_URL}/login`, data);
  });
}
