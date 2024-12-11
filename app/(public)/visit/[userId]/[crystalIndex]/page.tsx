import VisitMake from '@/app/(public)/visit/[userId]/_components';
import { ROUTES } from '@/shared/constants/routes';
import { connectToMongoDB } from '@/shared/database/mongodb/config';
import User from '@/shared/database/mongodb/models/userModel';
import { redirect } from 'next/navigation';
import { User as UserType } from '@/shared/types/user';
import { CURRENT_SEASON } from '@/shared/constants/Date';
import { CURRENT_YEAR } from '@/shared/constants/Date';

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
    const crystalId = user.crystal_id
      ?.get(CURRENT_YEAR)
      ?.[CURRENT_SEASON]?.[idx].toString();
    if (!crystalId) return null;

    return {
      id: user._id,
      crystalId,
    };
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
  const idData = await getCrystalData(params.userId, params.crystalIndex);
  if (!idData) redirect(ROUTES.LANDING);

  const { id, crystalId } = idData;

  return (
    <VisitMake
      userId={id.toString()}
      uuid={params.userId}
      crystalId={crystalId}
      index={params.crystalIndex}
    />
  );
};

export default VisitMakePage;
