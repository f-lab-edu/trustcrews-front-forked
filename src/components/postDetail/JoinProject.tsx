import React from 'react';
import {getCookie} from "cookies-next";
import {PostInfo} from "@/utils/type";
import useJoinProject from "@/hooks/post/useJoinProject";
import Button from "@/components/ui/Button";
import useSnackbar from "@/hooks/common/useSnackbar";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {confirmModalState} from "@/store/CommonStateStore";
import {selectRecruitPositionState} from "@/store/postDetail/PostDetailStateStore";
import RecruitPositionDropdown from "@/components/postDetail/RecruitPositionDropdown";
import {isEqual} from "lodash";
import {numStrToBigInt} from "@/utils/common";

function JoinProject({projectId, boardInfo}: { projectId: bigint, boardInfo: PostInfo }) {
    const recruitPosition = useRecoilValue(selectRecruitPositionState);
    const currentUserId = getCookie("user_id");

    const {joinProject, isUpdating} = useJoinProject();

    const setModalState = useSetRecoilState(confirmModalState);
    const {setInfoSnackbar} = useSnackbar();
    const onConfirmHandler = () => {
        if (!currentUserId) {
            setInfoSnackbar("로그인 후 이용 가능합니다.");
            return;
        }

        if (recruitPosition === '0') {
            setInfoSnackbar("포지션을 선택해 주세요.");
            return;
        }

        const title = "확인";
        const content = <span>선택하신 포지션으로 참여요청 하시겠습니까?</span>;

        setModalState({
            isOpen: true,
            title,
            content,
            onClickConfirmHandler: () => joinProject({projectId, positionId: numStrToBigInt(recruitPosition)})
        });
    }

    const isRecruiter = isEqual(currentUserId?.toString(), boardInfo.user.userId.toString());
    if (isRecruiter) return null;


    return (
        <section className="flex justify-center gap-5 mt-5">
            <RecruitPositionDropdown recruitPositions={boardInfo.boardPositions}/>
            <Button type="button" size="lg" onClickHandler={onConfirmHandler} disabled={isUpdating}>
                참여하기
            </Button>
        </section>
    );
}

export default JoinProject;