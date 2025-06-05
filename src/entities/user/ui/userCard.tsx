import { User } from '../model/types';

interface UserCardProps {
  user: Pick<User, 'id' | 'game_nickname' | 'tier'>;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div>
      <h1>{user.game_nickname}</h1>
      <div>티어 이미지</div>
    </div>
  );
}
