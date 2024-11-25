'use client';

import React, {useEffect, useState} from 'react';
import {useRecoilValue, useResetRecoilState} from "recoil";
import {crewFWModalStateStore} from "@/store/project/alert/modal/CrewFWModalStateStore";
import {createPortal} from "react-dom";
import Modal from "@/components/ui/Modal";
import FWCreateModalContents from "@/components/project/crews/detail/modal/FWCreateModalContents";
import {createFWAlert} from "@/service/project/alert/vote/fwithdraw";
import useSnackbar from "@/hooks/common/useSnackbar";

function FwCreateModal() {
    const {setSuccessSnackbar, setErrorSnackbar} = useSnackbar();
    const {isOpen, title, createData} = useRecoilValue(crewFWModalStateStore);
    const resetModalState = useResetRecoilState(crewFWModalStateStore);

    const [portalElement, setPortalElement] = useState<Element | null>(null);

    useEffect(() => {
        setPortalElement(document.getElementById('modal'));

        if (!isOpen) {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.overflowY = 'auto';

            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }, [isOpen]);

    const onClickConfirmHandler = async () => {
        const res = await createFWAlert(createData);
        if (res.result === "success") {
            setSuccessSnackbar('강제탈퇴 투표를 생성했습니다.');
        } else {
            setErrorSnackbar(res.message);
        }
    }

    return (
        <>
            {
                isOpen && portalElement
                    ? createPortal((
                        <Modal
                            isOpen={isOpen}
                            close={() => resetModalState()}
                            title={title}
                            onClickConfirmHandler={onClickConfirmHandler}
                        >
                            <FWCreateModalContents/>
                        </Modal>
                    ), portalElement)
                    : null
            }
        </>
    );
}

export default FwCreateModal;