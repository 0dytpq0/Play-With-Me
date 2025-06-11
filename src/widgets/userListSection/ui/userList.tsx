import { User } from '@/entities/user/model/types';
import Image from 'next/image';
import UserListItem from './userListItem';

export default function UserList({ users }: { users: User[] }) {
  return (
    <div className='flex-1 min-h-0 overflow-y-auto mt-4 w-full grid lg:grid-cols-3 md:grid-cols-2 gap-3 h-full'>
      {users?.map((user: User) => {
        return <UserListItem key={user.id} user={user} />;
      })}
    </div>
  );
}
