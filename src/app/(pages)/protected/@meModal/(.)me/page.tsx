import { getUser } from '@/entities/user/api/getUser';
import { UserAvatar, UserCard } from '@/entities/user/ui';
import { BackButton } from '@/shared/ui/backButton';
import { Button } from '@/shared/ui/button';
import { Pencil1Icon, Pencil2Icon } from '@radix-ui/react-icons';
import Image from 'next/image';

// 닉네임, one_line, 사진, 티어 수정가능
// 비어있는 하단은 추후 그래프같은걸 넣어도 될듯?
export default async function MeModal() {
  const user = await getUser();
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
      <div className='relative flex min-w-[500px] min-h-[400px] max-w-[600px] gap-8 rounded-xl bg-background px-6 py-10 shadow-2xl'>
        <BackButton />

        <Button variant='ghost' size='icon' className='absolute top-2 right-2'>
          <Pencil2Icon />
        </Button>

        <div className='flex items-center justify-center'>
          <div className='relative h-full w-[250px] rounded-md bg-muted overflow-hidden'>
            <Image
              src={user.profile_image || '/Icon/avatar.png'}
              alt='avatar'
              fill
              className='object-cover'
              sizes='250px'
            />
          </div>
        </div>

        <div className='flex flex-1 flex-col gap-4'>
          <div>
            <UserCard user={user} />
            {/* <input type="text" className="mt-2 w-full" placeholder="닉네임 변경" /> */}
          </div>

          <select className='w-24 rounded border px-2 py-1 text-sm'>
            <option value=''>티어 선택</option>
          </select>

          <div className='w-full max-w-[250px]'>
            <p className='truncate text-muted-foreground'>{user.one_line}</p>
            {/* <input type="text" className="mt-2 w-full" placeholder="한마디 소개" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
