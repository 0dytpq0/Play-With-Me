import { GRADIENTS } from '../model/constants';

export const genRoomId = (userId: string, mateId: string) => {
  const roomId = [userId, mateId].sort().join('-');
  return roomId;
};

export const genGradient = () => {
  const randomIndex = Math.floor(Math.random() * GRADIENTS.length);
  return GRADIENTS[randomIndex];
};
