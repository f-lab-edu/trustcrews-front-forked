import React from 'react';
import Button from "@/components/ui/Button";
import {PostInfo} from "@/utils/type";
import {getCookie} from "cookies-next";
import {isEqual} from "lodash";
import {useSetRecoilState} from "recoil";
import {confirmModalState} from "@/store/CommonStateStore";
import useChangeRecruitStatus from "@/hooks/project/setting/useChangeRecruitStatus";

function RecruitStatusButton({boardInfo}: { boardInfo: PostInfo }) {
    const setModalState = useSetRecoilState(confirmModalState);
    const currentUserId = getCookie("user_id");
    const {boardId: postId, recruitmentStatus: isFinished, user} = boardInfo;

    const {changeRecruitStatus, isUpdating} = useChangeRecruitStatus(postId);

    const isRecruiter = isEqual(currentUserId?.toString(), user.userId.toString());
    if (!isRecruiter) return null;

    const openStatusModal = () => {
        const title = "게시글 상태 변경";
        const status = isFinished ? "모집중" : "모집완료";
        const content = <span>해당 게시글을 <span className='font-bold'>{status}</span> 상태로 변경하시겠습니까?</span>;

        setModalState({isOpen: true, title, content, onClickConfirmHandler: changeRecruitStatus});
    }

    return (
        <div className="flex justify-center mt-5 space-x-2">
            <Button type="button" size="lg"
                    theme={isFinished ? "primary-hollow" : "disabled"}
                    disabled={!isFinished}
                    onClickHandler={openStatusModal}
            >
                모집중
            </Button>
            <Button type="button" size="lg"
                    theme={isFinished ? "disabled" : "primary-hollow"}
                    disabled={isFinished || isUpdating}
                    onClickHandler={openStatusModal}
            >
                모집완료
            </Button>
        </div>
    );
}

export default RecruitStatusButton;