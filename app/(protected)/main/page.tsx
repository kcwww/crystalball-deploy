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
  const user = session.user as sessionUser;

  await connectToMongoDB();

  const existingUser = (await User.findOne({
    email: user.email,
    provider: user.provider,
  })) as UserType;

  if (!existingUser) {
    const uuid = uuidv4();
    const newUser: IUser = {
      email: user.email,
      crystal_id: [],
      uuid,
      username: null,
      provider: user.provider,
    };

    try {
      const user = (await createUser(newUser)) as any;
      return user;
    } catch (error) {
      console.error('Failed to create user', error);
      return null;
    }
  }

  return existingUser;
};

const MainPage = async () => {
  const user = (await getUserData()) as UserType;
  if (!user) redirect(ROUTES.ERROR);
  if (user.username === null) redirect(ROUTES.NICKNAME);
  if (user.crystal_id.length === 0) redirect(ROUTES.MAKE);

  return <Main userData={user} />;
};

export default MainPage;
