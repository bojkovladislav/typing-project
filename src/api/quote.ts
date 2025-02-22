import axios from 'axios';
import { apiMiddleware } from './apiMiddleware';

const API_URL = 'https://api.gameofthronesquotes.xyz/v1/random';

interface ResultData {
  sentence: string;
}

export async function fetchQuote() {
  return apiMiddleware(async () => {
    const response = await axios.get(API_URL);

    return (response.data as ResultData).sentence;
  });
}
