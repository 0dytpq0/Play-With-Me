import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserById } from '@/entities/user/api/getUserById';
import { MeFormData } from '../model/type';
import { meFormSchema } from '../model/schema';
import { updateUser } from '@/entities/user/api/updateUser';

/**
 * MeForm의 상태와 로직을 관리하는 커스텀 훅
 * @param userId 사용자 ID
 */
export const useMeForm = ({ userId }: { userId: string }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // 유저 정보 불러오기
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById({ userId }),
  });

  // 폼 상태 관리
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    control,
  } = useForm<MeFormData>({
    resolver: zodResolver(meFormSchema),
    defaultValues: {
      profile_image: user?.profile_image,
      game_nickname: user?.game_nickname,
      tier: user?.tier ? String(user.tier) : '',
      one_line: user?.one_line ?? '',
    },
    mode: 'onChange',
  });

  // 유저 정보 업데이트
  const { mutate: updateUserMutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      setIsEdit(false);
      setAvatarPreview(null);
      queryClient.invalidateQueries({
        queryKey: ['user', userId],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // 아바타 변경 핸들러
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setValue('profile_image', file, { shouldDirty: true });

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        setAvatarPreview(result);
      }
    };
    reader.readAsDataURL(file);

    e.target.value = '';
  };

  // 폼 제출 핸들러
  const onSubmit: SubmitHandler<MeFormData> = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('userId', userId);
    updateUserMutate({ formData });
  };

  // 수정 취소 핸들러
  const handleCancel = () => {
    reset();
    setIsEdit(false);
    setAvatarPreview(null);
  };

  return {
    isEdit,
    setIsEdit,
    avatarPreview,
    user,
    isLoading,
    isDirty,
    errors,
    control,
    register,
    handleAvatarChange,
    handleSubmit,
    onSubmit,
    handleCancel,
  };
};
