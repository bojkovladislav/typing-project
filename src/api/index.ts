import axios, { AxiosResponse } from 'axios';

export * from './words';
export * from './time';
export * from './quote';

export function getData<T>(url: string): Promise<AxiosResponse> {
  return axios.get<T>(url);
}
