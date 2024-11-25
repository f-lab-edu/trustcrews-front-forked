'use client';
import {useQuery} from "@tanstack/react-query";
import {getTechStackList as getTechStackListAPI} from "@/service/setting";
import {ResponseBody, TechStackItem} from "@/utils/type";
import {useSetRecoilState} from "recoil";
import {snackbarState} from "@/store/CommonStateStore";

export function useTechStackList() {
    const setSnackBar = useSetRecoilState(snackbarState);
    const {
        data,
        isFetching,
        isError
    } = useQuery<Promise<ResponseBody<TechStackItem[]>>, Error, ResponseBody<TechStackItem[]>>({
        queryKey: ['techStacks'],
        queryFn: getTechStackListAPI,
        staleTime: Infinity
    });

    if (isError) setSnackBar({show: true, type: 'ERROR', content: '포지션 목록을 가져올 수 없습니다'});

    return {data: data?.data || [], isFetching, isError};
}