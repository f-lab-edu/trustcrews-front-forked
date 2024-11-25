'use client';
import {useQuery} from "@tanstack/react-query";
import {getUserIfo} from "@/service/user/user";
import {ProfileInfo, ResponseBody} from "@/utils/type";

export function useProfileInfo() {
  const { data, isFetching } = useQuery<ResponseBody<ProfileInfo>, Error>({
    queryKey: ['profileInfo'],
    queryFn: getUserIfo
  });

  return {data, isFetching};
}