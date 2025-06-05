import { useState } from 'react';
import { RiAddLine } from '@react-icons/all-files/ri/RiAddLine';
import { useRecoilValue } from 'recoil';
import {
  taskModalEditDisabledSelector,
  TaskModalType,
  taskTodoSelector,
} from '@/store/projectDetail/job/task/TaskModalStateStore';
import { MAX_TASK_CONTENT_DETAIL } from '@/constants/data/projectDetail/job/task/maxTaskContentDetail';
import useSnackbar from '@/shared/hooks/useSnackbar';
import clsx from 'clsx';
import TaskTodoAddInput from '@/features/projectDetail/job/components/task/modal/taskTodoControl/TaskTodoAddInput';

const openAddInputButtonClass = (isInputOpen: boolean) =>
  clsx(
    'group w-full flex items-center space-x-1 py-2 px-1 text-lg mobile:text-base text-gray-600 leading-[2.15rem] font-semibold disabled:text-gray-600/70',
    isInputOpen && 'bg-gray-50',
  );

type ToggleTaskContentDetailAddInputProps = {
  modalType: TaskModalType;
};

const AddTaskTodoToggle = ({
  modalType,
}: ToggleTaskContentDetailAddInputProps) => {
  const { setInfoSnackbar } = useSnackbar();
  const [isOpenAddInput, setIsOpenAddInput] = useState(false);
  const disabled = useRecoilValue(taskModalEditDisabledSelector(modalType));
  const taskContentDetailMap = useRecoilValue(taskTodoSelector(modalType));

  const handleClickOpenInputButton = () => {
    if (taskContentDetailMap.size >= MAX_TASK_CONTENT_DETAIL) {
      setInfoSnackbar('할 일은 업무당 최대 5개 추가할 수 있습니다.');
      return;
    }
    setIsOpenAddInput((prev) => !prev);
  };

  return (
    <>
      <button
        onClick={handleClickOpenInputButton}
        className={openAddInputButtonClass(isOpenAddInput)}
        disabled={disabled}
      >
        <RiAddLine />
        <span>추가</span>
        <span className='text-sm mobile:text-xs text-gray-500 group-disabled:text-gray-500/70'>
          (최대 5개)
        </span>
      </button>
      {isOpenAddInput && (
        <TaskTodoAddInput setIsOpen={setIsOpenAddInput} modalType={modalType} />
      )}
    </>
  );
};

export default AddTaskTodoToggle;
