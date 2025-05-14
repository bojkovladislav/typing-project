import axios, { AxiosResponse } from 'axios';

export * from './words';
export * from './time';
export * from './quote';

export const BASE_URL = import.meta.env.VITE_API_URL;
export const user_endpoint = `${BASE_URL}api/user`;
export const oauth_endpoint = `${BASE_URL}/oauth2`;

export const API_URLS = {
  quote: 'https://api.gameofthronesquotes.xyz/v1/random',
  words: 'https://random-word-api.vercel.app/api?words',
};

export async function getData<T>(url: string): Promise<AxiosResponse> {
  return axios.get<T>(url);
}

export async function sendData<T, V>(
  url: string,
  data: V
): Promise<AxiosResponse<T>> {
  return axios.post<T>(url, data);
}
