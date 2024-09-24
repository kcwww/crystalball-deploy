import SnowGlobeCanvas from '@/shared/components/canvas/SnowGlobeCanvas';
import UISection from '@/shared/components/ui/UISection';
import Header from '@/app/(landing)/_components/Header';
import IntroButtonSection from '@/app/(landing)/_components/IntroButtonSection';

const Home = () => {
  return (
    <>
      <UISection>
        <Header />
        <IntroButtonSection />
      </UISection>
      <SnowGlobeCanvas />
    </>
  );
};

export default Home;
