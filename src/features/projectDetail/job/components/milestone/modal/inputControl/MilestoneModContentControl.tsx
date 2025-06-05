import Input from '@/shared/ui/Input';
import { useRecoilState } from 'recoil';
import { milestoneModFormFieldSelector } from '@/store/projectDetail/job/milestone/MilestoneModalStateStore';
import { ChangeEvent } from 'react';

const MilestoneModContentControl = () => {
  const [content, setContent] = useRecoilState(
    milestoneModFormFieldSelector('content'),
  );

  const handleChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className='flex'>
      <label
        htmlFor='milestoneModcontent'
        className='text-gray-700 font-semibold self-center'
      >
        내용
      </label>
      <div className='w-[350px] mobile:w-[220px] ml-auto'>
        <Input
          id='milestoneModcontent'
          placeholder='내용을 입력해주세요.'
          value={content}
          onChange={handleChangeContent}
        />
      </div>
    </div>
  );
};

export default MilestoneModContentControl;
