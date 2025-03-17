'use client';

import Image from 'next/image';
import { useActionState, useMemo, useState } from 'react';

import { ArcadeInfo } from '^/src/entities/types/arcade-info';
import { Method } from '^/src/entities/types/method';
import { ArcadeRecordPost } from '^/src/entities/types/post';
import { putArcadeRecordAction } from '^/src/features/arcade-record-article/put-arcade-record-action';
import MultipleImagePicker from '^/src/shared/image-picker/multiple';
import SingleImagePicker from '^/src/shared/image-picker/single';
import FormDropdown from '^/src/shared/ui/form-dropdown';
import FormInput from '^/src/shared/ui/form-input';

import { postArcadeRecordAction } from './post-arcade-record-action';
import { ArcadeRecordActionState } from './types';

interface Props {
  post?: ArcadeRecordPost;
  arcadeInfoList: ArcadeInfo[];
  methodList: Method[];
}

export default function RecordForm({
  post,
  arcadeInfoList,
  methodList,
}: Props) {
  const [formState, formAction] = useActionState<
    ArcadeRecordActionState,
    FormData
  >(post ? putArcadeRecordAction : postArcadeRecordAction, {});

  const [title, setTitle] = useState<string>(post?.title ?? '');
  const [arcadeId, setArcadeId] = useState<string>(post?.arcade.arcadeId ?? '');
  const [methodId, setMethodId] = useState<string>(post?.method.methodId ?? '');
  const [achievedAt, setAchievedAt] = useState<Date>(
    post?.achievedAt ?? new Date()
  );
  const [players, setPlayers] = useState<number>(post?.playerInfo.players ?? 1);
  const [playerSide, setPlayerSide] = useState<number>(
    post?.playerInfo.playerSide ?? 1
  );
  const [evaluation, setEvaluation] = useState<string>(post?.evaluation ?? '');
  const [stage, setStage] = useState<string>(post?.stage ?? '');
  const [rank, setRank] = useState<string>(post?.rank ?? '');
  const [comment, setComment] = useState<string>(post?.comment ?? '');
  const [tags, setTags] = useState<string>(post?.tags.join(',') ?? '');
  const [note, setNote] = useState<string>(post?.note ?? '');
  const [youTubeId, setYouTubeId] = useState<string>(post?.youTubeId ?? '');

  const [presentImageUrls, setPresentImageUrls] = useState<string[]>(
    post?.imageUrls ?? []
  );

  function handleOnClickDeletePresentImageUrl(index: number) {
    return () => {
      const newPresentImageUrls = Array.from(presentImageUrls);
      newPresentImageUrls.splice(index, 1);
      setPresentImageUrls(newPresentImageUrls);
    };
  }

  const renderArcadeSelectOptions = useMemo(
    () =>
      [{ arcadeId: '', label: '선택하세요' }]
        .concat(arcadeInfoList)
        .map(({ arcadeId: id, label }) => (
          <option key={`arcade-selection-${id}`} value={id}>
            {label}
          </option>
        )),
    [arcadeInfoList]
  );

  const renderMethodSelectOptions = useMemo(
    () =>
      [{ methodId: '', label: '선택하세요' }]
        .concat(methodList)
        .map(({ methodId: id, label }) => (
          <option key={`method-selection-${id}`} value={id}>
            {label}
          </option>
        )),
    [methodList]
  );

  return (
    <form
      className="w-full flex flex-col justify-center items-start gap-8"
      action={formAction}
    >
      {post?.arcadeRecordId && (
        <input
          type="hidden"
          id="arcadeRecordId"
          name="arcadeRecordId"
          value={post.arcadeRecordId}
          readOnly
        />
      )}
      {formState.errors?.arcadeId && <p>{formState.errors.arcadeId}</p>}

      <p className="w-full flex flex-col gap-2">
        <label htmlFor="title">기록 제목</label>
        <FormInput
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(event) => {
            setTitle(event.currentTarget.value);
          }}
        />
      </p>
      {formState.errors?.title && <p>{formState.errors.title}</p>}

      <p className="w-full flex flex-col gap-2">
        <label htmlFor="arcadeId">아케이드 부문</label>
        <FormDropdown
          id="arcadeId"
          name="arcadeId"
          value={arcadeId}
          onChange={(event) => {
            setArcadeId(event.currentTarget.value);
          }}
        >
          {renderArcadeSelectOptions}
        </FormDropdown>
      </p>
      {formState.errors?.arcadeId && <p>{formState.errors.arcadeId}</p>}

      <p className="w-full flex flex-col gap-2">
        <label htmlFor="methodId">수단</label>
        <FormDropdown
          id="methodId"
          name="methodId"
          value={methodId}
          onChange={(event) => {
            setMethodId(event.currentTarget.value);
          }}
        >
          {renderMethodSelectOptions}
        </FormDropdown>
      </p>
      {formState.errors?.methodId && <p>{formState.errors.methodId}</p>}

      <p className="w-full flex flex-col gap-2">
        <label htmlFor="achievedAt">달성일자</label>
        <input
          className="w-full px-4 py-2 border border-primary rounded text-black"
          type="date"
          id="achievedAt"
          name="achievedAt"
          value={`${achievedAt.getFullYear()}-${String(
            achievedAt.getMonth() + 1
          ).padStart(2, '0')}-${String(achievedAt.getDate()).padStart(2, '0')}`}
          onChange={(event) => {
            setAchievedAt(new Date(event.currentTarget.value));
          }}
        />
      </p>
      {formState.errors?.achievedAt && <p>{formState.errors.achievedAt}</p>}

      <p className="w-full flex flex-col gap-2">
        <label htmlFor="players">플레이어 수</label>
        <FormDropdown
          id="players"
          name="players"
          value={players}
          onChange={(event) => {
            setPlayers(parseInt(event.currentTarget.value, 10));
          }}
        >
          <option value={1}>1명</option>
          <option value={2}>2명</option>
          <option value={3}>3명</option>
          <option value={4}>4명</option>
        </FormDropdown>
      </p>
      {formState.errors?.players && <p>{formState.errors.players}</p>}

      <p className="w-full flex flex-col gap-2">
        <label htmlFor="players">작성자의 플레이 사이드</label>
        <FormDropdown
          id="playerSide"
          name="playerSide"
          value={playerSide}
          onChange={(event) => {
            setPlayerSide(parseInt(event.currentTarget.value, 10));
          }}
        >
          <option value={1}>1P</option>
          <option value={2}>2P</option>
          <option value={3}>3P</option>
          <option value={4}>4P</option>
        </FormDropdown>
      </p>
      {formState.errors?.playerSide && <p>{formState.errors.playerSide}</p>}

      <p className="w-full flex flex-col gap-2">
        <label htmlFor="evaluation">점수 / 클리어 타임</label>
        <FormInput
          type="text"
          id="evaluation"
          name="evaluation"
          value={evaluation}
          onChange={(event) => {
            setEvaluation(event.currentTarget.value);
          }}
        />
      </p>
      {formState.errors?.evaluation && <p>{formState.errors.evaluation}</p>}

      <p className="w-full flex flex-col gap-2">
        <label htmlFor="stage">최종 스테이지</label>
        <FormInput
          type="text"
          id="stage"
          name="stage"
          value={stage}
          onChange={(event) => {
            setStage(event.currentTarget.value);
          }}
        />
      </p>
      {formState.errors?.stage && <p>{formState.errors.stage}</p>}

      <p className="w-full flex flex-col gap-2">
        <label htmlFor="rank">최종 등급</label>
        <FormInput
          type="text"
          id="rank"
          name="rank"
          value={rank}
          onChange={(event) => {
            setRank(event.currentTarget.value);
          }}
        />
      </p>

      <p className="w-full flex flex-col gap-2">
        <label htmlFor="comment">코멘터리</label>
        <FormInput
          type="text"
          id="comment"
          name="comment"
          value={comment}
          onChange={(event) => {
            setComment(event.currentTarget.value);
          }}
        />
      </p>
      {formState.errors?.comment && <p>{formState.errors.comment}</p>}

      <p className="w-full flex flex-col gap-2">
        <label>태그 (콤마로 구분)</label>
        <FormInput
          type="text"
          id="tags"
          name="tags"
          value={tags}
          onChange={(event) => {
            setTags(event.currentTarget.value);
          }}
        />
      </p>

      <p className="w-full flex flex-col gap-2">
        <label htmlFor="note">비고</label>
        <FormInput
          type="text"
          id="note"
          name="note"
          value={note}
          onChange={(event) => {
            setNote(event.currentTarget.value);
          }}
        />
      </p>

      <p className="w-full flex flex-col gap-2">
        <label htmlFor="youTubeId">YouTube 영상 ID</label>
        <FormInput
          type="text"
          id="youTubeId"
          name="youTubeId"
          value={youTubeId}
          onChange={(event) => {
            setYouTubeId(event.currentTarget.value);
          }}
        />
      </p>

      {post?.thumbnailUrl && (
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="presentThumbnailUrl">등록된 썸네일</label>
          <div className="w-40 h-40 border border-primary rounded relative flex justify-center items-center overflow-hidden">
            <Image src={post.thumbnailUrl} alt="기존 썸네일 이미지" fill />
          </div>
          <input
            id="presentThumbnailUrl"
            name="presentThumbnailUrl"
            type="hidden"
            value={post.thumbnailUrl}
            readOnly
          />
        </div>
      )}

      <div className="w-full flex flex-col gap-2">
        <label htmlFor="thumbnail">새로운 썸네일</label>
        <SingleImagePicker name="thumbnail" />
      </div>
      {formState.errors?.thumbnailUrl && <p>{formState.errors.thumbnailUrl}</p>}

      {post && (
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="presentImageUrls">등록된 원본 이미지</label>
          <div className="w-full min-h-40 border border-primary rounded flex justify-center items-center flex-wrap gap-4">
            {presentImageUrls.length > 0
              ? presentImageUrls.map((imageUrl, index) => (
                  <div key={imageUrl} className="flex flex-row gap-2">
                    <div className="w-40 h-40 relative">
                      <Image src={imageUrl} alt="유저 선택 이미지" fill />
                    </div>
                    <button
                      type="button"
                      onClick={handleOnClickDeletePresentImageUrl(index)}
                    >
                      X
                    </button>
                  </div>
                ))
              : '이미지 없음'}
          </div>
          <input
            id="presentImageUrls"
            name="presentImageUrls"
            type="hidden"
            value={JSON.stringify(presentImageUrls)}
            readOnly
          />
        </div>
      )}

      <div className="w-full flex flex-col gap-2">
        <label htmlFor="thumbnail">추가할 원본 이미지 (여러 개 첨부)</label>
        <MultipleImagePicker name="originalImages" />
      </div>
      {formState.errors?.imageUrls && <p>{formState.errors.imageUrls}</p>}

      {Object.keys(formState.errors ?? {}).length > 0 && (
        <p>완료되지 않은 입력이 있습니다. 확인하여 주십시오.</p>
      )}

      <button
        type="submit"
        className="w-full p-4 bg-primary hover:bg-hovering text-white rounded"
      >
        {post ? '수정하기' : '등록하기'}
      </button>
    </form>
  );
}
