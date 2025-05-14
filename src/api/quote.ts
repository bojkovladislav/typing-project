import { API_URLS, getData } from '.';
import { apiOperations } from './apiMiddleware';

interface ResultData {
  sentence: string;
}

export async function fetchQuote() {
  const api = new apiOperations();

  return await api.GET(async () => {
    const response = await getData(API_URLS.quote);

    return (response.data as ResultData).sentence;
  });
}
