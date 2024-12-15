import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '@/auth';
import { ROUTES } from '@/shared/constants/routes';

import { connectToMongoDB } from '@/shared/database/mongodb/config';
import User, { IUser } from '@/shared/database/mongodb/models/userModel';
import { sessionUser, UserType } from '@/shared/types/user';
import { createUser } from '@/shared/database/mongodb/actions/userAction';
import { CURRENT_YEAR, CURRENT_SEASON } from '@/shared/constants/Date';

import Main from '@/app/(protected)/main/_components/Main';

const getUserData = async (): Promise<UserType | null> => {
  const session = await auth();

  if (!session) redirect(ROUTES.LANDING);

  try {
    const user = session.user as sessionUser;
    await connectToMongoDB();

    const existingUser = await User.findOne({
      email: user.email,
      provider: user.provider,
    });

    if (existingUser) return existingUser.toObject() as UserType;

    const uuid = uuidv4();
    const initUser: IUser = {
      email: user.email,
      uid: user.uid,
      crystal_id: undefined,
      uuid,
      username: null,
      provider: user.provider,
    };

    const newUser = await createUser(initUser);

    return newUser as UserType;
  } catch (error) {
    console.error('Failed to create user', error);
    return null;
  }
};

const MainPage = async () => {
  const user = await getUserData();
  const crystal = user?.crystal_id;

  if (!user) redirect(ROUTES.ERROR);
  if (user.username === null) redirect(ROUTES.MAKE);
  else if (
    crystal === undefined ||
    crystal.get(CURRENT_YEAR)?.[CURRENT_SEASON] === undefined
  )
    redirect(ROUTES.MAKE);
  user._id = user._id.toString();

  const currentYearMap = user.crystal_id?.get(CURRENT_YEAR);

  const currentSeason = currentYearMap?.[CURRENT_SEASON]?.map((item) =>
    item.toString()
  );
  const newMap = new Map();
  newMap.set(CURRENT_YEAR, {
    [CURRENT_SEASON]: currentSeason,
  });
  user.crystal_id = newMap;

  return <Main userData={user} />;
};

export default MainPage;
