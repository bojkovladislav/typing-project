import axios, { AxiosResponse } from 'axios';

export * from './words';
export * from './time';
export * from './quote';

export async function getData<T>(url: string): Promise<AxiosResponse> {
  return axios.get<T>(url);
}

export async function sendData<T, V>(
  url: string,
  data: V
): Promise<AxiosResponse<T>> {
  return axios.post<T>(url, data);
}
