import { memo } from 'react';
import { useQuery } from '@tanstack/react-query';

import fetchMessages from '@/app/(protected)/main/_utils/fetchMessages';

import type { Crystal } from '@/shared/types/crystal';
import type { Message } from '@/shared/types/message';
import DecorationWrap from './DecorationWrap';

const MemoizedDecorationWrap = memo(DecorationWrap);

const Decorations = ({ crystal }: { crystal: Crystal['_id'] }) => {
  const { data, isLoading, isError } = useQuery<Message[]>({
    queryKey: ['messages', crystal],
    queryFn: () => fetchMessages(crystal),
    gcTime: 0,
    staleTime: 0,
  });

  if (isLoading || isError) return null;
  if (!data) return null;

  return <MemoizedDecorationWrap messages={data} />;
};

export default Decorations;
