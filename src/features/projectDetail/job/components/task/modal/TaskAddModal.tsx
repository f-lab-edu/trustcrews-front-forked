import { useRecoilValue, useResetRecoilState } from 'recoil';
import useModalPortalElement from '@/shared/hooks/useModalPortalElement';
import { createPortal } from 'react-dom';
import Modal from '@/shared/ui/Modal';
import TaskDateControl from '@/features/projectDetail/job/components/task/modal/inputControl/TaskDateControl';
import TaskAssignedCrewControl from '@/features/projectDetail/job/components/task/modal/inputControl/TaskAssignedCrewControl';
import TaskSummaryControl from '@/features/projectDetail/job/components/task/modal/inputControl/TaskSummaryControl';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { ZodError } from 'zod';
import useCreateTask, {
  createTaskInputSchema,
} from '@/features/projectDetail/job/api/task/createTask';
import {
  taskAddFormStateStore,
  taskAddModalStateStore,
  TaskModalType,
} from '@/store/projectDetail/job/task/TaskModalStateStore';
import TaskTodoControl from './taskTodoControl';
import { numStrToBigInt } from '@/shared/utils/stringUtils';

const modalType: TaskModalType = 'add';

const TaskAddModal = () => {
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  const { isOpen, title, projectId, milestoneId } = useRecoilValue(
    taskAddModalStateStore,
  );
  const [portalElement] = useModalPortalElement(isOpen);

  const addModalData = useRecoilValue(taskAddFormStateStore);
  const resetAddModalData = useResetRecoilState(taskAddFormStateStore);
  const resetAddModalState = useResetRecoilState(taskAddModalStateStore);

  const { mutate: createTask, isPending: isCreating } = useCreateTask(
    numStrToBigInt(projectId),
    numStrToBigInt(milestoneId),
    {
      onSuccess: (res) => {
        setSuccessSnackbar(res.message);
        resetAddModalData();
        resetAddModalState();
      },
      onError: (error) => {
        setErrorSnackbar(error.message);
      },
    },
  );

  const handleClickCloseButton = () => {
    resetAddModalData();
    resetAddModalState();
  };

  const handleClickConfirmButton = () => {
    const data = {
      summary: addModalData.summary,
      startDate: addModalData.startDate,
      endDate: addModalData.endDate,
      todo: addModalData.todo,
      assignedUserId: numStrToBigInt(addModalData.assignedUserId),
    };

    try {
      createTaskInputSchema.parse(data);
    } catch (e: unknown) {
      setErrorSnackbar((e as ZodError).errors[0].message);
      return;
    }
    createTask(data);
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
              isUpdating={isCreating}
            >
              <section className='tablet:w-[450px] mobile:w-[280px] max-h-[500px] mb-10 flex-col mt-5'>
                <div className='space-y-5 mobile:space-y-3 mx-4 mobile:mx-0 mobile:text-sm'>
                  <TaskSummaryControl modalType={modalType} />
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

export default TaskAddModal;
