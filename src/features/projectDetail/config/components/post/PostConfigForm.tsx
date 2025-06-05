import PostConfigPositionsControl from '@/features/projectDetail/config/components/post/inputControl/PostConfigPositionsControl';
import PostConfigContactControl from '@/features/projectDetail/config/components/post/inputControl/PostConfigContactControl';
import PostConfigContentControl from '@/features/projectDetail/config/components/post/inputControl/PostConfigContentControl';
import ProjectPostInfoSaveButton from '@/features/projectDetail/config/components/post/PostConfigSaveButton';
import PostConfigRecruitStatusControl from '@/features/projectDetail/config/components/post/inputControl/PostConfigRecruitStatusControl';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { projectIdState } from '@/store/projectDetail/ProjectIdStateStore';
import PostConfigResetButton from '@/features/projectDetail/config/components/post/PostConfigResetButton';
import ConfigContainer from '@/features/projectDetail/config/layouts/ConfigContainer';
import ConfigSummary from '@/features/projectDetail/config/layouts/ConfigSummary';
import ConfigContents from '@/features/projectDetail/config/layouts/ConfigContents';
import { bigIntToString, numStrToBigInt } from '@/shared/utils/stringUtils';
import PostConfigTitleControl from '@/features/projectDetail/config/components/post/inputControl/PostConfigTitleControl';
import { usePostConfig } from '@/features/projectDetail/config/api/post/getPostConfig';
import { useEffect } from 'react';
import {
  postConfigFormLoadingSelector,
  postConfigFormStateStore,
} from '@/store/projectDetail/config/post/PostConfigFormStateStore';
import PostConfigFormSkeleton from '@/features/projectDetail/config/components/post/PostConfigFormSkeleton';

const PostConfigForm = () => {
  const isFormLoading = useRecoilValue(postConfigFormLoadingSelector);
  const setPostConfigForm = useSetRecoilState(postConfigFormStateStore);
  const projectId = useRecoilValue(projectIdState);

  const {
    data: { data },
  } = usePostConfig(numStrToBigInt(projectId));

  const { title, postPositions, contact, recruitmentStatus, content } = data;
  const positionIds = postPositions.map((v) =>
    bigIntToString(v.position.positionId),
  );

  useEffect(() => {
    if (isFormLoading) {
      setPostConfigForm({
        isFormLoading: false,
        data: {
          title,
          positionIds,
          contact,
          recruitmentStatus,
          content,
        },
      });
    }
  }, [
    isFormLoading,
    title,
    positionIds,
    contact,
    recruitmentStatus,
    content,
    setPostConfigForm,
  ]);

  if (isFormLoading) return <PostConfigFormSkeleton />;

  return (
    <ConfigContainer>
      <ConfigSummary>모집 게시글 정보</ConfigSummary>
      <ConfigContents>
        <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto'>
          <PostConfigRecruitStatusControl />
        </div>
        <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto'>
          <PostConfigTitleControl />
        </div>
        <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto'>
          <PostConfigPositionsControl />
        </div>
        <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto'>
          <PostConfigContactControl />
        </div>
        <div className='w-full mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto pc:col-span-2'>
          <PostConfigContentControl />
        </div>
      </ConfigContents>
      <div className='pc:w-full my-4 flex items-center justify-center space-x-2'>
        <PostConfigResetButton />
        <ProjectPostInfoSaveButton />
      </div>
    </ConfigContainer>
  );
};

export default PostConfigForm;
