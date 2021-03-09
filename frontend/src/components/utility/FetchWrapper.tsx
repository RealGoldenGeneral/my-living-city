import { API_BASE_URL } from "../../lib/constants";

export default async <T, B>(
  url: string,
  method = 'get',
  body: B | undefined = undefined,
  headers: {}
): Promise<T | { error: string }> => {
  const controller = new AbortController();

  try {
    const res = await fetch(`${API_BASE_URL}${url}`, {
      method: method.toUpperCase(),
      signal: controller.signal,
      body: typeof body === 'object' ? JSON.stringify(body) : undefined,
      mode: 'cors',
      headers: {
        'Content-type': 'application/json',
        ...headers
      }
    });

    if (!res.ok) {
      const error = await res.json();
      return { error: error.code };
    }

    return await res.json();
  } catch (error) {
    return { error };
  } finally {
    controller.abort();
  }
}