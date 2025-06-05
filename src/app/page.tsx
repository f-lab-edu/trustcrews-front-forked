import Guide from '@/features/guide/components/Guide';
import MainBoard from '@/layouts/MainBoard';
import InitialPostsDataProvider from '@/providers/data/InitialPostsDataProvider';
import AuthStateProvider from '@/providers/AuthStateProvider';

const RootPage = () => {
  return (
    <>
      <aside>
        <Guide />
      </aside>
      <main className='mt-10 mobile:mt-2'>
        <InitialPostsDataProvider>
          <AuthStateProvider>
            {(authState) => <MainBoard serverAuthState={authState} />}
          </AuthStateProvider>
        </InitialPostsDataProvider>
      </main>
    </>
  );
};

export default RootPage;
