export interface FetchMeta {
  message?: string;
  loading: boolean;
  errors: null | FetchError[]
}

export interface FetchError {
  message: string;
  details?: string;
}