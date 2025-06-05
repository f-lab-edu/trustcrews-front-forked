import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { ResponseBody } from '@/shared/types/responseBody';
import { Position } from '@/types/data/position';
import { TrustGrade } from '@/types/data/trustGrade';
import { TechStack } from '@/types/data/techStack';
import { ProjectAuthMap } from '@/types/data/projectDetail/projectAuth';
import { CrewStatusKey } from '@/types/data/projectDetail/crew/crewStatusKey';

interface ProjectCrewUserDetail {
  userId: bigint;
  email: string;
  nickname: string;
  profileImgSrc: string;
  position: Position;
  trustGrade: TrustGrade;
  trustScore: number;
  role: string;
  createDate: string;
  updateDate: string;
  technologyStacks: TechStack[];
}

export type ProjectCrewProfileInfo = {
  crewId: bigint;
  projectId: bigint;
  projectCount: number;
  user: ProjectCrewUserDetail;
  crewPMAuth: ProjectAuthMap;
  position: Position;
  status: CrewStatusKey;
};

export const getCrewDetail = async (
  crewId: bigint,
): Promise<ResponseBody<ProjectCrewProfileInfo>> => {
  return await request('GET', `/api/projectCrew/auth/${crewId}`);
};

export const CREW_DETAIL_QUERY_KEY = 'crewDetail';

export const useCrewDetail = (crewId: bigint) => {
  return useSuspenseQuery({
    queryKey: [CREW_DETAIL_QUERY_KEY, bigIntToString(crewId)],
    queryFn: () => getCrewDetail(crewId),
  });
};
