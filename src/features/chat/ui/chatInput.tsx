import { FC, KeyboardEvent } from 'react';
import { Textarea } from '@/shared/ui/textarea';
import { Button } from '@/shared/ui/button';

interface ChatInputProps {
  chatMessage: string;
  setChatMessage: (msg: string) => void;
  handleSend: (
    e: React.MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => void;
}

const ChatInput: FC<ChatInputProps> = ({ chatMessage, setChatMessage, handleSend }) => (
  <div className='flex gap-2 mt-2 items-end'>
    <Textarea
      className='scrollbar-hide flex-1 w-0 p-3 rounded-lg text-black bg-white focus:outline-purple-500 resize-none'
      autoFocus
      value={chatMessage}
      onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSend(e);
        }
      }}
      onChange={(e) => setChatMessage(e.target.value)}
    />
    <Button
      onClick={handleSend}
      className='bg-purple-600 hover:bg-purple-700 '
    >
      전송
    </Button>
  </div>
);

export default ChatInput;
