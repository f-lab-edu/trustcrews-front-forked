import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ITEM_COUNT_PER_PAGE, PAGE_RANGE } from '@/constants/pagination';
import { PageResponseBody } from '@/shared/types/responseBody';
import { TaskPointType } from '@/types/data/taskPointType';
import { CrewStatusKey } from '@/types/data/projectDetail/crew/crewStatusKey';

export interface CrewTaskHistory {
  taskId: bigint;
  trustScoreHistoryId: bigint;
  summary: string;
  createDate: string;
  progressStatus: CrewStatusKey;
  point: number;
  pointType: TaskPointType;
}

export const getCrewTaskHistory = async (
  crewId: bigint,
  pageIndex: number,
  itemCount: number,
): Promise<PageResponseBody<CrewTaskHistory[]>> => {
  return await request(
    'GET',
    `/api/projectCrew/auth/taskHistory?crewId=${crewId}&pageIndex=${pageIndex}&itemCount=${itemCount}`,
  );
};

export const CREW_TASK_HISTORY_KEY = 'crewTaskHistory';

export const useCrewTaskHistory = (crewId: bigint, pageIndex: number) => {
  return useSuspenseQuery({
    queryKey: [
      CREW_TASK_HISTORY_KEY,
      crewId,
      pageIndex,
      ITEM_COUNT_PER_PAGE.LIST_SM,
    ],
    queryFn: () => getCrewTaskHistory(crewId, pageIndex, PAGE_RANGE.DEFAULT),
  });
};
