'use client';

import { Fragment } from 'react';
import { IoEllipsisVertical } from '@react-icons/all-files/io5/IoEllipsisVertical';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { useDeleteMilestone } from '@/features/projectDetail/job/api/milestone/deleteMilestone';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { activeMilestoneStateStore } from '@/store/projectDetail/job/milestone/ActiveMilestoneStateStore';
import {
  milestoneModFormStateStore,
  milestoneModModalStateStore,
} from '@/store/projectDetail/job/milestone/MilestoneModalStateStore';
import { cva } from 'class-variance-authority';
import { projectManageAuthStateStore } from '@/store/projectDetail/config/pmAuth/ProjectManageAuthStateStore';
import { projectIdState } from '@/store/projectDetail/ProjectIdStateStore';
import { MilestoneInfo } from '@/types/data/projectDetail/job/milestone';
import { bigIntToString, numStrToBigInt } from '@/shared/utils/stringUtils';

type MilestoneCardMenuProps = {
  milestoneInfo: MilestoneInfo;
};

const CardMenuButtonVariants = cva(
  'block px-4 py-2 tablet:text-[16px] mobile:text-sm',
  {
    variants: {
      variant: {
        default: 'text-gray-700',
        focus: 'bg-gray-100 text-gray-900',
      },
    },
  },
);

const cardMenuButtonClass = (focus: boolean) =>
  CardMenuButtonVariants({ variant: focus ? 'focus' : 'default' });

const MilestoneCardMenu = ({ milestoneInfo }: MilestoneCardMenuProps) => {
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  const resetActiveMilestone = useResetRecoilState(activeMilestoneStateStore);
  const setMilestoneModModalState = useSetRecoilState(
    milestoneModModalStateStore,
  );
  const setMilestoneModDataState = useSetRecoilState(
    milestoneModFormStateStore,
  );

  const { milestoneId, content, startDate, endDate, updateDate } =
    milestoneInfo;
  const projectId = useRecoilValue(projectIdState);
  const { code: userPMAuth } = useRecoilValue(projectManageAuthStateStore);

  const handleClickModButton = () => {
    setMilestoneModModalState((prev) => ({
      ...prev,
      isOpen: true,
      milestoneId: bigIntToString(milestoneId),
      updateDate,
    }));
    setMilestoneModDataState({
      content,
      startDate,
      endDate,
    });
  };

  const { mutate: deleteMilestone } = useDeleteMilestone(
    numStrToBigInt(projectId),
    userPMAuth,
    {
      onSuccess: (res) => {
        resetActiveMilestone();
        setSuccessSnackbar(res.message);
      },
      onError: (error) => setErrorSnackbar(error.message),
    },
  );

  const handleClickDeleteButton = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm('마일스톤과 관련 업무를 삭제하시겠습니까?')) {
      deleteMilestone(milestoneInfo.milestoneId);
    }
  };

  return (
    <Menu as='div' className='self-start flex-shrink-0 pr-2 text-center'>
      <div>
        <MenuButton
          className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none '
          data-role='milestone-menu'
        >
          <span className='sr-only'>마일스톤 메뉴</span>
          <IoEllipsisVertical
            className='h-5 w-5'
            aria-hidden='true'
            data-role='milestone-menu'
          />
        </MenuButton>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <MenuItems className='absolute right-2 z-10 mt-1 tablet:min-w-[60px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1 '>
            <MenuItem>
              {({ focus }) => (
                <a
                  href='#'
                  onClick={handleClickModButton}
                  className={cardMenuButtonClass(focus)}
                >
                  수정
                </a>
              )}
            </MenuItem>
            <MenuItem>
              {({ focus }) => (
                <a
                  href='#'
                  onClick={handleClickDeleteButton}
                  className={cardMenuButtonClass(focus)}
                >
                  삭제
                </a>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default MilestoneCardMenu;
