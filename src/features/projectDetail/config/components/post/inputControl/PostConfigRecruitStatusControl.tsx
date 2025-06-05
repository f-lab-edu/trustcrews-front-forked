import { Switch } from '@headlessui/react';
import { useRecoilState } from 'recoil';
import { postConfigFormFieldSelector } from '@/store/projectDetail/config/post/PostConfigFormStateStore';

const PostConfigRecruitStatusControl = () => {
  const [recruitmentStatus, setRecruitmentStatus] = useRecoilState(
    postConfigFormFieldSelector('recruitmentStatus'),
  );

  const statusName = recruitmentStatus ? '모집완료' : '모집중';

  return (
    <div className='relative mobile:text-sm'>
      <label htmlFor='recruitmentStatusSwitch' className='text-gray-700'>
        모집 상태
      </label>
      <Switch
        id='recruitmentStatusSwitch'
        checked={recruitmentStatus}
        onChange={setRecruitmentStatus}
        className='group relative flex h-7 w-12 mt-2 mobile:h-6 mobile:w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-none  data-[headlessui-state=checked]:bg-gray-200'
      >
        <span className='sr-only'>{statusName}</span>
        <span className='pointer-events-none relative inline-block h-6 w-6 mobile:h-5 mobile:w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[headlessui-state=checked]:translate-x-5'>
          <span
            aria-hidden='true'
            className='absolute left-[50px] flex h-full w-[60px] items-center justify-center transition-opacity duration-50 ease-in leading-none text-secondary group-data-[headlessui-state=checked]:opacity-0 group-data-[headlessui-state=checked]:duration-50 group-data-[headlessui-state=checked]:ease-out'
          >
            모집중
          </span>
          <span
            aria-hidden='true'
            className='absolute left-[25px] flex h-full w-[85px] items-center justify-center opacity-0 transition-opacity duration-50 ease-out leading-none text-greyDarkblue group-data-[headlessui-state=checked]:opacity-100 group-data-[headlessui-state=checked]:duration-50 group-data-[headlessui-state=checked]:ease-in'
          >
            모집완료
          </span>
        </span>
      </Switch>
    </div>
  );
};

export default PostConfigRecruitStatusControl;
