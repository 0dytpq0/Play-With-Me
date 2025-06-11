import { TierSelect } from '@/features/user/me/ui/tierSelect';
import { Control } from 'react-hook-form';
import { UserListSectionFormData } from '../model/types';

interface UserListSectionHeaderProps {
  control: Control<UserListSectionFormData>;
}

export default function UserListSectionHeader({
  control,
}: UserListSectionHeaderProps) {
  return (
    <div className='flex justify-between items-center h-9'>
      <h2 className='text-2xl font-bold'>티어별 유저 목록</h2>
      <TierSelect<UserListSectionFormData>
        control={control}
        name='tier'
        placeholder='티어 선택'
        triggerClassName='data-[placeholder]:text-white'
        isMessage={false}
      />
    </div>
  );
}
