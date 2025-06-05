'use client';

import { Suspense } from 'react';
import SelectSkeleton from '@/shared/ui/skeleton/SelectSkeleton';
import SignUpEmailControl from '@/features/auth/signUp/components/inputControl/SignUpEmailControl';
import SignUpPasswordControl from '@/features/auth/signUp/components/inputControl/SignUpPasswordControl';
import SignUpNicknameControl from '@/features/auth/signUp/components/inputControl/SignUpNicknameControl';
import SignUpPositionControl from '@/features/auth/signUp/components/inputControl/SignUpPositionControl';
import SignUpTechStackControl from '@/features/auth/signUp/components/inputControl/SignUpTechStackControl';
import SignUpIntroControl from '@/features/auth/signUp/components/inputControl/SignUpIntroControl';
import SignUpButton from '@/features/auth/signUp/components/SignUpButton';

const SignUpForm = () => {
  return (
    <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3'>
      <SignUpEmailControl />
      <SignUpPasswordControl />
      <SignUpNicknameControl />
      <Suspense
        fallback={
          <SelectSkeleton label='직무' placeholder='직무를 선택해주세요' />
        }
      >
        <SignUpPositionControl />
      </Suspense>
      <Suspense
        fallback={
          <SelectSkeleton
            label='사용 스택'
            placeholder='사용 스택을 선택해주세요.'
          />
        }
      >
        <SignUpTechStackControl />
      </Suspense>
      <SignUpIntroControl />
      <SignUpButton />
    </div>
  );
};

export default SignUpForm;
