import Decoration from '@/app/(public)/visit/_components/Decoration';
import { getDecoPosition } from '@/shared/components/canvas/utils/canvas';

import { Message } from '@/shared/types/message';

const Decorations = ({ messages }: { messages: Message[] }) => {
  const decos = messages.map((message, index) => (
    <Decoration
      key={index}
      name={message.decoration_name}
      scale={1}
      position={getDecoPosition(index + 1)}
      message={message.content}
      color={message.decoration_color}
      sender={message.sender}
      letterColor={message.letter_color}
      messageID={message._id}
      isOpened={message.is_opend}
      sendAt={message.createdAt}
    />
  ));

  return <>{decos}</>;
};

export default Decorations;
