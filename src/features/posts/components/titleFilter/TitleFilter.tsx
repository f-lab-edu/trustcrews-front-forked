'use client';

import { KeyboardEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { postSearchValue } from '@/store/posts/PostSearchStateStore';

const TitleFilter = () => {
  const resetTitleSearchValue = useResetRecoilState(postSearchValue);
  const [searchValue, setSearchValue] = useRecoilState(postSearchValue);
  const [value, setValue] = useState(searchValue);

  useEffect(() => {
    resetTitleSearchValue();
  }, [resetTitleSearchValue]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearchValue(value);
    }
  };

  return (
    <div className='flex rounded-3xl border-1 border border-grey-300 px-4 bg-grey200 h-[40px] mobile:h-[30px]'>
      <Image
        aria-hidden={true}
        src='/images/search.svg'
        alt='검색아이콘'
        width={15}
        height={14}
      />
      <input
        role='searchbox'
        placeholder='게시글 제목'
        title='게시글 제목'
        type='text'
        className='flex-1 border-transparent focus:border-transparent focus:ring-0 bg-grey200 mobile:text-sm'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyUp={handleKeyDown}
      />
    </div>
  );
};

export default TitleFilter;
