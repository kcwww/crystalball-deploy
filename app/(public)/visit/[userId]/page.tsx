import Visit from '@/app/(public)/visit/_components';

import { ROUTES } from '@/shared/constants/routes';
import { redirect } from 'next/navigation';
import getVisitUserData from '@/app/(public)/visit/[userId]/utils/getVisitUserData';
import { ResolvingMetadata } from 'next';
import { connectToMongoDB } from '@/shared/database/mongodb/config';
import User from '@/shared/database/mongodb/models/userModel';
import { ORIGIN } from '@/shared/constants/url';

import { CURRENT_YEAR, CURRENT_SEASON } from '@/shared/constants/Date';

const getUserData = async (userId: string) => {
  await connectToMongoDB();

  const user = (await User.findOne({ uuid: userId }))?.toObject();

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
  const data = await getVisitUserData(params.userId);

  if (!data) redirect(ROUTES.LANDING);
  data.user._id = data.user._id.toString();
  const currentYearMap = data.user.crystal_id?.get(CURRENT_YEAR);

  const currentSeason = currentYearMap?.[CURRENT_SEASON]?.map((item) =>
    item.toString()
  );
  const newMap = new Map();
  newMap.set(CURRENT_YEAR, {
    [CURRENT_SEASON]: currentSeason,
  });
  data.user.crystal_id = newMap;
  return (
    <>
      <Visit userData={data} />
    </>
  );
};

export default VisitPage;
