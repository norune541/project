import ky from 'ky';

export const api = ky.create({
  baseUrl: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  timeout: 10_000,
  hooks: {
    beforeRequest: [
      ({ request }) => {
        const token = localStorage.getItem('accessToken');

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
  },
});
