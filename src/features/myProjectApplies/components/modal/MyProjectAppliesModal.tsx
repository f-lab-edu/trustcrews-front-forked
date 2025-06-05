'use client';

import { useRecoilState } from 'recoil';
import { createPortal } from 'react-dom';
import Modal from '@/shared/ui/Modal';
import MyProjectAppliesDetail from './MyProjectAppliesDetail';
import useModalPortalElement from '@/shared/hooks/useModalPortalElement';
import { myProjectAppliesModalStateStore } from '@/store/myProjectApplies/MyProjectAppliesModalStateStore';
import MyProjectAppliesDetailSkeleton from '@/features/myProjectApplies/components/modal/MyProjectAppliesDetailSkeleton';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';

const MyProjectAppliesModal = () => {
  const [{ isOpen }, setIsOpen] = useRecoilState(
    myProjectAppliesModalStateStore,
  );

  const [portalElement] = useModalPortalElement(isOpen);

  return (
    <>
      {isOpen && portalElement
        ? createPortal(
            <Modal
              isOpen={isOpen}
              close={() => {
                setIsOpen({ isOpen: false });
              }}
              title='프로젝트 지원 현황'
              onClickConfirmHandler={() => {
                setIsOpen({ isOpen: false });
              }}
            >
              <FieldQueryBoundary
                errorFallbackSize='md'
                suspenseFallback={<MyProjectAppliesDetailSkeleton />}
              >
                <MyProjectAppliesDetail />
              </FieldQueryBoundary>
            </Modal>,
            portalElement as Element,
          )
        : null}
    </>
  );
};

export default MyProjectAppliesModal;
