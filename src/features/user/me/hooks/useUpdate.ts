import { updateUser } from '@/entities/user/api/updateUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateUser({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries({
        queryKey: ['me'],
      });
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}
