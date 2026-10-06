'use client';

import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import MultipleImagePicker from '^/src/entities/image-picker/multiple';
import SingleImagePicker from '^/src/entities/image-picker/single';
import { ImageListElementValue } from '^/src/entities/image-picker/types';
import { ArcadeInfo } from '^/src/entities/types/arcade-info';
import { Method } from '^/src/entities/types/method';
import { ArcadeRecordPost } from '^/src/entities/types/post';
import { ArcadeRecordFormPages } from '^/src/features/arcade-record-article/types';
import { useLoadingBlockModal } from '^/src/shared/modal/loading-block';
import { issueUuid } from '^/src/shared/route-handler-call/issue-uuid';
import {
  FailedRouteHandlerCallResponse,
  RouteHandlerCallResponse,
  RouteHandlerCallResponseStatus,
} from '^/src/shared/route-handler-call/types';
import Button from '^/src/shared/ui/button';
import FormDropdown from '^/src/shared/ui/form-dropdown';
import FormInput from '^/src/shared/ui/form-input';
import FormTextArea from '^/src/shared/ui/form-textarea';
import { parseEvaluation } from '^/src/shared/util/parse-evaluation';
import { EvaluationCriterion } from '^/src/shared/util/types';

interface Props {
  post?: ArcadeRecordPost;
  arcadeInfoList: ArcadeInfo[];
  methodList: Method[];
}

/**
 * @todo
 * - 가장 첫번째로 썸네일용 이미지를 입력한다.
 * - 썸네일이 입력된 후 커다랗게 썸네일을 보여주며, 아래와 같은 순서로 입력한다.
 *   - 이 기록의 제목은 무엇인지
 *   - 이 게임이 어떤지 (어떤 부문을 플레이했는지)
 *   - <둘 중 적어도 하나는 필수> 점수나 클리어 시간 (또는 둘 다)
 *   - 종착한 스테이지
 *   - 달성일자와 플레이 수단
 *   - 코멘터리
 *   - <스킵 가능> 랭크
 *   - <스킵 가능> 비고와 태그
 *   - <스킵 가능> 유튜브 영상 ID
 * - 원본 이미지들을 입력한 뒤 제출 가능
 */

export default function RecordForm({
  post,
  arcadeInfoList,
  methodList,
}: Props) {
  const route = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<ArcadeRecordFormPages>(
    ArcadeRecordFormPages.PAGE_THUMBNAIL
  );

  useLoadingBlockModal(isLoading);

  const [title, setTitle] = useState<string>(post?.title ?? '');
  const [arcadeId, setArcadeId] = useState<string>(post?.arcade.arcadeId ?? '');
  const [methodId, setMethodId] = useState<string>(post?.method.methodId ?? '');
  const [achievedAt, setAchievedAt] = useState<Date>(
    post?.achievedAt ?? new Date()
  );
  const [score, setScore] = useState<string>(
    post?.score ??
      (() => {
        try {
          const result = parseEvaluation(post?.evaluation ?? '');
          if (result.evaluationCriterion === EvaluationCriterion.SCORE) {
            return post?.evaluation;
          } else {
            return '';
          }
        } catch {
          return '';
        }
      })() ??
      ''
  );
  const [elapsedTime, setElapsedTime] = useState<string>(
    post?.elapsedTime ??
      (() => {
        try {
          const result = parseEvaluation(post?.evaluation ?? '');
          if (result.evaluationCriterion === EvaluationCriterion.TIME) {
            return result.value;
          } else {
            return '';
          }
        } catch {
          return '';
        }
      })() ??
      ''
  );
  const [stage, setStage] = useState<string>(post?.stage ?? '');
  const [rank, setRank] = useState<string>(post?.rank ?? '');
  const [comment, setComment] = useState<string>(post?.comment ?? '');
  const [tags, setTags] = useState<string[]>(post?.tags ?? []);
  const [note, setNote] = useState<string>(post?.note ?? '');
  const [youTubeId, setYouTubeId] = useState<string>(post?.youTubeId ?? '');

  const [images, setImages] = useState<ImageListElementValue[]>(
    post?.imageUrls.map((imageUrl, index) => ({
      tmpId: `0-${index}`,
      sourceUrl: imageUrl,
    })) ?? []
  );
  const [localThumbnail, setLocalThumbnail] = useState<File | null>(null);

  const isTitleVerified = title.length > 0;
  const isArcadeIdVerified = arcadeId.length > 0;
  const isMethodIdVerified = methodId.length > 0;
  const isScoreVerified = (() => {
    try {
      const result = parseEvaluation(score);
      return result.evaluationCriterion === EvaluationCriterion.SCORE;
    } catch {
      return false;
    }
  })();
  const isElapsedTimeVerified = (() => {
    if (elapsedTime.length === 0) {
      return true;
    }
    try {
      const result = parseEvaluation(elapsedTime);
      return result.evaluationCriterion === EvaluationCriterion.TIME;
    } catch {
      return false;
    }
  })();
  const isEvaluationInputted = score.length > 0 || elapsedTime.length > 0;
  const isEvaluationVerified =
    isEvaluationInputted && isScoreVerified && isElapsedTimeVerified;
  const isStageVerified = stage.length > 0;
  const isCommentVerified = comment.length > 0;
  const isThumbnailVerified = !!post?.thumbnailUrl || !!localThumbnail;
  const isOriginalImagesVerified = images.length > 0;

  const isSubmittable =
    isTitleVerified &&
    isArcadeIdVerified &&
    isMethodIdVerified &&
    isEvaluationVerified &&
    isStageVerified &&
    isCommentVerified &&
    isThumbnailVerified &&
    isOriginalImagesVerified &&
    !isLoading;

  async function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);

    const arcadeRecordId = post?.arcadeRecordId ?? (await issueUuid());

    if (!arcadeRecordId) {
      setIsLoading(false);
      return false;
    }

    const path = `records/${arcadeRecordId}`;
    const timestamp = new Date().toISOString();

    const thumbnailUrl = localThumbnail
      ? await (async () => {
          const thumbnailFormData = new FormData();
          thumbnailFormData.append('image', localThumbnail);
          thumbnailFormData.append('size', '480');
          thumbnailFormData.append('path', path);
          thumbnailFormData.append('fileName', `thumbnail-${timestamp}`);

          try {
            const response = await axios.post<
              RouteHandlerCallResponse<{ imageUrl: string }>
            >('/api/upload-image', thumbnailFormData);
            if (
              response.data.result === RouteHandlerCallResponseStatus.FAILED
            ) {
              toast(
                '신규 썸네일이 업로드되지 못하였습니다. 다시 시도해 주십시오.',
                {
                  type: 'error',
                }
              );
              setIsLoading(false);
              return null;
            }
            return response.data.imageUrl;
          } catch (error) {
            if (axios.isAxiosError(error)) {
              const newErrorMessage =
                error.response?.data.error ??
                '신규 썸네일 업로드 중 문제가 발생했습니다. 다시 시도해 주십시오.';
              toast(newErrorMessage, {
                type: 'error',
              });
            } else {
              toast(
                '신규 썸네일 업로드 중 문제가 발생했습니다. 다시 시도해 주십시오.',
                {
                  type: 'error',
                }
              );
            }
            setIsLoading(false);
            return null;
          }
        })()
      : post?.thumbnailUrl;

    if (!thumbnailUrl) {
      toast('썸네일 업로드에 실패했습니다.', {
        type: 'error',
      });
      return false;
    }

    const originalImageUrls = await Promise.all<string | null>(
      images.map(async ({ sourceUrl, localFile }, index) => {
        if (!localFile) {
          return sourceUrl ?? null;
        }

        const imageFormData = new FormData();
        imageFormData.append('image', localFile);
        imageFormData.append('size', '1024');
        imageFormData.append('path', path);
        imageFormData.append('fileName', `original-${timestamp}-${index + 1}`);

        try {
          const response = await axios.post<
            RouteHandlerCallResponse<{ imageUrl: string }>
          >('/api/upload-image', imageFormData);
          if (response.data.result === RouteHandlerCallResponseStatus.FAILED) {
            toast(
              '신규 원본 이미지가 업로드되지 못하였습니다. 다시 시도해 주십시오.',
              {
                type: 'error',
              }
            );
            setIsLoading(false);
            return null;
          }
          return response.data.imageUrl;
        } catch (error) {
          if (axios.isAxiosError<FailedRouteHandlerCallResponse>(error)) {
            const newErrorMessage =
              error.response?.data.error ??
              '신규 원본 이미지 업로드 중 문제가 발생했습니다. 다시 시도해 주십시오.';
            toast(newErrorMessage, {
              type: 'error',
            });
          } else {
            toast(
              '신규 원본 이미지 업로드 중 문제가 발생했습니다. 다시 시도해 주십시오.',
              {
                type: 'error',
              }
            );
          }
          setIsLoading(false);
          return null;
        }
      })
    );

    const filteredOriginalImages = originalImageUrls.filter(
      (imageUrl) => imageUrl !== null
    );
    if (filteredOriginalImages.length !== originalImageUrls.length) {
      toast('원본 이미지 업로드에 실패했습니다.', {
        type: 'error',
      });
      return false;
    }

    const recordFormData = new FormData();
    recordFormData.append('arcadeRecordId', arcadeRecordId);
    recordFormData.append('title', title);
    recordFormData.append('arcadeId', arcadeId);
    recordFormData.append('methodId', methodId);
    recordFormData.append('achievedAt', achievedAt.toISOString());
    recordFormData.append('score', score);
    recordFormData.append('elapsedTime', elapsedTime);
    recordFormData.append('stage', stage);
    recordFormData.append('rank', rank);
    recordFormData.append('comment', comment);
    recordFormData.append('note', note);
    recordFormData.append('youTubeId', youTubeId);
    tags.forEach((tag) => recordFormData.append('tags', tag));

    if (post?.thumbnailUrl) {
      recordFormData.append('presentThumbnailUrl', post.thumbnailUrl);
    }
    recordFormData.append('thumbnailUrl', thumbnailUrl);

    filteredOriginalImages.forEach((imageUrl) => {
      recordFormData.append('originalImageUrls', imageUrl);
    });

    try {
      const response = post
        ? await axios.put<RouteHandlerCallResponse<object>>(
            `/api/records/${arcadeRecordId}`,
            recordFormData
          )
        : await axios.post<RouteHandlerCallResponse<object>>(
            '/api/records',
            recordFormData
          );

      switch (response.data.result) {
        case RouteHandlerCallResponseStatus.SUCCESS:
          toast(post ? '기록이 수정되었습니다.' : '기록이 등록되었습니다.', {
            type: 'success',
          });
          route.replace(`/records/${arcadeRecordId}`);
          break;
        case RouteHandlerCallResponseStatus.FAILED:
          toast(response.data.error, {
            type: 'error',
          });
          break;
        default:
          break;
      }
    } catch (error) {
      if (axios.isAxiosError<FailedRouteHandlerCallResponse>(error)) {
        const newErrorMessage =
          error.response?.data.error ??
          '예기치 못한 문제가 발생하였습니다. 다시 시도해 주십시오.';
        toast(newErrorMessage, {
          type: 'error',
        });
      } else {
        toast('예기치 못한 문제가 발생하였습니다. 다시 시도해 주십시오.', {
          type: 'error',
        });
      }
    }

    setIsLoading(false);
    return false;
  }

  const renderTitle =
    currentPage === ArcadeRecordFormPages.PAGE_TITLE ? (
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
        {!isTitleVerified && <span>제목을 입력해주세요.</span>}
      </p>
    ) : null;

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

  const renderStageSelectOptions = useMemo(
    () =>
      ['']
        .concat(
          arcadeInfoList.find((arcadeInfo) => arcadeInfo.arcadeId === arcadeId)
            ?.availableStages ?? []
        )
        .map((availableStage) => (
          <option
            key={`stage-selection-${availableStage}`}
            value={availableStage}
          >
            {availableStage === '' ? '선택하세요' : availableStage}
          </option>
        )),
    [arcadeInfoList, arcadeId]
  );

  const renderRankSelectOptions = useMemo(
    () =>
      ['']
        .concat(
          arcadeInfoList.find((arcadeInfo) => arcadeInfo.arcadeId === arcadeId)
            ?.availableRanks ?? []
        )
        .map((availableRank) => (
          <option key={`rank-selection-${availableRank}`} value={availableRank}>
            {availableRank === '' ? '선택하세요' : availableRank}
          </option>
        )),
    [arcadeInfoList, arcadeId]
  );

  const renderPickedThumbnail = (() => {
    if (currentPage === ArcadeRecordFormPages.PAGE_THUMBNAIL) {
      return (
        <>
          {post?.thumbnailUrl && (
            <div className="w-12/25 flex flex-col gap-2">
              <label htmlFor="presentThumbnailUrl">등록된 썸네일</label>
              <div className="w-40 h-40 retro-rounded relative flex justify-center items-center overflow-hidden">
                <Image
                  src={post.thumbnailUrl}
                  alt="기존 썸네일 이미지"
                  fill
                  sizes="10rem"
                  unoptimized
                />
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

          <div className="w-12/25 flex flex-col gap-2">
            <label htmlFor="thumbnail">새로운 썸네일</label>
            <SingleImagePicker
              name="thumbnail"
              currentFile={localThumbnail}
              onSelectFile={setLocalThumbnail}
            />
            {!isThumbnailVerified && <span>썸네일을 등록해주세요.</span>}
          </div>
        </>
      );
    }

    if (localThumbnail) {
      return (
        <div className="w-12/25 flex flex-col gap-2">
          <label htmlFor="thumbnail">새로운 썸네일</label>
          <SingleImagePicker
            name="thumbnail"
            currentFile={localThumbnail}
            onSelectFile={setLocalThumbnail}
          />
          {!isThumbnailVerified && <span>썸네일을 등록해주세요.</span>}
        </div>
      );
    }

    return post?.thumbnailUrl ? (
      <div className="w-12/25 flex flex-col gap-2">
        <label htmlFor="presentThumbnailUrl">등록된 썸네일</label>
        <div className="w-40 h-40 retro-rounded relative flex justify-center items-center overflow-hidden">
          <Image
            src={post.thumbnailUrl}
            alt="기존 썸네일 이미지"
            fill
            sizes="10rem"
            unoptimized
          />
        </div>
        <input
          id="presentThumbnailUrl"
          name="presentThumbnailUrl"
          type="hidden"
          value={post.thumbnailUrl}
          readOnly
        />
      </div>
    ) : null;
  })();

  const renderArcadeSelection =
    currentPage === ArcadeRecordFormPages.PAGE_ARCADE ? (
      <p className="w-full flex flex-col gap-2">
        <label htmlFor="arcadeId">아케이드 부문</label>
        <FormDropdown
          id="arcadeId"
          name="arcadeId"
          value={arcadeId}
          onChange={(event) => {
            setStage('');
            setRank('');
            setTags([]);
            setArcadeId(event.currentTarget.value);
          }}
        >
          {renderArcadeSelectOptions}
        </FormDropdown>
        {!isArcadeIdVerified && <span>아케이드 부문을 선택해주세요.</span>}
      </p>
    ) : null;

  const renderScoreAndTime =
    currentPage === ArcadeRecordFormPages.PAGE_SCORE_TIME ? (
      <div className="w-full flex flex-col gap-8">
        <div className="w-full flex flex-col justify-start items-center gap-y-8">
          <p className="w-full flex flex-col gap-2">
            <label htmlFor="score">점수</label>
            <FormInput
              type="text"
              id="score"
              name="score"
              value={score}
              onChange={(event) => {
                setScore(event.currentTarget.value);
              }}
            />
          </p>
          <p className="w-full flex flex-col gap-2">
            <label htmlFor="elapsedTime">클리어 타임</label>
            <FormInput
              type="text"
              id="elapsedTime"
              name="elapsedTime"
              value={elapsedTime}
              onChange={(event) => {
                setElapsedTime(event.currentTarget.value);
              }}
            />
          </p>
        </div>
        {!isEvaluationVerified && (
          <p>
            점수(1234567 등등의 정수) 또는 클리어 타임(hh:mm:ss.ss 등등의
            시간)을 형식에 맞게 입력해주세요.
          </p>
        )}
      </div>
    ) : null;

  const renderStageSelection =
    currentPage === ArcadeRecordFormPages.PAGE_STAGE ? (
      <p className="w-full flex flex-col gap-2">
        <label htmlFor="stage">최종 스테이지</label>
        <FormDropdown
          id="stage"
          name="stage"
          value={stage}
          onChange={(event) => {
            setStage(event.currentTarget.value);
          }}
        >
          {renderStageSelectOptions}
        </FormDropdown>
        {!isStageVerified && (
          <span>어느 스테이지까지 도달하였는지 입력해주세요.</span>
        )}
      </p>
    ) : null;

  const renderAchievedAtAndMethodSelection =
    currentPage === ArcadeRecordFormPages.PAGE_ACHIEVED_AT_METHOD ? (
      <div className="w-full flex flex-col justify-start items-center gap-y-8">
        <p className="w-full flex flex-col gap-2">
          <label htmlFor="achievedAt">달성일자</label>
          <FormInput
            type="date"
            id="achievedAt"
            name="achievedAt"
            value={`${achievedAt.getFullYear()}-${String(
              achievedAt.getMonth() + 1
            ).padStart(
              2,
              '0'
            )}-${String(achievedAt.getDate()).padStart(2, '0')}`}
            onChange={(event) => {
              setAchievedAt(new Date(event.currentTarget.value));
            }}
          />
        </p>
        <p className="w-12/25 flex flex-col gap-2">
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
          {!isMethodIdVerified && <span>플레이 수단을 선택해주세요.</span>}
        </p>
      </div>
    ) : null;

  const renderComment =
    currentPage === ArcadeRecordFormPages.PAGE_COMMENT ? (
      <p className="w-full flex flex-col gap-2">
        <label htmlFor="comment">코멘터리</label>
        <FormTextArea
          type="text"
          id="comment"
          name="comment"
          value={comment}
          onChange={(event) => {
            setComment(event.currentTarget.value);
          }}
        />
        {!isCommentVerified && <span>코멘터리를 입력해주세요.</span>}
      </p>
    ) : null;

  const renderRank =
    currentPage === ArcadeRecordFormPages.PAGE_RANK ? (
      <p className="w-full flex flex-col gap-2">
        <label htmlFor="rank">최종 등급 (스킵 가능)</label>
        <FormDropdown
          id="rank"
          name="rank"
          value={rank}
          onChange={(event) => {
            setRank(event.currentTarget.value);
          }}
        >
          {renderRankSelectOptions}
        </FormDropdown>
      </p>
    ) : null;

  const renderTags = (
    arcadeInfoList.find((arcadeInfo) => arcadeInfo.arcadeId === arcadeId)
      ?.availableTags ?? []
  ).map((availableTag) => (
    <span key={`tag-check-${availableTag}`} className="flex flex-row gap-2">
      <input
        name="tags"
        id={`tag-check-${availableTag}`}
        value={availableTag}
        type="checkbox"
        checked={tags.includes(availableTag)}
        onChange={(event) => {
          if (event.currentTarget.checked) {
            setTags(tags.concat([availableTag]));
            return;
          }
          const targetIndex = tags.findIndex((tag) => tag === availableTag);
          if (targetIndex === -1) {
            return;
          }
          const newTags = Array.from(tags);
          newTags.splice(targetIndex, 1);
          setTags(newTags);
        }}
      />
      <label htmlFor={`tag-check-${availableTag}`}>{availableTag}</label>
    </span>
  ));

  const renderNoteAndTags =
    currentPage === ArcadeRecordFormPages.PAGE_NOTE_TAGS ? (
      <div className="w-full flex flex-col justify-start items-center gap-y-8">
        <p className="w-full flex flex-col gap-2">
          <label htmlFor="note">비고 (스킵 가능)</label>
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

        <div className="w-full flex flex-col gap-2">
          <label>태그 (스킵 가능)</label>
          <div className="w-full flex flex-row gap-2 flex-wrap">
            {renderTags}
          </div>
        </div>
      </div>
    ) : null;

  const renderYouTubeId =
    currentPage === ArcadeRecordFormPages.PAGE_YOUTUBE_ID ? (
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
    ) : null;

  const renderOriginalImages =
    currentPage === ArcadeRecordFormPages.PAGE_ORIGINAL_IMAGES ? (
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="originalImages">원본 이미지</label>
        <MultipleImagePicker
          name="originalImages"
          images={images}
          onChangeImages={setImages}
        />
        {!isOriginalImagesVerified && <span>원본 이미지를 첨부해주세요.</span>}
      </div>
    ) : null;

  const renderMovePageButton = (
    <div className="w-full flex flex-row gap-2">
      <Button
        type="button"
        disabled={currentPage === ArcadeRecordFormPages.PAGE_THUMBNAIL}
        onClick={() => {
          setCurrentPage((state) => state - 1);
        }}
      >
        이전
      </Button>
      <Button
        type={
          currentPage === ArcadeRecordFormPages.PAGE_ORIGINAL_IMAGES
            ? 'submit'
            : 'button'
        }
        disabled={(() => {
          switch (currentPage) {
            case ArcadeRecordFormPages.PAGE_THUMBNAIL:
              return !isThumbnailVerified;
            case ArcadeRecordFormPages.PAGE_ARCADE:
              return !isArcadeIdVerified;
            case ArcadeRecordFormPages.PAGE_SCORE_TIME:
              return !isEvaluationVerified;
            case ArcadeRecordFormPages.PAGE_STAGE:
              return !isStageVerified;
            case ArcadeRecordFormPages.PAGE_ACHIEVED_AT_METHOD:
              return !isMethodIdVerified;
            case ArcadeRecordFormPages.PAGE_COMMENT:
              return !isCommentVerified;
            case ArcadeRecordFormPages.PAGE_RANK:
            case ArcadeRecordFormPages.PAGE_NOTE_TAGS:
            case ArcadeRecordFormPages.PAGE_YOUTUBE_ID:
              return false;
            case ArcadeRecordFormPages.PAGE_ORIGINAL_IMAGES:
              return !isOriginalImagesVerified;
          }
        })()}
        onClick={
          currentPage !== ArcadeRecordFormPages.PAGE_ORIGINAL_IMAGES
            ? () => {
                setCurrentPage((state) => state + 1);
              }
            : undefined
        }
      >
        {currentPage === ArcadeRecordFormPages.PAGE_ORIGINAL_IMAGES
          ? post
            ? '수정하기'
            : '등록하기'
          : '다음'}
      </Button>
    </div>
  );

  return (
    <form
      className="w-full flex flex-row flex-wrap justify-between items-start gap-y-8"
      onSubmit={handleOnSubmit}
    >
      {renderPickedThumbnail}

      {renderTitle}
      {renderArcadeSelection}
      {renderScoreAndTime}
      {renderStageSelection}
      {renderAchievedAtAndMethodSelection}
      {renderComment}
      {renderRank}
      {renderNoteAndTags}
      {renderYouTubeId}
      {renderOriginalImages}

      {renderMovePageButton}
    </form>
  );
}
