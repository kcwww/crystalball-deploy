import { useEffect } from 'react';

import Decoration from '@/app/(protected)/main/_components/Decoration';

import type { Message } from '@/shared/types/message';
import { getDecoPosition } from '@/shared/components/canvas/utils/canvas';
import { useMessage } from '@/app/(protected)/main/_store/useMessage';

const DecorationWrap = ({ messages }: { messages: Message[] }) => {
  const { messages: messageList, setMessages } = useMessage();

  useEffect(() => {
    setMessages(messages);
  }, [messages, setMessages]);

  return (
    <>
      {messageList.map((message, index) => (
        <Decoration
          key={index}
          id={message.decoration_id}
          scale={1}
          position={getDecoPosition(index + 1)}
          message={message.content ?? '비공개 메시지 입니다.'}
          color={message.decoration_color}
          sender={message.sender ?? '비공개'}
          letterID={message.letter_color ?? '#ff0000'}
          messageID={message._id}
          isOpened={message.is_opend !== null}
          sendAt={message.createdAt}
        />
      ))}
    </>
  );
};

export default DecorationWrap;
