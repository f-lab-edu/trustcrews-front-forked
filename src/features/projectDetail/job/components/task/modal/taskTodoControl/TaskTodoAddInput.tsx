'use client';

import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { v4 } from 'uuid';
import {
  TaskModalType,
  taskTodoItemSelector,
} from '@/store/projectDetail/job/task/TaskModalStateStore';
import { IoIosAddCircle } from '@react-icons/all-files/io/IoIosAddCircle';

type TaskContentDetailAddInputProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  modalType: TaskModalType;
};

const TaskTodoAddInput = ({
  setIsOpen,
  modalType,
}: TaskContentDetailAddInputProps) => {
  const [value, setValue] = useState('');
  const [placeholder, setPlaceholder] = useState('할 일 입력');
  const idForEdit = useRef(v4());

  const setTaskContentDetailField = useSetRecoilState(
    taskTodoItemSelector({
      modalType,
      idForEdit: idForEdit.current,
    }),
  );

  const handleClickAddTaskDetailButton = () => {
    setTaskContentDetailField(value);
    setValue('');
    setIsOpen(false);
  };

  const handleChangeTaskInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') setPlaceholder('할 일 입력');
    setValue(e.target.value);
  };

  return (
    <div className='my-2 flex items-center'>
      <div className='w-full flex items-center p-1'>
        <div
          className={`relative ml-1 min-h-[2.3rem] mobile:min-h-[2rem] ${value.length === 0 && 'min-w-[6.8rem]'}`}
        >
          <div className='relative flex items-center space-x-1 z-10'>
            <div className='w-[320px] mobile:w-[240px] whitespace-nowrap text-transparent'>
              {value}
            </div>
          </div>
          <input
            type='text'
            placeholder={placeholder}
            className='h-full w-[320px] mobile:w-full absolute top-0 left-0 z-10 text-greyBlue hoverColorChange-ground200
                         appearance-none border-none focus:outline-none focus:border-none focus:ring-0'
            onChange={handleChangeTaskInput}
            spellCheck={false}
            value={value}
            maxLength={30}
            readOnly={false}
          />
        </div>
      </div>
      <div className={`w-full opacity-100 flex space-x-1 mx-1`}>
        <button
          type='button'
          onClick={handleClickAddTaskDetailButton}
          className='text-primary'
        >
          <IoIosAddCircle size={23} />
        </button>
      </div>
    </div>
  );
};

export default TaskTodoAddInput;
