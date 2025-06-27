import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signup } from '@/entities/auth/api';

export function useSignup() {
  const queryClient = useQueryClient();
  console.log('lintTest');
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
