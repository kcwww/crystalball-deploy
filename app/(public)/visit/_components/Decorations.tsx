import { fetchVisitMessages } from '@/app/(protected)/main/_utils/fetchMessages';
import Decoration from '@/app/(public)/visit/_components/Decoration';
import { getDecoPosition } from '@/shared/components/canvas/utils/canvas';
import { Crystal } from '@/shared/types/crystal';

import { Message } from '@/shared/types/message';
import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';

const MemoizedDecoration = memo(Decoration);

const Decorations = ({ crystal }: { crystal: Crystal['_id'] }) => {
  const { data, isLoading, isError } = useQuery<Message[]>({
    queryKey: ['messages', crystal],
    queryFn: () => fetchVisitMessages(crystal),
    gcTime: 0,
    staleTime: 0,
  });

  if (isLoading || isError) return null;
  if (!data) return null;

  const decos = data.map((message, index) => (
    <MemoizedDecoration
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
