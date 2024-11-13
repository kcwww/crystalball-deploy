import { Message } from '@/shared/types/message';
import { create } from 'zustand';

export type MessageListType = {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
};

export const useMessage = create<MessageListType>((set) => {
  const messages: Message[] = [];
  return {
    messages,
    setMessages: (messages) => set({ messages }),
  };
});
