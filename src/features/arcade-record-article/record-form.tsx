'use client';

import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { v7 as uuidv7 } from 'uuid';

import MultipleImagePicker from '^/src/entities/image-picker/multiple';
import SingleImagePicker from '^/src/entities/image-picker/single';
import { ImageListElementValue } from '^/src/entities/image-picker/types';
import { ArcadeInfo } from '^/src/entities/types/arcade-info';
import { Method } from '^/src/entities/types/method';
import { ArcadeRecordPost } from '^/src/entities/types/post';
import { useLoadingBlockModal } from '^/src/shared/modal/loading-block';
import {
  FailedRouteHandlerCallResponse,
  RouteHandlerCallResponse,
  RouteHandlerCallResponseStatus,
} from '^/src/shared/route-handler-call/types';
import FormDropdown from '^/src/shared/ui/form-dropdown';
import FormInput from '^/src/shared/ui/form-input';
import FormTextArea from '^/src/shared/ui/form-textarea';
import { parseEvaluation } from '^/src/shared/util/parse-evaluation';
import { EvaluationCriterion } from '^/src/shared/util/types';
import Button from '^/src/shared/ui/button';

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
  const route = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useLoadingBlockModal(isLoading);

  const arcadeRecordId = useRef<string>(
    post?.arcadeRecordId ?? uuidv7()
  ).current;

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
  const [tags, setTags] = useState<string>(post?.tags.join(',') ?? '');
  const [note, setNote] = useState<string>(post?.note ?? '');
  const [youTubeId, setYouTubeId] = useState<string>(post?.youTubeId ?? '');

  const [images, setImages] = useState<ImageListElementValue[]>(
    post?.imageUrls.map((imageUrl, index) => ({
      tmpId: `${new Date().getTime()}-${index}`,
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
    !isLoading &&
    !isSuccess;

  useEffect(() => {
    if (isSuccess) {
      toast(post ? '기록이 수정되었습니다.' : '기록이 등록되었습니다.', {
        type: 'success',
      });
      route.replace(`/records/${arcadeId}/${arcadeRecordId}`);
    }
  }, [post, isSuccess, arcadeId, route, arcadeRecordId]);

  useEffect(() => {
    if (errorMessage) {
      toast(errorMessage, {
        type: 'error',
      });
    }
  }, [errorMessage]);

  async function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage(null);

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
              setErrorMessage(
                '신규 썸네일이 업로드되지 못하였습니다. 다시 시도해 주십시오.'
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
              setErrorMessage(newErrorMessage);
            } else {
              setErrorMessage(
                '신규 썸네일 업로드 중 문제가 발생했습니다. 다시 시도해 주십시오.'
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
            setErrorMessage(
              '신규 원본 이미지가 업로드되지 못하였습니다. 다시 시도해 주십시오.'
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
            setErrorMessage(newErrorMessage);
          } else {
            setErrorMessage(
              '신규 원본 이미지 업로드 중 문제가 발생했습니다. 다시 시도해 주십시오.'
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
    recordFormData.append('tags', tags);

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
          setIsSuccess(true);
          break;
        case RouteHandlerCallResponseStatus.FAILED:
          setErrorMessage(response.data.error);
          break;
        default:
          break;
      }
    } catch (error) {
      if (axios.isAxiosError<FailedRouteHandlerCallResponse>(error)) {
        const newErrorMessage =
          error.response?.data.error ??
          '예기치 못한 문제가 발생하였습니다. 다시 시도해 주십시오.';
        setErrorMessage(newErrorMessage);
      } else {
        setErrorMessage(
          '예기치 못한 문제가 발생하였습니다. 다시 시도해 주십시오.'
        );
      }
    }

    setIsLoading(false);
    return false;
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
      className="w-full flex flex-row flex-wrap justify-between items-start gap-y-8"
      onSubmit={handleOnSubmit}
    >
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

      <p className="w-12/25 flex flex-col gap-2">
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
        {!isArcadeIdVerified && <span>아케이드 부문을 선택해주세요.</span>}
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

      <p className="w-full flex flex-col gap-2">
        <label htmlFor="achievedAt">달성일자</label>
        <FormInput
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

      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex flex-row flex-wrap justify-between items-start gap-y-8">
          <p className="w-12/25 flex flex-col gap-2">
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
          <p className="w-12/25 flex flex-col gap-2">
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

      <p className="w-12/25 flex flex-col gap-2">
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
        {!isStageVerified && (
          <span>어느 스테이지까지 도달하였는지 입력해주세요.</span>
        )}
      </p>

      <p className="w-12/25 flex flex-col gap-2">
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
        <div className="w-12/25 flex flex-col gap-2">
          <label htmlFor="presentThumbnailUrl">등록된 썸네일</label>
          <div className="w-40 h-40 retro-rounded-2 relative flex justify-center items-center overflow-hidden">
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

      <div className="w-full flex flex-col gap-2">
        <label htmlFor="originalImages">원본 이미지</label>
        <MultipleImagePicker
          name="originalImages"
          images={images}
          onChangeImages={setImages}
        />
        {!isOriginalImagesVerified && <span>원본 이미지를 첨부해주세요.</span>}
      </div>

      <Button type="submit" disabled={!isSubmittable}>
        {post ? '수정하기' : '등록하기'}
      </Button>
    </form>
  );
}
