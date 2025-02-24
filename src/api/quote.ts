import { apiMiddleware } from './apiMiddleware';
import { getData } from '.';

const API_URL = 'https://api.gameofthronesquotes.xyz/v1/random';

interface ResultData {
  sentence: string;
}

export async function fetchQuote() {
  return apiMiddleware(async () => {
    const response = await getData(API_URL);

    return (response.data as ResultData).sentence;
  });
}
