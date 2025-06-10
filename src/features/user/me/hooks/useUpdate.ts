import { updateUser } from '@/entities/user/api/updateUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@/entities/user/model/types';

export function useUpdateUser({
  onSuccess,
  onError,
  userId,
}: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  userId: string;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries({
        queryKey: ['user', userId],
      });
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}
