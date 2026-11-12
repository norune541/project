import { useMutation } from '@tanstack/react-query';
import { publicApi } from '@/common/api';
import type { LoginInputDto } from 'shared';

export function useLogin() {
  return useMutation({
    mutationFn: async (body: LoginInputDto) => {
      const { data, error } = await publicApi.POST('/api/auth/login', {
        body,
      });

      if (error) throw error;
      return data;
    },
  });
}
