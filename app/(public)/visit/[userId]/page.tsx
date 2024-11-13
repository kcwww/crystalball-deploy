import Visit from '@/app/(public)/visit/_components';

import { ROUTES } from '@/shared/constants/routes';
import { redirect } from 'next/navigation';
import getVisitUserData from '@/app/(public)/visit/[userId]/utils/getVisitUserData';

const VisitPage = async ({ params }: { params: { userId: string } }) => {
  const data = await getVisitUserData(params.userId);
  if (!data) redirect(ROUTES.LANDING);

  return (
    <>
      <Visit userData={data} />
    </>
  );
};

export default VisitPage;
