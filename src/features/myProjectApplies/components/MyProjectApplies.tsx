import Button from '@/shared/ui/Button';
import { useSetRecoilState } from 'recoil';
import MyProjectAppliesModal from '@/features/myProjectApplies/components/modal/MyProjectAppliesModal';
import { myProjectAppliesModalStateStore } from '@/store/myProjectApplies/MyProjectAppliesModalStateStore';

const MyProjectApplies = () => {
  const setUserNoticeModal = useSetRecoilState(myProjectAppliesModalStateStore);

  const handleClickOpenModalButton = () => {
    setUserNoticeModal({ isOpen: true });
  };

  return (
    <>
      <Button
        className='mt-10'
        type='button'
        onClick={handleClickOpenModalButton}
      >
        프로젝트 지원 현황
      </Button>
      <MyProjectAppliesModal />
    </>
  );
};

export default MyProjectApplies;
