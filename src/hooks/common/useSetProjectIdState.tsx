'use client';

import {useResetRecoilState, useSetRecoilState} from "recoil";
import {projectIdState} from "@/store/project/ProjectInfoStateStore";
import {useEffect} from "react";

export default function useSetProjectIdState(projectId: string) {
    const setProjectIdState = useSetRecoilState(projectIdState);
    const resetProjectIdState = useResetRecoilState(projectIdState);

    useEffect(() => {
        setProjectIdState(projectId);
        return () => resetProjectIdState();
    }, [projectId, setProjectIdState, resetProjectIdState]);
}