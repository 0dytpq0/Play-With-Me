import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signup } from '@/entities/auth/api/signup';
import type { SignUpFormType } from '@/entities/auth/model/types';

export function useSignup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.resetQueries();
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
