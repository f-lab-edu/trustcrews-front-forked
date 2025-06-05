import { request } from '@/lib/clientApi/request';
import { ProjectAuthCode } from '@/types/data/projectDetail/projectAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CREW_NOTICE_LIST_QUERY_KEY } from '@/features/projectDetail/notice/api/crewNotice/getCrewNoticeList';
import { CREW_LIST_QUERY_KEY } from '@/features/projectDetail/crews/api/getProjectCrewList';
import { ResponseBody } from '@/shared/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';

export type LeaveProjectInput = {
  projectId: bigint;
  crewId: bigint;
  crewPMAuth: ProjectAuthCode;
};

export const leaveProject = async (
  reqData: LeaveProjectInput,
): Promise<ResponseBody<null>> => {
  return await request('POST', `/api/project/auth/leave`, reqData);
};

type LeaveProjectRes = ApiResult<typeof leaveProject>;

// todo - 백엔드 성공 메세지
export const useLeaveProject = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (res: LeaveProjectRes) => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LeaveProjectInput) => leaveProject(data),
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({
        queryKey: [CREW_NOTICE_LIST_QUERY_KEY],
      });
      await queryClient.invalidateQueries({
        queryKey: [CREW_LIST_QUERY_KEY],
        refetchType: 'all',
      });
      onSuccess?.(res);
    },
    onError: (error) => {
      console.error(error.cause);
      onError?.(error);
    },
  });
};
