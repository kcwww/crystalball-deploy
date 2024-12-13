import { memo } from 'react';

import Decoration from '@/app/(protected)/main/_components/Decoration';

import type { Message } from '@/shared/types/message';
import { getDecoPosition } from '@/shared/components/canvas/utils/canvas';

const MemoizedDecoration = memo(Decoration);

const DecorationWrap = ({ messages }: { messages: Message[] }) => {
  return (
    <>
      {messages.map((message, index) => (
        <MemoizedDecoration
          key={index}
          name={message.decoration_name}
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
