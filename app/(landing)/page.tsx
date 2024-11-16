import { auth } from '@/auth';

import CrystalCanvas from '@/shared/components/canvas/CrystalCanvas';
import UISection from '@/shared/components/ui/UISection';
import Header from '@/app/(landing)/_components/Header';
import IntroButtonSection from '@/app/(landing)/_components/IntroButtonSection';
import PreviousButton from '@/shared/components/ui/PreviousButton';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/shared/constants/routes';
import { sessionUser } from '@/shared/types/user';

const LandingPage = async () => {
  const session = await auth();

  if (session) {
    const user = session.user as sessionUser;
    if (user) {
      redirect(ROUTES.MAIN);
    }
  }

  return (
    <>
      <PreviousButton />
      <UISection>
        <Header />
        <IntroButtonSection />
      </UISection>
      <CrystalCanvas />
    </>
  );
};

export default LandingPage;
