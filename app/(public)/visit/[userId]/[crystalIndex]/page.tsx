import mongoose from 'mongoose';

import VisitMake from '@/app/(public)/visit/[userId]/_components';
import { ROUTES } from '@/shared/constants/routes';
import { connectToMongoDB } from '@/shared/database/mongodb/config';
import User from '@/shared/database/mongodb/models/userModel';
import { redirect } from 'next/navigation';
import { User as UserType } from '@/shared/types/user';

const getCrystalData = async (userId: string, crystalIndex: string) => {
  const idx = parseInt(crystalIndex);

  try {
    await connectToMongoDB();

    const user = (
      await User.findOne({
        uuid: userId,
      })
    )?.toObject() as UserType;
    if (!user) return null;
    user._id = user._id.toString();
    const crystalId = user.crystal_id[idx].toString();
    if (!crystalId) return null;

    return { id: user._id, crystalId };
  } catch (error) {
    console.error(error);
    return null;
  }
};

const VisitMakePage = async ({
  params,
}: {
  params: { userId: string; crystalIndex: string };
}) => {
  const { id, crystalId }: any = await getCrystalData(
    params.userId,
    params.crystalIndex
  );
  if (!crystalId) redirect(ROUTES.LANDING);

  return (
    <VisitMake
      userId={id}
      uuid={params.userId}
      crystalId={crystalId as mongoose.Schema.Types.ObjectId}
      index={params.crystalIndex}
    />
  );
};

export default VisitMakePage;
