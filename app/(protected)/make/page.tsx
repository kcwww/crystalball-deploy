import { redirect } from 'next/navigation';
import { auth, signOut } from '@/auth';

import { ROUTES } from '@/shared/constants/routes';
import User from '@/shared/database/mongodb/models/userModel';
import { connectToMongoDB } from '@/shared/database/mongodb/config';
import { sessionUser, User as UserType } from '@/shared/types/user';
import Make from '@/app/(protected)/make/_components';
import { CURRENT_YEAR } from '@/shared/constants/Date';
import { CURRENT_SEASON } from '@/shared/constants/Date';

const getUserData = async () => {
  const session = await auth();

  if (!session) redirect(ROUTES.LANDING);
  const user = session.user as sessionUser;

  try {
    await connectToMongoDB();

    const existingUser = (
      await User.findOne({
        email: user.email,
        provider: user.provider,
      })
    )?.toObject() as UserType;

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

  if (data === undefined || data === null) {
    await signOut();
    redirect(ROUTES.LANDING);
  }
  if (data.username === null) redirect(ROUTES.NICKNAME);
  data._id = data._id.toString();
  const currentYearMap = data.crystal_id?.get(CURRENT_YEAR);

  const currentSeason = currentYearMap?.[CURRENT_SEASON]?.map((item) =>
    item.toString()
  );
  const newMap = new Map();
  newMap.set(CURRENT_YEAR, {
    [CURRENT_SEASON]: currentSeason,
  });
  data.crystal_id = newMap;

  return <Make userData={data} />;
};

export default MakePage;
