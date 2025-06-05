'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  taskModalEditDisabledSelector,
  taskTodoItemSelector,
  taskTodoSelector,
} from '@/store/projectDetail/job/task/TaskModalStateStore';
import { clsx } from 'clsx';
import { cva } from 'class-variance-authority';
import TaskTodoEditFinishButton from '@/features/projectDetail/job/components/task/modal/taskTodoControl/TaskTodoEditFinishButton';
import TaskTodoCancelDeleteButton from '@/features/projectDetail/job/components/task/modal/taskTodoControl/TaskTodoCancelDeleteButton';

const TaskContentDetailInputVariants = cva(
  'w-[320px] mobile:w-full h-full absolute top-0 left-0 z-10 appearance-none border-none focus:border-transparent  focus:ring-0 focus:outline-none',
  {
    variants: {
      variant: {
        editable: 'hoverColorChange-ground200',
        disabled: 'text-gray-400',
      },
    },
  },
);

type TaskContentDetailInputProps = {
  idForEdit: string;
  modalType: 'add' | 'mod';
};

const TaskTodoModInput = ({
  idForEdit,
  modalType,
}: TaskContentDetailInputProps) => {
  const disabled = useRecoilValue(taskModalEditDisabledSelector(modalType));
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [placeholder, setPlaceholder] = useState('할 일 입력');
  const [taskContentDetailField, setTaskContentDetailField] = useRecoilState(
    taskTodoItemSelector({ modalType, idForEdit }),
  );
  const [value, setValue] = useState(() => taskContentDetailField);
  const setTaskContentDetails = useSetRecoilState(taskTodoSelector(modalType));

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClickEditButton = () => {
    setIsReadOnly(false);
    inputRef.current?.focus();
  };

  const handleClickEditFinishButton = () => {
    setTaskContentDetailField(value);
    setIsReadOnly(true);
  };

  const handleClickDeleteButton = () => {
    setTaskContentDetails((prev) => {
      const updatedContentDetails = new Map(prev);
      updatedContentDetails.delete(idForEdit);
      return updatedContentDetails;
    });
    setIsReadOnly(true);
  };

  const handleClickEditCancelButton = () => {
    setValue(taskContentDetailField);
    setIsReadOnly(true);
  };

  const handleChangeTaskDetailInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setPlaceholder('할 일 입력');
    }
    setValue(e.target.value);
  };

  return (
    <div className='w-full my-1 flex items-center relative'>
      <div className='w-full flex items-center p-1 '>
        <div
          className={clsx(
            'relative ml-1 min-h-[2.3rem] mobile:min-h-[2rem]',
            !value && 'min-w-[6.8rem]',
          )}
        >
          <div className='relative flex items-center space-x-1 z-10'>
            <div className='w-[320px] mobile:w-[210px] h-full whitespace-nowrap text-transparent'>
              {value}
            </div>
          </div>
          <input
            ref={inputRef}
            type='text'
            placeholder={placeholder}
            className={TaskContentDetailInputVariants({
              variant: isReadOnly ? 'disabled' : 'editable',
            })}
            onChange={handleChangeTaskDetailInput}
            value={value}
            maxLength={30}
            readOnly={isReadOnly}
          />
        </div>
      </div>
      <div className='w-full flex space-x-3 mx-1 text-3xl text-neutral-dark z-10'>
        <TaskTodoEditFinishButton
          disabled={disabled}
          mode={isReadOnly ? 'edit' : 'finish'}
          onClick={
            isReadOnly ? handleClickEditButton : handleClickEditFinishButton
          }
        />
        <TaskTodoCancelDeleteButton
          disabled={disabled}
          mode={isReadOnly ? 'delete' : 'cancel'}
          onClick={
            isReadOnly ? handleClickDeleteButton : handleClickEditCancelButton
          }
        />
      </div>
    </div>
  );
};

export default TaskTodoModInput;
