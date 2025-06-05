import { useRecoilState } from 'recoil';
import TextArea from '@/shared/ui/TextArea';
import { postConfigFormFieldSelector } from '@/store/projectDetail/config/post/PostConfigFormStateStore';

const PostConfigContentControl = () => {
  const [content, setContent] = useRecoilState(
    postConfigFormFieldSelector('content'),
  );

  return (
    <TextArea
      id='content'
      label='프로젝트 소개'
      placeholder='프로젝트에 대해 소개해주세요.'
      rows={10}
      cols={25}
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
  );
};

export default PostConfigContentControl;
