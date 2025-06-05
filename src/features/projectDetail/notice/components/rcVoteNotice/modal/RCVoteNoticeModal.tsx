import { useRecoilValue, useResetRecoilState } from 'recoil';
import { createPortal } from 'react-dom';
import Modal from '@/shared/ui/Modal';
import RCVoteNoticeDetail from '@/features/projectDetail/notice/components/rcVoteNotice/modal/RCVoteNoticeDetail';
import { rcVoteNoticeModalState } from '@/store/projectDetail/notice/rcVoteNotice/RCVoteNoticeModalStateStore';
import useModalPortalElement from '@/shared/hooks/useModalPortalElement';
import RCVoteNoticeDetailSkeleton from '@/features/projectDetail/notice/components/rcVoteNotice/modal/RCVoteNoticeDetailSkeleton';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';

const RCVoteNoticeModal = () => {
  const resetRCVoteNoticeModalState = useResetRecoilState(
    rcVoteNoticeModalState,
  );

  const { isOpen, title } = useRecoilValue(rcVoteNoticeModalState);

  const [portalElement] = useModalPortalElement(isOpen);

  return (
    <>
      {isOpen && portalElement
        ? createPortal(
            <Modal
              isOpen={isOpen}
              close={resetRCVoteNoticeModalState}
              title={title}
            >
              <FieldQueryBoundary
                errorFallbackSize='md'
                suspenseFallback={<RCVoteNoticeDetailSkeleton />}
              >
                <RCVoteNoticeDetail />
              </FieldQueryBoundary>
            </Modal>,
            portalElement as Element,
          )
        : null}
    </>
  );
};

export default RCVoteNoticeModal;
