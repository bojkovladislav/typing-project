export interface ApiResponse<T> {
  error: string;
  message: string;
  data: T | string | undefined;
}

export class apiOperations {
  async GET<T>(apiCall: () => Promise<T>): Promise<ApiResponse<T>> {
    return this.handleRequest(apiCall, 'fetched');
  }

  async POST<T>(apiCall: () => Promise<T>): Promise<ApiResponse<T>> {
    return this.handleRequest(apiCall, 'submitted');
  }

  private async handleRequest<T>(
    apiCall: () => Promise<T>,
    action: string
  ): Promise<ApiResponse<T>> {
    const resultData: ApiResponse<T> = {
      error: '',
      message: '',
      data: '',
    };

    try {
      const data = await apiCall();
      resultData.message = `The data has been successfully ${action}!`;
      resultData.data = data;
    } catch (error) {
      resultData.message = `An error has occurred during data ${action}!`;
      resultData.error =
        error instanceof Error
          ? error.message
          : 'An unexpected error has occurred!';
    }

    return resultData;
  }
}
