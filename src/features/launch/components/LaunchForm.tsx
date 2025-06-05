import RowWide from '@/shared/ui/RowWide';
import Button from '@/shared/ui/Button';
import { useRouter } from 'next/navigation';
import { useResetRecoilState } from 'recoil';
import { useEffect } from 'react';
import LaunchPostTitleControl from '@/features/launch/components/inputControl/LaunchPostTitleControl';
import LaunchProjectNameControl from '@/features/launch/components/inputControl/LaunchProjectNameControl';
import LaunchProjectSubjectControl from '@/features/launch/components/inputControl/LaunchProjectSubjectControl';
import LaunchPositionControl from '@/features/launch/components/inputControl/LaunchPositionControl';
import LaunchProjectDateControl from '@/features/launch/components/inputControl/LaunchProjectDateControl';
import LaunchTechStackControl from '@/features/launch/components/inputControl/LaunchTechStackControl';
import LaunchContactControl from '@/features/launch/components/inputControl/LaunchContactControl';
import LaunchPostContentControl from '@/features/launch/components/inputControl/LaunchPostContentControl';
import { postFormStateStore } from '@/store/launch/PostFormStateStore';
import { projectFormStateStore } from '@/store/launch/ProjectFormStateStore';
import LaunchButton from '@/features/launch/components/LaunchButton';

const LaunchForm = () => {
  const router = useRouter();
  const resetPostFormState = useResetRecoilState(postFormStateStore);
  const resetProjectFormState = useResetRecoilState(projectFormStateStore);

  useEffect(() => {
    return () => {
      resetPostFormState();
      resetProjectFormState();
    };
  }, [resetPostFormState, resetProjectFormState]);

  const handleClickCancelButton = () => {
    router.push('/');
  };

  return (
    <div
      role='form'
      aria-label='게시글 및 프로젝트 생성'
      className='p-5 mobile:p-1 mb-8'
    >
      <LaunchPostTitleControl />
      <div className='grid pc:grid-cols-2 tablet:grid-cols-1 gap-y-10 place-content-between mobile:place-content-center'>
        <LaunchProjectNameControl />
        <LaunchProjectSubjectControl />
        <LaunchPositionControl />
        <LaunchProjectDateControl />
        <LaunchTechStackControl />
        <LaunchContactControl />
      </div>
      <LaunchPostContentControl />
      <RowWide className='space-x-2 text-center mt-10'>
        <Button theme='primaryHollow' onClick={handleClickCancelButton}>
          취소
        </Button>
        <LaunchButton />
      </RowWide>
    </div>
  );
};

export default LaunchForm;
