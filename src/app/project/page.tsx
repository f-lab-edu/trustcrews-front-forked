'use client';

import React, {useEffect} from 'react';
import ProjectInfo from "@/components/project/layout/projectInfo/ProjectInfo";
import ProjectNavTab from "@/components/project/layout/ProjectNavTab";
import useSetProjectIdState from "@/hooks/common/useSetProjectIdState";
import {useQueryClient} from "@tanstack/react-query";

function ProjectPage({searchParams: {projectId, userId}}: { searchParams: { projectId: string, userId: string } }) {
    useSetProjectIdState(projectId);
    const queryClient = useQueryClient();

    useEffect(() => {
        queryClient.invalidateQueries({queryKey: ['currentUserProjectAuth', projectId]});
    }, [queryClient, projectId]);

    return (
        <>
            <ProjectInfo projectId={projectId}/>
            <ProjectNavTab projectId={projectId} userId={userId}/>
        </>
    );
}

export default ProjectPage;