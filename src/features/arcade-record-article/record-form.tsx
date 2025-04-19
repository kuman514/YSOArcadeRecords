'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ArcadeInfo } from '^/src/entities/types/arcade-info';
import { Method } from '^/src/entities/types/method';
import { ArcadeRecordPost } from '^/src/entities/types/post';
import MultipleImagePicker from '^/src/shared/image-picker/multiple';
import SingleImagePicker from '^/src/shared/image-picker/single';
import {
  FailedRouteHandlerCallResponse,
  RouteHandlerCallResponse,
  RouteHandlerCallResponseStatus,
} from '^/src/shared/route-handler-call/types';
import FormDropdown from '^/src/shared/ui/form-dropdown';
import FormInput from '^/src/shared/ui/form-input';
import { parseEvaluation } from '^/src/shared/util/parse-evaluation';
import axios from 'axios';
import { ImageListElementValue } from '^/src/shared/image-picker/types';
import ImageList from '^/src/shared/image-picker/image-list';

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

  const arcadeRecordId = useRef<string>(
    post?.arcadeRecordId ?? uuidv4()
  ).current;

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

  const [presentImageUrls, setPresentImageUrls] = useState<
    ImageListElementValue[]
  >(
    post?.imageUrls.map((imageUrl, index) => ({
      tmpId: `${new Date().getTime()}-${index}`,
      sourceUrl: imageUrl,
    })) ?? []
  );

  const [localThumbnail, setLocalThumbnail] = useState<File | null>(null);
  const [localOriginalImages, setLocalOriginalImages] = useState<
    ImageListElementValue[]
  >([]);

  const isTitleVerified = title.length > 0;
  const isArcadeIdVerified = arcadeId.length > 0;
  const isMethodIdVerified = methodId.length > 0;
  const isEvaluationVerified = (() => {
    try {
      parseEvaluation(evaluation);
      return true;
    } catch {
      return false;
    }
  })();
  const isStageVerified = stage.length > 0;
  const isCommentVerified = comment.length > 0;
  const isThumbnailVerified = !!post?.thumbnailUrl || !!localThumbnail;
  const isOriginalImagesVerified =
    presentImageUrls.length > 0 || localOriginalImages.length > 0;

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
      route.replace(`/records/${arcadeId}/${arcadeRecordId}`);
    }
  }, [isSuccess, arcadeId, route, arcadeRecordId]);

  async function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage(null);

    const path = `${arcadeId}/${arcadeRecordId}`;
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
      return false;
    }

    const originalImageUrls = await Promise.all<string | null>(
      localOriginalImages.map(async ({ localFile }, index) => {
        if (!localFile) {
          return null;
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
      return false;
    }

    const recordFormData = new FormData();
    recordFormData.append('arcadeRecordId', arcadeRecordId);
    recordFormData.append('title', title);
    recordFormData.append('arcadeId', arcadeId);
    recordFormData.append('methodId', methodId);
    recordFormData.append('achievedAt', achievedAt.toISOString());
    recordFormData.append('players', String(players));
    recordFormData.append('playerSide', String(playerSide));
    recordFormData.append('evaluation', evaluation);
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

    presentImageUrls.forEach(({ sourceUrl }) => {
      recordFormData.append('presentImageUrls', sourceUrl!);
    });
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
      className="w-full flex flex-col justify-center items-start gap-8"
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
      </p>
      {!isTitleVerified && <p>제목을 입력해주세요.</p>}

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
      {!isArcadeIdVerified && <p>아케이드 부문을 선택해주세요.</p>}

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
      {!isMethodIdVerified && <p>플레이 수단을 선택해주세요.</p>}

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
      {!isEvaluationVerified && (
        <p>
          점수(1234567 등등의 정수) 또는 클리어 타임(hh:mm:ss.ss 등등의 시간)의
          형식에 맞게 입력해주세요.
        </p>
      )}

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
      {!isStageVerified && <p>어느 스테이지까지 도달하였는지 입력해주세요.</p>}

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
      {!isCommentVerified && <p>코멘터리를 입력해주세요.</p>}

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
            <Image
              src={post.thumbnailUrl}
              alt="기존 썸네일 이미지"
              fill
              sizes="10rem"
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

      <div className="w-full flex flex-col gap-2">
        <label htmlFor="thumbnail">새로운 썸네일</label>
        <SingleImagePicker
          name="thumbnail"
          currentFile={localThumbnail}
          onSelectFile={setLocalThumbnail}
        />
      </div>
      {!isThumbnailVerified && <p>썸네일을 등록해주세요.</p>}

      {post && (
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="presentImageUrls">등록된 원본 이미지</label>
          <div className="w-full min-h-40 border border-primary rounded flex justify-center items-center flex-wrap gap-4">
            {presentImageUrls.length > 0 ? (
              <ImageList
                images={presentImageUrls}
                onChangeImages={setPresentImageUrls}
              />
            ) : (
              '이미지 없음'
            )}
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
        <MultipleImagePicker
          name="originalImages"
          images={localOriginalImages}
          onChangeImages={setLocalOriginalImages}
        />
      </div>
      {!isOriginalImagesVerified && <p>원본 이미지를 첨부해주세요.</p>}

      {errorMessage && <p>{errorMessage}</p>}
      <button
        type="submit"
        className="w-full p-4 bg-primary hover:bg-hovering text-white rounded disabled:bg-gray-300"
        disabled={!isSubmittable}
      >
        {post ? '수정하기' : '등록하기'}
      </button>
    </form>
  );
}
