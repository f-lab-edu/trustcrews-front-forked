import response from '@/lib/clientApi/response';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SIMPLE_USER_INFO_QUERY_KEY } from '@/features/auth/userMenu/api/getSimpleUserInfo';
import { z } from 'zod';
import { USER_DETAIL_INFO_QUERY_KEY } from '@/features/userProfile/api/getUserDetailInfo';
import { ResponseBody } from '@/shared/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';
import NEXT_PUBLIC_URL from '@/constants/api/nextPublicUrl';
import { POST_LIST_QUERY_KEY } from '@/features/posts/api/getPostList';

const nicknameRegex: RegExp = /^[a-zA-Z0-9]{6,10}$/;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const userInfoInputSchema = z.object({
  nickname: z
    .string()
    .min(1, { message: '닉네임을 입력해주세요.' })
    .regex(nicknameRegex, {
      message: '닉네임은 6~10자로, 영문과 숫자를 포함해야합니다.',
    }),
  isCheckedNickname: z.boolean().refine((val) => val, {
    message: '닉네임 중복확인을 해주세요.',
  }),
  positionId: z
    .bigint()
    .or(z.number())
    .nullable()
    .refine((val) => val, { message: '직무를 선택해주세요.' }),
  techStackIds: z
    .array(z.bigint().or(z.number()))
    .min(1, { message: '관심스택을 선택해주세요.' })
    .readonly(),
  intro: z.string().nullable().optional(),
});

export const userProfileImgInputSchema = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: '이미지 파일 용량은 5MB 이하만 가능합니다.',
  })
  .nullable();

export type UserInfoInput = z.infer<typeof userInfoInputSchema>;
export type UserProfileImgInput = z.infer<typeof userProfileImgInputSchema>;

export const updateUserDetail = async (
  info: UserInfoInput,
  profileImg?: UserProfileImgInput,
): Promise<ResponseBody<null>> => {
  const { nickname, positionId, techStackIds, intro } = info;

  const formData = new FormData();
  formData.set(
    'updateRequestDto',
    new Blob(
      [
        JSON.stringify({ nickname, positionId, techStackIds, intro }, (_, v) =>
          typeof v === 'bigint' ? Number(v) : v,
        ),
      ],
      {
        type: 'application/json',
      },
    ),
  );

  if (profileImg) {
    formData.set('file', profileImg);
  }

  const res = await fetch(`${NEXT_PUBLIC_URL}/api/user/profile`, {
    method: 'PUT',
    cache: 'no-cache',
    body: formData,
  });

  return await response(res);
};

export const useUpdateUserDetail = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (res: ApiResult<typeof updateUserDetail>) => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      info,
      image,
    }: {
      info: UserInfoInput;
      image?: UserProfileImgInput;
    }) => updateUserDetail(info, image),
    onSuccess: async (res) => {
      const invalidateUserDetail = queryClient.invalidateQueries({
        queryKey: [USER_DETAIL_INFO_QUERY_KEY],
      });
      const invalidateSimpleUser = queryClient.invalidateQueries({
        queryKey: [SIMPLE_USER_INFO_QUERY_KEY],
      });
      const invalidatePostList = queryClient.invalidateQueries({
        queryKey: [POST_LIST_QUERY_KEY],
      });

      await Promise.all([
        invalidateUserDetail,
        invalidateSimpleUser,
        invalidatePostList,
      ]);

      onSuccess?.(res);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};
