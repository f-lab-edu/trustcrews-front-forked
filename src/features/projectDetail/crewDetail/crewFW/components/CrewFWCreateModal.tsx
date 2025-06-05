'use client';

import { ChangeEvent } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import {
  crewFWModalDataStateStore,
  crewFWModalStateStore,
} from '@/store/projectDetail/crew/crewDetail/crewFW/CrewFWModalStateStore';
import { createPortal } from 'react-dom';
import Modal from '@/shared/ui/Modal';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { ZodError } from 'zod';
import useModalPortalElement from '@/shared/hooks/useModalPortalElement';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import {
  createCrewFWVoteInputSchema,
  useCreateFWVote,
} from '@/features/projectDetail/vote/api/createFWVote';
import { FW_VOTE_REASONS } from '@/constants/data/projectDetail/vote/fwVoteReasons';

const {
  FWR1001: REASON_CORP,
  FWR1002: REASON_ATT,
  FWR1003: REASON_TECH,
  FWR1004: REASON_ETC,
} = FW_VOTE_REASONS;

const CrewFWCreateModal = () => {
  const { isOpen, title, projectId, crewId, crewPMAuth, userPMAuth } =
    useRecoilValue(crewFWModalStateStore);

  const [portalElement] = useModalPortalElement(isOpen);

  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  const resetModalState = useResetRecoilState(crewFWModalStateStore);
  const [reason, setReason] = useRecoilState(crewFWModalDataStateStore);

  const { mutate: createCrewFWVote } = useCreateFWVote(
    {
      projectId: numStrToBigInt(projectId),
      crewId: numStrToBigInt(crewId),
      crewPMAuth,
      userPMAuth,
    },
    {
      onSuccess: (res) => setSuccessSnackbar(res.message),
      onError: (error) => setErrorSnackbar(error.message),
    },
  );

  const handleClickConfirmButton = () => {
    try {
      createCrewFWVoteInputSchema.parse(reason);
    } catch (e: unknown) {
      setErrorSnackbar((e as ZodError).errors[0].message);
      return;
    }
    createCrewFWVote(reason);
  };

  const handleChangeFWReason = (e: ChangeEvent<HTMLInputElement>) => {
    setReason({
      reason: e.target.value,
    });
  };

  return (
    <>
      {isOpen && portalElement
        ? createPortal(
            <Modal
              isOpen={isOpen}
              close={() => resetModalState()}
              title={title}
              onClickConfirmHandler={handleClickConfirmButton}
            >
              <section className='alertModal_contents'>
                <section>
                  <div className='mt-6 mb-8 text-xl text-greyDarkblue font-semibold'>
                    강제탈퇴 사유를 다음 중에서 선택해 주세요.
                  </div>
                  <ul className='w-[65%] mx-auto mb-4 flex flex-col items-start space-y-5'>
                    <li>
                      <input
                        type='radio'
                        name='fwReason'
                        value={REASON_CORP.code}
                        id='fwr1001'
                        className='border-gray-400 text-indigo-600 focus:ring-none'
                        onChange={handleChangeFWReason}
                      />
                      <label htmlFor={REASON_CORP.code} className='ml-2'>
                        {REASON_CORP.desc}
                      </label>
                    </li>
                    <li>
                      <input
                        type='radio'
                        name='fwReason'
                        value={REASON_ATT.code}
                        id={REASON_ATT.code}
                        className='border-gray-400 text-indigo-600 focus:ring-none'
                        onChange={handleChangeFWReason}
                      />
                      <label htmlFor={REASON_ATT.code} className='ml-2'>
                        {REASON_ATT.desc}
                      </label>
                    </li>
                    <li>
                      <input
                        type='radio'
                        name='fwReason'
                        value={REASON_TECH.code}
                        id={REASON_TECH.code}
                        className='border-gray-400 text-indigo-600 focus:ring-none'
                        onChange={handleChangeFWReason}
                      />
                      <label htmlFor={REASON_TECH.code} className='ml-2'>
                        {REASON_TECH.desc}
                      </label>
                    </li>
                    <li>
                      <input
                        type='radio'
                        name='fwReason'
                        value={REASON_ETC.code}
                        id={REASON_ETC.code}
                        className='border-gray-400 text-indigo-600 focus:ring-none'
                        onChange={handleChangeFWReason}
                      />
                      <label htmlFor={REASON_ETC.code} className='ml-2'>
                        {REASON_ETC.desc}
                      </label>
                    </li>
                  </ul>
                </section>
              </section>
            </Modal>,
            portalElement as Element,
          )
        : null}
    </>
  );
};

export default CrewFWCreateModal;
