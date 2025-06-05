'use client';

import Input from '@/shared/ui/Input';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  taskFormFieldSelector,
  taskModalEditDisabledSelector,
  TaskModalType,
} from '@/store/projectDetail/job/task/TaskModalStateStore';
import { ChangeEvent } from 'react';

const INPUT_ID = 'taskContent';

type TaskSummaryProps = {
  modalType: TaskModalType;
};

const TaskSummaryControl = ({ modalType }: TaskSummaryProps) => {
  const disabled = useRecoilValue(taskModalEditDisabledSelector(modalType));
  const [summary, setSummary] = useRecoilState(
    taskFormFieldSelector({ modalType, fieldKey: 'summary' }),
  );

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSummary(e.target.value);
  };

  return (
    <div className='flex space-x-10 mobile:space-x-6'>
      <label
        htmlFor={INPUT_ID}
        className='text-gray-700 font-semibold self-center'
      >
        제목
      </label>
      <div className='w-[250px] mobile:w-[220px]'>
        <Input
          id={INPUT_ID}
          placeholder='제목 입력'
          value={summary}
          onChange={handleChangeInput}
          maxLength={20}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default TaskSummaryControl;
