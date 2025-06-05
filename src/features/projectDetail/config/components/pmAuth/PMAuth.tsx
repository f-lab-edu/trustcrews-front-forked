import { useRecoilValue } from 'recoil';
import { projectIdState } from '@/store/projectDetail/ProjectIdStateStore';
import PMAuthEditor from '@/features/projectDetail/config/components/pmAuth/PMAuthEditor';
import { useProjectCrewList } from '@/features/projectDetail/crews/api/getProjectCrewList';
import { numStrToBigInt } from '@/shared/utils/stringUtils';

const PMAuth = () => {
  const projectId = useRecoilValue(projectIdState);

  const {
    data: {
      data: { projectCrews: crewList },
    },
  } = useProjectCrewList(numStrToBigInt(projectId));

  return (
    <div className='mx-auto mt-8 flow-root'>
      <div className='-ml-4 -my-2 sm:-ml-6 lg:-ml-12'>
        <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
          <table className='min-w-full divide-y divide-gray-300'>
            <tbody className='divide-y divide-gray-200 bg-white'>
              {crewList.map((crew) => (
                <PMAuthEditor key={crew.crewId} crew={crew} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PMAuth;
