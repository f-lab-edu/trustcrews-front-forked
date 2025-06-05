import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ResponseBody } from '@/shared/types/responseBody';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { ProjectCrew } from '@/types/data/projectDetail/crew/projectCrew';

export const getProjectCrewList = async (
  projectId: bigint,
): Promise<ResponseBody<Record<'projectCrews', ProjectCrew[]>>> => {
  return await request('GET', `/api/projectCrew/auth?projectId=${projectId}`);
};

export const CREW_LIST_QUERY_KEY = 'crewList';

export const useProjectCrewList = (projectId: bigint) => {
  return useSuspenseQuery({
    queryKey: [CREW_LIST_QUERY_KEY, bigIntToString(projectId)],
    queryFn: () => getProjectCrewList(projectId),
  });
};
