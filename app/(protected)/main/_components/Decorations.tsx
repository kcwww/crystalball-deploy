import { useQuery } from '@tanstack/react-query';

import fetchMessages from '@/app/(protected)/main/_utils/fetchMessages';

import type { Crystal } from '@/shared/types/crystal';
import type { Message } from '@/shared/types/message';
import DecorationWrap from './DecorationWrap';

const Decorations = ({ crystal }: { crystal: Crystal['_id'] }) => {
  const { data, isLoading, isError } = useQuery<Message[]>({
    queryKey: ['meesages'],
    queryFn: () => fetchMessages(crystal),
    gcTime: 0,
  });

  if (isLoading || isError) return null;
  if (!data) return null;

  return <DecorationWrap messages={data} />;
};

export default Decorations;
