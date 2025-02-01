'use client';

import { useMemo, useState } from 'react';

import { arcadeDictionary } from '^/src/entities/dictionary/arcade';
import { methodDictionary } from '^/src/entities/dictionary/method';
import { tagDictionary } from '^/src/entities/dictionary/tag';
import { ArcadeRecordPost } from '^/src/entities/types/post';
import MultipleImagePicker from '^/src/shared/image-picker/multiple';
import SingleImagePicker from '^/src/shared/image-picker/single';
import FormDropdown from '^/src/shared/ui/form-dropdown';
import FormInput from '^/src/shared/ui/form-input';

interface Props {
  post?: ArcadeRecordPost;
}

export default function RecordForm({ post }: Props) {
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
  const [comment, setComment] = useState<string>(post?.comment ?? '');
  const [note, setNote] = useState<string>(post?.note ?? '');
  const [youTubeId, setYouTubeId] = useState<string>(post?.youTubeId ?? '');

  // const [tagIds, setTagIds] = useState<string[]>(
  //   post?.tags.map((tag) => tag.tagId) ?? []
  // );

  // const [thumbnailUrl, setThumbnailUrl] = useState<string>(
  //   post?.thumbnailUrl ?? ''
  // );

  // const [imageUrls, setImageUrls] = useState<string[]>(post?.imageUrls ?? []);

  const isSubmittable =
    title.length > 0 &&
    arcadeDictionary[arcadeId] !== undefined &&
    methodDictionary[methodId] !== undefined &&
    evaluation.length > 0 &&
    stage.length > 0 &&
    comment.length > 0;

  const renderArcadeSelectOptions = useMemo(
    () =>
      Object.entries(arcadeDictionary).map(
        ([selectableArcadeId, arcadeLabel]) => (
          <option
            key={`arcade-selection-${selectableArcadeId}`}
            value={selectableArcadeId}
          >
            {arcadeLabel}
          </option>
        )
      ),
    []
  );

  const renderMethodSelectOptions = useMemo(
    () =>
      Object.entries(methodDictionary).map(
        ([selectableMethodId, methodLabel]) => (
          <option
            key={`method-selection-${selectableMethodId}`}
            value={selectableMethodId}
          >
            {methodLabel}
          </option>
        )
      ),
    []
  );

  const renderTagSelectOptions = Object.entries(tagDictionary).map(
    ([selectableTagId, tagLabel]) => (
      <span
        key={`tag-selection-${selectableTagId}`}
        className="flex flex-row gap-2"
      >
        <input
          type="checkbox"
          id={`tag-selection-${selectableTagId}`}
          name="tagIds"
          value={selectableTagId}
        />
        <label htmlFor={`tag-selection-${selectableTagId}`}>{tagLabel}</label>
      </span>
    )
  );

  return (
    <form className="w-full flex flex-col justify-center items-start gap-8 px-16">
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

      <p className="w-full flex flex-col gap-2">
        <label htmlFor="comment">태그</label>
        {renderTagSelectOptions}
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

      <div className="w-full flex flex-col gap-2">
        <label htmlFor="thumbnail">썸네일</label>
        <SingleImagePicker name="thumbnail" />
      </div>

      <div className="w-full flex flex-col gap-2">
        <label htmlFor="thumbnail">원본 이미지 (여러 개 첨부)</label>
        <MultipleImagePicker name="originalImages" />
      </div>

      <button
        type="submit"
        className="w-full p-4 bg-primary hover:bg-hovering text-white rounded"
        disabled={!isSubmittable}
      >
        {post ? '수정하기' : '등록하기'}
      </button>
    </form>
  );
}
