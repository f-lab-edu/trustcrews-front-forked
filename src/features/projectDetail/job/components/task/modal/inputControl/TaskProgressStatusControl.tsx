import { useRecoilState } from 'recoil';
import { taskProgressModFieldSelector } from '@/store/projectDetail/job/task/TaskModalStateStore';
import { TASK_STATUS } from '@/constants/data/projectDetail/job/task/taskStatus';
import { Field, Label, Switch } from '@headlessui/react';
import { TaskStatusCode } from '@/types/data/projectDetail/job/task';
import TaskStatusBadge from '@/features/projectDetail/job/components/task/TaskStatusBadge';

const {
  PS001: TASK_WAIT,
  PS002: { code: TASK_PROCESSING },
  PS003: { code: TASK_COMPLETE },
} = TASK_STATUS;

const TaskProgressStatusControl = () => {
  const [progressStatus, setProgressStatus] = useRecoilState(
    taskProgressModFieldSelector,
  );

  const handleToggleSwitch = () => {
    setProgressStatus((prev) =>
      prev === TASK_COMPLETE ? TASK_PROCESSING : TASK_COMPLETE,
    );
  };

  return (
    <Field className='flex'>
      <Label className='text-gray-700 font-semibold self-center'>진행</Label>
      <div className='flex w-[350px] mobile:w-[220px] h-[42px] mobile:h-[38px] space-x-3 ml-auto items-center'>
        {progressStatus === TASK_WAIT.code ? (
          <TaskStatusBadge taskStatus={TASK_WAIT.code}>
            {TASK_WAIT.name}
          </TaskStatusBadge>
        ) : (
          <Switch
            checked={progressStatus === TASK_COMPLETE}
            onChange={handleToggleSwitch}
            className='group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-amber-200/50 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-none  data-[checked]:bg-gray-200'
          >
            <span className='sr-only'>
              {TASK_STATUS[progressStatus as TaskStatusCode].name}
            </span>
            <span className='pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5'>
              <span
                aria-hidden='true'
                className='absolute left-[50px] flex h-full w-[60px] items-center justify-center transition-opacity duration-50 ease-in leading-none text-[#785C03] group-data-[checked]:opacity-0 group-data-[checked]:duration-50 group-data-[checked]:ease-out'
              >
                진행중
              </span>
              <span
                aria-hidden='true'
                className='absolute left-[25px] flex h-full w-[60px] items-center justify-center opacity-0 transition-opacity duration-50 ease-out leading-none text-greyDarkblue group-data-[checked]:opacity-100 group-data-[checked]:duration-50 group-data-[checked]:ease-in'
              >
                완료
              </span>
            </span>
          </Switch>
        )}
      </div>
    </Field>
  );
};

export default TaskProgressStatusControl;
