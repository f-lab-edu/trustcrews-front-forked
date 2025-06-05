import { useRecoilValue, useResetRecoilState } from 'recoil';
import useModalPortalElement from '@/shared/hooks/useModalPortalElement';
import { createPortal } from 'react-dom';
import Modal from '@/shared/ui/Modal';
import TaskSummaryControl from '@/features/projectDetail/job/components/task/modal/inputControl/TaskSummaryControl';
import TaskDateControl from '@/features/projectDetail/job/components/task/modal/inputControl/TaskDateControl';
import TaskAssignedCrewControl from '@/features/projectDetail/job/components/task/modal/inputControl/TaskAssignedCrewControl';
import {
  TaskModalType,
  TaskModForm,
  taskModFormStateStore,
  taskModModalStateStore,
} from '@/store/projectDetail/job/task/TaskModalStateStore';
import useUpdateTask, {
  updateTaskInputSchema,
} from '@/features/projectDetail/job/api/task/updateTask';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { ZodError } from 'zod';
import TaskTodoControl from './taskTodoControl';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import TaskProgressStatusControl from '@/features/projectDetail/job/components/task/modal/inputControl/TaskProgressStatusControl';

const modalType: TaskModalType = 'mod';

const TaskModModal = () => {
  const resetTaskModModalState = useResetRecoilState(taskModModalStateStore);
  const resetTaskModModalData = useResetRecoilState(taskModFormStateStore);
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  const { isOpen, title, taskId, userPMAuth } = useRecoilValue(
    taskModModalStateStore,
  );
  const [portalElement] = useModalPortalElement(isOpen);

  const modModalData = useRecoilValue(taskModFormStateStore);

  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask(
    numStrToBigInt(taskId),
    userPMAuth,
    {
      onSuccess: (res) => {
        resetTaskModModalState();
        resetTaskModModalData();
        setSuccessSnackbar(res.message);
      },
      onError: (error) => setErrorSnackbar(error.message),
    },
  );

  const handleClickCloseButton = () => {
    resetTaskModModalState();
    resetTaskModModalData();
  };

  const handleClickConfirmButton = () => {
    const data: TaskModForm = modModalData;

    try {
      updateTaskInputSchema.parse(data);
    } catch (e: unknown) {
      setErrorSnackbar((e as ZodError).errors[0].message);
      return;
    }
    updateTask({
      ...modModalData,
      assignedUserId: numStrToBigInt(modModalData.assignedUserId),
    });
  };

  return (
    <>
      {isOpen && portalElement
        ? createPortal(
            <Modal
              isOpen={isOpen}
              close={handleClickCloseButton}
              title={title}
              onClickConfirmHandler={handleClickConfirmButton}
              isUpdating={isUpdating}
            >
              <section className='tablet:w-[450px] mobile:w-[280px] max-h-[500px] mb-10 flex-col mt-5'>
                <div className='space-y-5 mobile:space-y-3 mx-4 mobile:mx-0 mobile:text-sm'>
                  <TaskSummaryControl modalType={modalType} />
                  <TaskProgressStatusControl />
                  <TaskDateControl modalType={modalType} />
                  <TaskAssignedCrewControl modalType={modalType} />
                  <TaskTodoControl modalType={modalType} />
                </div>
              </section>
            </Modal>,
            portalElement as Element,
          )
        : null}
    </>
  );
};

export default TaskModModal;
