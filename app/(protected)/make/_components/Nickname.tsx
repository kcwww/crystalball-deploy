import { Toaster } from 'sonner';

import NicknameForm from '@/app/(protected)/make/_components/NicknameForm';
import { User as UserType } from '@/shared/types/user';

const Nickname = async ({ data }: { data: UserType }) => {
  return (
    <>
      <section className="flex h-dvh flex-col items-center justify-between py-28">
        <h1 className="text-3xl font-bold text-yellow-300">
          수정 구슬 속 내 마음
        </h1>
        <NicknameForm user={data} />
        <div />
      </section>
      <Toaster richColors />
    </>
  );
};

export default Nickname;
