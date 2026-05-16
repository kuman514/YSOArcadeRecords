'use client';

import { useActionState, useEffect, useState } from 'react';

import { InfoEditorActionState } from '^/src/entities/info-editor/types';
import { ArcadeInfo } from '^/src/entities/types/arcade-info';
import { useLoadingBlockModal } from '^/src/shared/modal/loading-block';
import Button from '^/src/shared/ui/button';
import FormInput from '^/src/shared/ui/form-input';
import FormTextArea from '^/src/shared/ui/form-textarea';
import { useRouter } from 'next/navigation';

import { toast } from 'react-toastify';
import { createArcadeInfoAction } from './create-arcade-info-action';
import { deleteArcadeInfoAction } from './delete-arcade-info-action';
import { modifyArcadeInfoAction } from './modify-arcade-info-action';

interface Props {
  arcadeInfo?: ArcadeInfo;
}

export default function ArcadeInfoForm({ arcadeInfo }: Props) {
  const route = useRouter();

  const [createState, createFormAction, isCreateLoading] = useActionState<
    InfoEditorActionState,
    FormData
  >(createArcadeInfoAction, {});

  const [modifyState, modifyFormAction, isModifyLoading] = useActionState<
    InfoEditorActionState,
    FormData
  >(modifyArcadeInfoAction, {});

  const [deleteState, deleteFormAction, isDeleteLoading] = useActionState<
    InfoEditorActionState,
    FormData
  >(deleteArcadeInfoAction, {});

  const isLoading = isCreateLoading || isModifyLoading || isDeleteLoading;
  useLoadingBlockModal(isLoading);

  const [arcadeId, setArcadeId] = useState<ArcadeInfo['arcadeId']>(
    arcadeInfo?.arcadeId ?? ''
  );
  const [label, setLabel] = useState<ArcadeInfo['label']>(
    arcadeInfo?.label ?? ''
  );
  const [description, setDescription] = useState<ArcadeInfo['description']>(
    arcadeInfo?.description ?? ''
  );

  const [availableStagesText, setAvailableStagesText] = useState<string>(
    arcadeInfo?.availableStages?.join(',') ?? ''
  );
  const [availableRanksText, setAvailableRanksText] = useState<string>(
    arcadeInfo?.availableRanks?.join(',') ?? ''
  );
  const [availableTagsText, setAvailableTagsText] = useState<string>(
    arcadeInfo?.availableTags?.join(',') ?? ''
  );

  const isArcadeIdVerified = arcadeId.length > 0;
  const isLabelVerified = label.length > 0;
  const isDescriptionVerified = description && description.length > 0;
  const isAvailableStagesVerified = availableStagesText.length > 0;

  const isSubmittable =
    isArcadeIdVerified &&
    isLabelVerified &&
    isDescriptionVerified &&
    isAvailableStagesVerified &&
    !isLoading;

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (
      createState.isSuccess ||
      modifyState.isSuccess ||
      deleteState.isSuccess
    ) {
      route.push('/editor/arcade-info');
      return;
    }

    if (!createState.isSuccess && createState.errorMessage) {
      toast(createState.errorMessage, { type: 'error' });
    }

    if (!modifyState.isSuccess && modifyState.errorMessage) {
      toast(modifyState.errorMessage, { type: 'error' });
    }

    if (!deleteState.isSuccess && deleteState.errorMessage) {
      toast(deleteState.errorMessage, { type: 'error' });
    }
  }, [isLoading, createState, modifyState, deleteState, arcadeId]);

  return (
    <>
      {arcadeInfo && (
        <form
          className="w-full flex flex-row flex-wrap justify-end items-end gap-y-8"
          action={deleteFormAction}
          onSubmit={(event) => {
            if (!arcadeInfo) {
              return true;
            }

            const formData = new FormData(event.currentTarget);
            if (arcadeInfo.arcadeId !== formData.get('arcadeId')) {
              toast(
                '아케이드 부문 ID가 손상되었습니다. 새로고침하여 재시도해주세요.',
                { type: 'error' }
              );
              event.preventDefault();
              return false;
            }

            if (!confirm('삭제하시겠습니까?')) {
              event.preventDefault();
              return false;
            }

            return true;
          }}
        >
          <input type="hidden" id="arcadeId" name="arcadeId" value={arcadeId} />
          <button
            className="cursor-pointer"
            type="submit"
            disabled={isDeleteLoading}
          >
            {isDeleteLoading ? '삭제 중' : '삭제하기'}
          </button>
        </form>
      )}
      <form
        className="w-full flex flex-row flex-wrap justify-between items-start gap-y-8"
        action={arcadeInfo ? modifyFormAction : createFormAction}
        onSubmit={(event) => {
          if (!arcadeInfo) {
            return true;
          }

          const formData = new FormData(event.currentTarget);
          if (arcadeInfo.arcadeId !== formData.get('arcadeId')) {
            toast(
              '아케이드 부문 ID가 손상되었습니다. 새로고침하여 재시도해주세요.',
              { type: 'error' }
            );
            event.preventDefault();
            return false;
          }

          return true;
        }}
      >
        <p className="w-full flex flex-col gap-2">
          <label htmlFor="arcadeId">
            아케이드 부문 ID:{' '}
            {arcadeInfo ? `${arcadeInfo.arcadeId} (변경 불가)` : '신규'}
          </label>
          {arcadeInfo ? (
            <input
              type="hidden"
              id="arcadeId"
              name="arcadeId"
              value={arcadeId}
            />
          ) : (
            <FormInput
              type="text"
              id="arcadeId"
              name="arcadeId"
              value={arcadeId}
              onChange={(event) => {
                setArcadeId(event.currentTarget.value);
              }}
            />
          )}
          {!isArcadeIdVerified && <span>아케이드 부문 ID를 입력해주세요.</span>}
        </p>

        <p className="w-full flex flex-col gap-2">
          <label htmlFor="label">아케이드 부문명</label>
          <FormInput
            type="text"
            id="label"
            name="label"
            value={label}
            onChange={(event) => {
              setLabel(event.currentTarget.value);
            }}
          />
          {!isLabelVerified && <span>아케이드 부문명을 입력해주세요.</span>}
        </p>

        <p className="w-full flex flex-col gap-2">
          <label htmlFor="description">설명</label>
          <FormTextArea
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(event) => {
              setDescription(event.currentTarget.value);
            }}
          />
          {!isDescriptionVerified && <span>설명을 입력해주세요.</span>}
        </p>

        <p className="w-full flex flex-col gap-2">
          <label htmlFor="availableStagesText">
            진출 가능한 스테이지 (콤마로 구분)
          </label>
          <FormTextArea
            type="text"
            id="availableStagesText"
            name="availableStagesText"
            value={availableStagesText}
            onChange={(event) => {
              setAvailableStagesText(event.currentTarget.value);
            }}
          />
          {!isAvailableStagesVerified && (
            <span>진출 가능한 스테이지 목록을 입력해주세요.</span>
          )}
        </p>

        <p className="w-full flex flex-col gap-2">
          <label htmlFor="availableRanksText">
            입력 가능한 랭크 (콤마로 구분)
          </label>
          <FormTextArea
            type="text"
            id="availableRanksText"
            name="availableRanksText"
            value={availableRanksText}
            onChange={(event) => {
              setAvailableRanksText(event.currentTarget.value);
            }}
          />
        </p>

        <p className="w-full flex flex-col gap-2">
          <label htmlFor="availableTagsText">
            입력 가능한 태그 (콤마로 구분)
          </label>
          <FormTextArea
            type="text"
            id="availableTagsText"
            name="availableTagsText"
            value={availableTagsText}
            onChange={(event) => {
              setAvailableTagsText(event.currentTarget.value);
            }}
          />
        </p>

        <Button type="submit" disabled={!isSubmittable}>
          {arcadeInfo ? '수정하기' : '등록하기'}
        </Button>
      </form>
    </>
  );
}
