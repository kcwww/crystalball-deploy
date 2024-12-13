import { LockKeyhole } from 'lucide-react';
import useModal from '@/shared/hooks/useModal';
import MODAL_TYPE from '@/shared/constants/modal';

const PrivateButton = ({ isPrivate }: { isPrivate: Date | null }) => {
  const { onOpen } = useModal();

  return (
    <button
      onClick={() => {
        onOpen(MODAL_TYPE.PRIVATE_INFO);
      }}
      className="transfrom pointer-events-auto rounded-full p-2 text-white"
    >
      {isPrivate && <LockKeyhole />}
    </button>
  );
};

export default PrivateButton;
