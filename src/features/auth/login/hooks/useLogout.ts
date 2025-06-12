import { logout } from '@/entities/auth/api/logout';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.resetQueries();
      router.push('/');
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
