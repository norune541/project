import { useQuery } from '@tanstack/react-query';

export type User = {
  id: string;
  username: string;
  email: string;
  company: string;
  role: string;
  plan: string;
  createdAt: string;
};

export const mockUser: User = {
  id: 'u_1',
  username: 'Алексей Петров',
  email: 'demo@example.com',
  company: 'Nimbus Labs',
  role: 'Владелец',
  plan: 'Pro',
  createdAt: '2026-01-15',
};

const sleep = (ms = 600) => new Promise((r) => setTimeout(r, ms));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const mockLogin = async (_: { email: string; password: string }) => {
  await sleep();
  return mockUser; // замените на fetch
};
export const mockSignup = async (data: { username: string; email: string; password: string }) => {
  await sleep();
  return { ...mockUser, username: data.username, email: data.email };
};
export const useMe = () =>
  useQuery({ queryKey: ['me'], queryFn: async () => (await sleep(300), mockUser) });
