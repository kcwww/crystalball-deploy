import Visit from '@/app/(public)/visit/_components';

import { ROUTES } from '@/shared/constants/routes';
import { redirect } from 'next/navigation';
import { ResolvingMetadata } from 'next';
import { connectToMongoDB } from '@/shared/database/mongodb/config';
import User from '@/shared/database/mongodb/models/userModel';
import { ORIGIN } from '@/shared/constants/url';
import { CURRENT_SEASON } from '@/shared/constants/Date';
import { CURRENT_YEAR } from '@/shared/constants/Date';
import { UserType } from '@/shared/types/user';

const getUserData = async (userId: string) => {
  await connectToMongoDB();

  const user = (await User.findOne({ uuid: userId }))?.toObject();
  if (!user) return null;
  else if (user.username === null) return null;
  return user;
};

export const generateMetadata = async (
  { params }: { params: { userId: string } },
  parent: ResolvingMetadata
) => {
  const data = await getUserData(params.userId);

  const previousMetadata = await parent;
  if (!data) {
    return {
      ...previousMetadata,
    };
  }

  return {
    ...previousMetadata,
    description: data.username
      ? `${data.username} 님의 수정구슬 입니다. 예쁜 메세지를 선물해주세요 !`
      : '존재하지 않는 사용자 입니다.',
    openGraph: {
      ...previousMetadata.openGraph,
      description: data.username
        ? `${data.username} 님의 수정구슬 입니다. 예쁜 메세지를 선물해주세요 !`
        : '존재하지 않는 사용자 입니다.',
      url: `${ORIGIN}/${ROUTES.VISIT_USER(params.userId)}`,
    },
    url: `${ORIGIN}/${ROUTES.VISIT_USER(params.userId)}`,
  };
};

const VisitPage = async ({ params }: { params: { userId: string } }) => {
  const data = (await getUserData(params.userId)) as UserType;

  if (!data) redirect(ROUTES.LANDING);
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
  return (
    <>
      <Visit userData={data} />
    </>
  );
};

export default VisitPage;
