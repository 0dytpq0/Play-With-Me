export type ApiError = {
  status: string;
  message: string;
};

export type ApiResponse<T> = T | ApiError;
