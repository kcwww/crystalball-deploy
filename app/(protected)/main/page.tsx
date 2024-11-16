import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

import { auth } from '@/auth';
import { ROUTES } from '@/shared/constants/routes';

import { connectToMongoDB } from '@/shared/database/mongodb/config';
import User, { IUser } from '@/shared/database/mongodb/models/userModel';
import { sessionUser, User as UserType } from '@/shared/types/user';
import { createUser } from '@/shared/database/mongodb/actions/userAction';

import Main from './_components/Main';

const getUserData = async () => {
  const session = await auth();

  if (!session) redirect(ROUTES.LANDING);

  try {
    const user = session.user as sessionUser;
    await connectToMongoDB();

    const existingUser = (
      await User.findOne({
        email: user.email,
        provider: user.provider,
      })
    )?.toObject() as UserType;

    if (existingUser) return existingUser;

    const uuid = uuidv4();
    const initUser: IUser = {
      email: user.email,
      uid: user.uid,
      crystal_id: [],
      uuid,
      username: null,
      provider: user.provider,
    };

    const newUser = (await createUser(initUser)) as UserType;

    return newUser;
  } catch (error) {
    console.error('Failed to create user', error);
    return null;
  }
};

const MainPage = async () => {
  const user = (await getUserData()) as UserType;
  user._id = String(user._id);
  user.crystal_id = user.crystal_id.map((id) => id.toString());

  if (!user) redirect(ROUTES.ERROR);
  if (user.username === null) redirect(ROUTES.NICKNAME);
  else if (user.crystal_id === undefined || user.crystal_id.length === 0) {
    redirect(ROUTES.MAKE);
  }

  return <Main userData={user} />;
};

export default MainPage;
