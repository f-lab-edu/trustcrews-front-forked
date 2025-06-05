import { useRecoilState } from 'recoil';
import Input from '@/shared/ui/Input';
import { postConfigFormFieldSelector } from '@/store/projectDetail/config/post/PostConfigFormStateStore';

const PostConfigContactControl = () => {
  const [contact, setContact] = useRecoilState(
    postConfigFormFieldSelector('contact'),
  );

  return (
    <Input
      id='contact'
      label='연락 방법'
      placeholder='오픈 카톡 링크 / 이메일 / 구글 폼 주소'
      value={contact}
      onChange={(e) => setContact(e.target.value)}
    />
  );
};

export default PostConfigContactControl;
