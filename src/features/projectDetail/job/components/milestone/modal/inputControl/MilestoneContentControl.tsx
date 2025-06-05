import Input from '@/shared/ui/Input';
import { useRecoilState } from 'recoil';
import { milestoneAddFormFieldSelector } from '@/store/projectDetail/job/milestone/MilestoneModalStateStore';
import { ChangeEvent } from 'react';

const INPUT_ID = 'milestoneAddContent';

const MilestoneContentControl = () => {
  const [content, setContent] = useRecoilState(
    milestoneAddFormFieldSelector('content'),
  );

  const handleChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className='flex'>
      <label
        htmlFor={INPUT_ID}
        className='text-gray-700 font-semibold self-center'
      >
        내용
      </label>
      <div className='w-[350px] mobile:w-[220px] ml-auto'>
        <Input
          id={INPUT_ID}
          placeholder='내용을 입력해주세요.'
          value={content}
          onChange={handleChangeContent}
        />
      </div>
    </div>
  );
};

export default MilestoneContentControl;
