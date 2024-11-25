'use client';

import {useQuery} from "@tanstack/react-query";
import {ResponseBody, TrustGradeItem} from "@/utils/type";
import {getTrustGradeListByUser} from "@/service/user/user";
import {useSetRecoilState} from "recoil";
import {snackbarState} from "@/store/CommonStateStore";

export default function useGradeListByUser() {
    const setSnackbar = useSetRecoilState(snackbarState);

    const {
        data,
        isFetching,
        isError
    } = useQuery<Promise<ResponseBody<TrustGradeItem[]>>, Error, ResponseBody<TrustGradeItem[]>>({
        queryKey: ['trustGradeListByUser'],
        queryFn: () => getTrustGradeListByUser(),
        staleTime: 0,
        // retry: false
    });

    if (isError) setSnackbar({show: true, type: 'ERROR', content: '프로젝트 신뢰등급을 불러올 수 없습니다'});

    return {gradeList: data?.data || [], isFetching, isError};
}