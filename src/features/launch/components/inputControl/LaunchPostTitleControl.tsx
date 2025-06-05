import { useRecoilState } from 'recoil';
import RowWide from '@/shared/ui/RowWide';
import { ChangeEvent } from 'react';
import { postFormFieldSelector } from '@/store/launch/PostFormStateStore';

const LaunchPostTitleControl = () => {
  const [title, setTitle] = useRecoilState(postFormFieldSelector('title'));

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <RowWide className='h-[80px] mt-3 pc:mb-[50px] tablet:mb-[25px] mobile:mb-[15px]'>
      <div className='border-b-2 border-grey600 pt-1 pb-2'>
        <label htmlFor='postRegister-title' className='flex relative'>
          <input
            id='postRegister-title'
            type='text'
            value={title}
            onChange={handleChangeInput}
            className='peer appearance-none bg-transparent border-none w-full font-semibold text-3xl mobile:text-lg border text-grey600 mr-3 py-1 px-1 leading-tight focus:border-transparent focus:outline-none focus:ring-transparent'
          />
          {title === '' && (
            <span className='absolute top-[15%] left-0 peer-focus:hidden text-3xl mobile:text-lg text-grey600 font-semibold'>
              게시글 제목
            </span>
          )}
        </label>
      </div>
    </RowWide>
  );
};

export default LaunchPostTitleControl;
