import { User } from '@/entities/user/model/types';
import UserListItem from './userListItem';
import { useMemo } from 'react';

export default function UserList({ users }: { users: User[] }) {
  const memoizedUserList = useMemo(
    () =>
      users.map((user: User) => {
        return <UserListItem key={user.id} user={user} />;
      }),
    [users]
  );

  return (
    <div className='scrollbar flex-1 min-h-0 overflow-y-auto mt-4 w-full grid lg:grid-cols-3 md:grid-cols-2 gap-3 h-full'>
      {memoizedUserList}
    </div>
  );
}
