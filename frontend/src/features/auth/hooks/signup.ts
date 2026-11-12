import { useMutation } from '@tanstack/react-query';
import { publicApi } from '@/common/api';
import type { RegisterInputDto } from 'shared';

export function useSignup() {
  return useMutation({
    mutationFn: async (body: RegisterInputDto) => {
      const { data, error } = await publicApi.POST('/api/auth/register', {
        body,
      });

      if (error) throw error;
      return data;
    },
  });
}
