interface ApiResponse<T> {
  error: string;
  message: string;
  data: T | string;
}

export async function apiMiddleware<T>(
  apiCall: () => Promise<T>
): Promise<ApiResponse<T>> {
  const resultData: ApiResponse<T> = {
    error: '',
    message: '',
    data: '',
  };

  try {
    const data = await apiCall();
    resultData.message = 'The data has been successfully fetched!';

    resultData.data = data;
  } catch (error) {
    resultData.message = 'An error has occurred during data fetch!';

    resultData.error =
      error instanceof Error
        ? error.message
        : 'An unexpected error has occurred!';
  }

  return resultData;
}
