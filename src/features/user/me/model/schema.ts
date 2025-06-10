import { z } from 'zod';
import { MeFormData } from './type';

export const meFormSchema = z.object({
  game_nickname: z.string().refine((val) => /^[^#]+#[^#]+$/.test(val), {
    message: '발로란트 닉네임은 "이름#태그" 형식이어야 합니다. 예: player#KR1',
  }),
  profile_image: z.union([z.string(), z.instanceof(File)]).optional(),
  tier: z.string().min(1, '티어를 선택해주세요.'),
  oneLine: z.string().max(50, '한마디 소개는 50자 이하로 입력해주세요.'),
}) satisfies z.ZodType<MeFormData>;
