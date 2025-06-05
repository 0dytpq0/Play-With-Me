import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { redirect } from 'next/navigation';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: 'error' | 'success',
  path: string,
  message: string
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

/**
 * HTTP 요청을 보낼 수 있는 범용 fetch 유틸 함수
 * @param url 요청 URL
 * @param options method, body, headers 등 fetch 옵션
 * @returns 응답 데이터
 */
export async function fetcher<TResponse = unknown>(
  url: string,
  options: {
    method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
    body?: object;
    headers?: Record<string, string>;
    query?: Record<string, string | number | boolean>;
  } = {}
): Promise<TResponse> {
  const { method = 'GET', body, headers = {}, query } = options;

  let requestUrl = url;
  if (query && Object.keys(query).length > 0) {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      params.append(key, String(value));
    });
    requestUrl += (url.includes('?') ? '&' : '?') + params.toString();
  }

  const fetchOptions: RequestInit = {
    method,
    headers: {
      ...headers,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + requestUrl,
    fetchOptions
  );

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    console.log('errorBody입니다', errorBody || response.statusText);
    throw new Error(errorBody.message || response.statusText);
  }

  return response.json() as Promise<TResponse>;
}
