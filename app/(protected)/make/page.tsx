import { redirect } from 'next/navigation';
import { auth, signOut } from '@/auth';

import { ROUTES } from '@/shared/constants/routes';
import User from '@/shared/database/mongodb/models/userModel';
import { connectToMongoDB } from '@/shared/database/mongodb/config';
import { sessionUser, User as UserType } from '@/shared/types/user';
import Make from '@/app/(protected)/make/_components';

const getUserData = async () => {
  const session = await auth();

  if (!session) return null;
  const user = session.user as sessionUser;

  try {
    await connectToMongoDB();

    const existingUser = (await User.findOne({
      email: user.email,
      provider: user.provider,
    })) as UserType;

    if (!existingUser) {
      await signOut();
      return null;
    }

    return existingUser;
  } catch (error) {
    console.error('Failed to get user data', error);
    return null;
  }
};

const MakePage = async () => {
  const data = (await getUserData()) as UserType;
  const userData = {
    _id: data._id,
    email: data.email,
    uuid: data.uuid,
    crystal_id: data.crystal_id,
    username: data.username,
    provider: data.provider,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  } as UserType;

  if (!userData) redirect(ROUTES.LANDING);
  if (userData.username === null) redirect(ROUTES.NICKNAME);

  return <Make userData={userData} />;
};

export default MakePage;
