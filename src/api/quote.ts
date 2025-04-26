import { getData } from '.';
import { apiOperations } from './apiMiddleware';

const API_URL = 'https://api.gameofthronesquotes.xyz/v1/random';

interface ResultData {
  sentence: string;
}

export async function fetchQuote() {
  const api = new apiOperations();

  return await api.GET(async () => {
    const response = await getData(API_URL);

    return (response.data as ResultData).sentence;
  });
}
