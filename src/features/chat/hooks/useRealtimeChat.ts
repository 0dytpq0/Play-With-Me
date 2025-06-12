import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/shared/lib/supabase/client';
import { fetchChat } from '../api';
import { SendChatResponse } from '../model/types';

/**
 * 실시간 채팅 메시지 구독 및 react-query 연동 커스텀 훅
 * @param userId 내 유저 ID
 * @param mateId 상대 유저 ID
 * @returns react-query useQuery 반환값
 */
export function useRealtimeChat(userId: string, mateId: string) {
  const queryClient = useQueryClient();
  const roomId = [userId, mateId].sort().join('-');

  const query = useQuery<SendChatResponse[]>({
    queryKey: ['chat', roomId],
    queryFn: () => fetchChat(roomId),
  });

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel(`chat-room-${roomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat',
          filter: `room_id=eq.${roomId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['chat', roomId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, queryClient]);

  return query;
}

