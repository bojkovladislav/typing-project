import { useState, useCallback } from 'react';
import { ResultData } from '../types/api';
import { useTheme } from './useTheme';
import { TextData } from '../types/typing';

export function useFetch(
  fetchData: () => Promise<ResultData<string>>,
  initialLoading = false
) {
  const [loading, setLoading] = useState(initialLoading);
  const [data, setData] = useState<ResultData<TextData> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { currentTheme } = useTheme();
  function normalizeText(text: string) {
    return text.split('').map((letter) => ({
      value: letter,
      currentColor: currentTheme.text.neutral,
      colors: currentTheme.text,
    }));
  }

  const getData = useCallback(async () => {
    try {
      setData(null);

      setLoading(true);
      setError(null);

      const response = await fetchData();

      if (response.error) {
        setError(response.error);
      } else {
        setData({
          ...response,
          data: {
            numberOfWords: response.data.split(' ').length,
            text: normalizeText(response.data),
          },
        });
      }
    } catch (err) {
      setError('Something went wrong while fetching data!');
    } finally {
      setLoading(false);
    }
  }, [fetchData]);

  return { loading, data, error, refetch: getData };
}
