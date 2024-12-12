import { auth, signOut } from '@/auth';
import { Toaster } from 'sonner';

import NicknameForm from '@/app/(protected)/nickname/_components/NicknameForm';
import { sessionUser, User as UserType } from '@/shared/types/user';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/shared/constants/routes';
import User from '@/shared/database/mongodb/models/userModel';
import { connectToMongoDB } from '@/shared/database/mongodb/config';

const Nickname = async () => {
  const session = await auth();
  if (!session) return redirect(ROUTES.LANDING);

  const user = session.user as sessionUser;
  await connectToMongoDB();
  const result = (await User.findOne({
    email: user.email,
    uid: user.uid,
    provider: user.provider,
  })) as UserType;

  if (!result) {
    await signOut();
    redirect(ROUTES.LANDING);
  }

  if (result.username !== null) redirect(ROUTES.MAIN);

  return (
    <>
      <section className="flex h-dvh flex-col items-center justify-between py-28">
        <h1 className="text-3xl font-bold text-yellow-300">
          수정 구슬 속 내 마음
        </h1>
        <NicknameForm user={user} />
        <div />
      </section>
      <Toaster richColors />
    </>
  );
};

export default Nickname;
