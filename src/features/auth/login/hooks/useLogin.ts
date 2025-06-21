import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { login } from '@/entities/auth/api/login';

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.resetQueries();
      setTimeout(() => {
        router.replace('/protected/home');
      }, 500);
      router.back();
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
