import { logger } from "./logger";

interface IFetchOptions extends RequestInit {
  timeout?: number;
}

interface IFetchError extends Error {
  status: number | undefined;
  statusText: string | undefined;
  data: unknown;
}

/**
 * Create a fetch error with additional properties
 */
function createFetchError(
  message: string,
  status?: number,
  statusText?: string,
  data?: unknown
): IFetchError {
  const error = new Error(message) as IFetchError;
  error.status = status;
  error.statusText = statusText;
  error.data = data;
  return error;
}

/**
 * Type-safe fetch wrapper with error handling and timeout
 */
export async function fetcher<T>(
  url: string,
  options: IFetchOptions = {}
): Promise<T> {
  const { timeout = 30000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    const headers = new Headers(fetchOptions.headers);
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      headers,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorData: unknown;
      try {
        errorData = await response.json();
      } catch {
        errorData = undefined;
      }

      throw createFetchError(
        `HTTP ${response.status.toString()}: ${response.statusText}`,
        response.status,
        response.statusText,
        errorData
      );
    }

    const data: unknown = await response.json();
    return data as T;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === "AbortError") {
      throw createFetchError(`Request timeout after ${timeout.toString()}ms`);
    }

    logger.error("Fetch error", { url, error });
    throw error;
  }
}

/**
 * HTTP method helpers
 */
export const api = {
  get: async <T>(url: string, options?: IFetchOptions): Promise<T> =>
    await fetcher<T>(url, { ...options, method: "GET" }),

  post: async <T>(url: string, data: unknown, options?: IFetchOptions): Promise<T> =>
    await fetcher<T>(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    }),

  put: async <T>(url: string, data: unknown, options?: IFetchOptions): Promise<T> =>
    await fetcher<T>(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    }),

  patch: async <T>(url: string, data: unknown, options?: IFetchOptions): Promise<T> =>
    await fetcher<T>(url, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: async <T>(url: string, options?: IFetchOptions): Promise<T> =>
    await fetcher<T>(url, { ...options, method: "DELETE" }),
};

export type { IFetchOptions, IFetchError };
