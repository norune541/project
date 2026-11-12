import createClient from 'openapi-fetch';
import type { paths } from '../types/schema';

export const publicApi = createClient<paths>({
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});

export const protectedpi = createClient<paths>({
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  fetch: (request) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`);
    }

    return fetch(request);
  },
});
