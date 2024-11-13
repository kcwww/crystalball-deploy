import { Vector3 } from 'three';

import Emoji from '@/shared/components/3dModels/Emoji';
import Decoration from '@/shared/components/3dModels/Decoration';
import { getDecoPosition } from '@/shared/components/canvas/utils/canvas';
import { RADIUS } from '@/shared/constants/canvas';

import { MessageResponse } from '@/shared/types/message';
import { messageLists } from '@/shared/components/canvas/dummy';

const Decorations = () => {
  const center = new Vector3(0, RADIUS / 2, 0);
  const messageList: MessageResponse[] = messageLists;

  const decos = messageList.map((message, index) => (
    <Decoration
      key={index}
      id={message.decoration_id}
      scale={1}
      position={getDecoPosition(message.location)}
      message={message.content ?? '비공개 메시지 입니다.'}
      color={message.decoration_color}
      sender={message.sender ?? '비공개'}
      letterID={message.letter_id ?? 0}
      messageID={message.id}
      isOpened={message.opened !== null}
      sendAt={message.sendAt}
    />
  ));

  const emojis = messageList.map((message, index) => (
    <Emoji
      key={index}
      centerPosition={center}
      rangeRadius={RADIUS}
      sentiment={message.sentiment}
      confidence={message.confidence}
    />
  ));

  return (
    <>
      {decos}
      {emojis}
    </>
  );
};

export default Decorations;
