import { Vector3 } from 'three';

import Emoji from '@/shared/components/canvas/Emoji';
import Decoration from '@/shared/components/canvas/Decoration';
import { messageLists } from './dummy';

const getDecoPosition = (n: number): Vector3 => {
  const positions = [
    [0, 0],
    [1.5, -0.5],
    [0.5, 1.5],
    [-1.5, 0.5],
    [-0.5, -1.5],
    [1.5, 0.5], // 5
    [-0.5, 1.5],
    [-1.5, -0.5],
    [0.5, -1.5],
    [1.5, -1.5],
    [1.5, 1.5], // 10
    [-1.5, 1.5],
    [-1.5, -1.5],
    [2.5, -0.5],
    [0.5, 2.5],
    [-2.5, 0.5], // 15
    [-0.5, -2.5],
    [2.5, 0.5],
    [-0.5, 2.5],
    [-2.5, -0.5],
    [0.5, -2.5], // 20
    [2.5, -1.5],
    [1.5, 2.5],
    [-2.5, 1.5],
    [-1.5, -2.5],
    [2.5, 1.5], // 25
    [-1.5, 2.5],
    [-2.5, -1.5],
    [1.5, -2.5],
    [-2.5, -2.5],
    [-2.5, 2.5],
  ];
  return new Vector3(positions[n][0], 0, positions[n][1]);
};

type Message = {
  content: string;
  created: string;
  decoration_color: string;
  decoration_id: number;
  id: number;
  is_deleted: boolean;
  letter_id: number;
  location: number;
  opened: string | null;
  sender: string;
  snowball_id: number;
  user_id: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  confidence: number;
};

const Decorations = () => {
  const radius = 7;
  const center = new Vector3(0, radius / 2, 0);
  const messageList: Message[] = messageLists;

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
    />
  ));

  const emojis = messageList.map((message, index) => (
    <Emoji
      key={index}
      centerPosition={center}
      rangeRadius={radius}
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
