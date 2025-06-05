import LoginForm from '@/features/auth/login/components/LogInForm';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-100px)]'>
      <h1 className='text-3xl mobile:text-2xl font-semibold w-full text-center mb-10'>
        로그인
      </h1>
      <LoginForm />
      <div className='text-center text-sm mobile:text-xs mt-3'>
        회원이 아니신가요?
        <Link href='/signup'>
          <span className='ml-1 underline text-blue-600'>회원가입</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
