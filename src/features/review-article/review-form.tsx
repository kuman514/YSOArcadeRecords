'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ReviewPost } from '^/src/entities/types/post';
import MultipleImagePicker from '^/src/shared/image-picker/multiple';
import SingleImagePicker from '^/src/shared/image-picker/single';
import {
  FailedRouteHandlerCallResponse,
  RouteHandlerCallResponse,
  RouteHandlerCallResponseStatus,
} from '^/src/shared/route-handler-call/types';
import FormInput from '^/src/shared/ui/form-input';
import { MultipleFormValue } from '^/src/shared/ui/types';
import axios from 'axios';

interface Props {
  post?: ReviewPost;
}

export default function ReviewForm({ post }: Props) {
  const route = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const reviewId = useRef<string>(post?.reviewId ?? uuidv4()).current;

  const [title, setTitle] = useState<string>(post?.title ?? '');
  const [tags, setTags] = useState<string>(post?.tags.join(',') ?? '');
  const [subjectName, setSubjectName] = useState<string>(
    post?.subjectName ?? ''
  );
  const [subjectType, setSubjectType] = useState<string>(
    post?.subjectType ?? ''
  );
  const [createdBy, setCreatedBy] = useState<string>(post?.createdBy ?? '');
  const [releaseDate, setReleaseDate] = useState<Date>(
    post?.releaseDate ?? new Date()
  );

  const [keyFeatures, setKeyFeatures] = useState<MultipleFormValue<string>>(
    post?.keyFeatures.map((keyFeature, index) => ({
      id: index,
      value: keyFeature,
    })) ?? []
  );
  const [expectations, setExpectations] = useState<MultipleFormValue<string>>(
    post?.expectations.map((expectation, index) => ({
      id: index,
      value: expectation,
    })) ?? []
  );
  const [firstImpressions, setFirstImpressions] = useState<
    MultipleFormValue<string>
  >(
    post?.firstImpressions.map((firstImpression, index) => ({
      id: index,
      value: firstImpression,
    })) ?? []
  );
  const [positives, setPositives] = useState<MultipleFormValue<string>>(
    post?.positives.map((positive, index) => ({
      id: index,
      value: positive,
    })) ?? []
  );
  const [negatives, setNegatives] = useState<MultipleFormValue<string>>(
    post?.negatives.map((negative, index) => ({
      id: index,
      value: negative,
    })) ?? []
  );
  const [conclusions, setConclusions] = useState<MultipleFormValue<string>>(
    post?.conclusions.map((conclusion, index) => ({
      id: index,
      value: conclusion,
    })) ?? []
  );

  const [reviewScore, setReviewScore] = useState<number>(
    post?.reviewScore ?? 0
  );

  const [youTubeId, setYouTubeId] = useState<string>(post?.youTubeId ?? '');

  const [presentImageUrls, setPresentImageUrls] = useState<string[]>(
    post?.imageUrls ?? []
  );

  const [localThumbnail, setLocalThumbnail] = useState<File | null>(null);
  const [localOriginalImages, setLocalOriginalImages] = useState<File[]>([]);

  const isTitleVerified = title.length > 0;
  const isSubjectNameVerified = subjectName.length > 0;
  const isSubjectTypeVerified = subjectType.length > 0;
  const isCreatedByVerified = createdBy.length > 0;
  const isKeyFeaturesVerified = keyFeatures.length > 0;
  const isExpectationsVerified = expectations.length > 0;
  const isFirstImpressionsVerified = firstImpressions.length > 0;
  const isPositivesVerified = positives.length > 0;
  const isNegativesVerified = negatives.length > 0;
  const isConclusionsVerified = conclusions.length > 0;
  const isReviewScoreVerified = reviewScore > 0 && reviewScore <= 5;

  const isThumbnailVerified = !!post?.thumbnailUrl || !!localThumbnail;
  const isOriginalImagesVerified =
    presentImageUrls.length > 0 || localOriginalImages.length > 0;

  const isSubmittable =
    isTitleVerified &&
    isSubjectNameVerified &&
    isSubjectTypeVerified &&
    isCreatedByVerified &&
    isKeyFeaturesVerified &&
    isExpectationsVerified &&
    isFirstImpressionsVerified &&
    isPositivesVerified &&
    isNegativesVerified &&
    isConclusionsVerified &&
    isReviewScoreVerified &&
    isThumbnailVerified &&
    isOriginalImagesVerified &&
    !isLoading &&
    !isSuccess;

  useEffect(() => {
    if (isSuccess) {
      route.replace(`/reviews/${reviewId}`);
    }
  }, [isSuccess, reviewId, route]);

  function handleOnClickDeletePresentImageUrl(index: number) {
    return () => {
      const newPresentImageUrls = Array.from(presentImageUrls);
      newPresentImageUrls.splice(index, 1);
      setPresentImageUrls(newPresentImageUrls);
    };
  }

  async function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage(null);

    const path = `reviews/${reviewId}`;
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
      localOriginalImages.map(async (file, index) => {
        const imageFormData = new FormData();
        imageFormData.append('image', file);
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

    const reviewFormData = new FormData();
    reviewFormData.append('reviewId', reviewId);
    reviewFormData.append('title', title);
    reviewFormData.append('subjectName', subjectName);
    reviewFormData.append('subjectType', subjectType);
    reviewFormData.append('createdBy', createdBy);
    reviewFormData.append('releaseDate', releaseDate.toISOString());
    keyFeatures.forEach((keyFeature) => {
      reviewFormData.append('keyFeatures', keyFeature.value);
    });
    expectations.forEach((expectation) => {
      reviewFormData.append('expectations', expectation.value);
    });
    firstImpressions.forEach((firstImpression) => {
      reviewFormData.append('firstImpressions', firstImpression.value);
    });
    positives.forEach((positive) => {
      reviewFormData.append('positives', positive.value);
    });
    negatives.forEach((negative) => {
      reviewFormData.append('negatives', negative.value);
    });
    conclusions.forEach((conclusion) => {
      reviewFormData.append('conclusions', conclusion.value);
    });
    reviewFormData.append('reviewScore', String(reviewScore));
    reviewFormData.append('youTubeId', youTubeId);
    reviewFormData.append('tags', tags);

    if (post?.thumbnailUrl) {
      reviewFormData.append('presentThumbnailUrl', post.thumbnailUrl);
    }
    reviewFormData.append('thumbnailUrl', thumbnailUrl);

    presentImageUrls.forEach((imageUrl) => {
      reviewFormData.append('presentImageUrls', imageUrl);
    });
    filteredOriginalImages.forEach((imageUrl) => {
      reviewFormData.append('originalImageUrls', imageUrl);
    });

    try {
      const response = post
        ? await axios.put<RouteHandlerCallResponse<object>>(
            `/api/reviews/${reviewId}`,
            reviewFormData
          )
        : await axios.post<RouteHandlerCallResponse<object>>(
            '/api/reviews',
            reviewFormData
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

  return (
    <form
      className="w-full flex flex-col justify-center items-start gap-8"
      onSubmit={handleOnSubmit}
    >
      <p className="w-full flex flex-col gap-2">
        <label htmlFor="title">포스트 제목</label>
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
        <label htmlFor="subjectName">리뷰 대상</label>
        <FormInput
          type="text"
          id="subjectName"
          name="subjectName"
          value={subjectName}
          onChange={(event) => {
            setSubjectName(event.currentTarget.value);
          }}
        />
      </p>
      {!isSubjectNameVerified && <p>리뷰 대상을 입력해주세요.</p>}

      <p className="w-full flex flex-col gap-2">
        <label htmlFor="subjectType">리뷰 대상의 종류</label>
        <FormInput
          type="text"
          id="subjectType"
          name="subjectType"
          value={subjectType}
          onChange={(event) => {
            setSubjectType(event.currentTarget.value);
          }}
        />
      </p>
      {!isSubjectTypeVerified && <p>리뷰 대상의 종류를 입력해주세요.</p>}

      <p className="w-full flex flex-col gap-2">
        <label htmlFor="createdBy">제작사</label>
        <FormInput
          type="text"
          id="createdBy"
          name="createdBy"
          value={createdBy}
          onChange={(event) => {
            setCreatedBy(event.currentTarget.value);
          }}
        />
      </p>
      {!isCreatedByVerified && <p>제작사를 입력해주세요.</p>}

      <p className="w-full flex flex-col gap-2">
        <label htmlFor="releaseDate">출시일자</label>
        <input
          className="w-full px-4 py-2 border border-primary rounded text-black"
          type="date"
          id="releaseDate"
          name="releaseDate"
          value={`${releaseDate.getFullYear()}-${String(
            releaseDate.getMonth() + 1
          ).padStart(2, '0')}-${String(releaseDate.getDate()).padStart(
            2,
            '0'
          )}`}
          onChange={(event) => {
            setReleaseDate(new Date(event.currentTarget.value));
          }}
        />
      </p>

      <div className="w-full flex flex-col gap-2">
        <label htmlFor="releaseDate">총점</label>
        <div className="w-full flex flex-row gap-2 justify-center items-center">
          {[1, 2, 3, 4, 5].map((score) => (
            <button
              type="button"
              key={score}
              onClick={() => {
                setReviewScore(score);
              }}
              className={score === reviewScore ? 'text-hovering' : ''}
            >
              {score}점
            </button>
          ))}
        </div>
      </div>
      {!isReviewScoreVerified && <p>총점을 입력해주세요.</p>}

      <p className="w-full flex flex-col gap-2">
        <label htmlFor="keyFeatures">특징</label>
        {keyFeatures.map((keyFeature, index) => (
          <FormInput
            key={keyFeature.id}
            type="text"
            id="keyFeatures"
            name="keyFeatures"
            value={keyFeature.value}
            onChange={(event) => {
              const newKeyFeatures = keyFeatures.with(index, {
                id: keyFeature.id,
                value: event.currentTarget.value,
              });
              setKeyFeatures(newKeyFeatures);
            }}
          />
        ))}
        <button
          type="button"
          className="w-full p-4 bg-primary hover:bg-hovering text-white rounded disabled:bg-gray-300"
          onClick={() => {
            setKeyFeatures(
              keyFeatures.concat([
                {
                  id: (keyFeatures[keyFeatures.length - 1]?.id ?? 0) + 1,
                  value: '',
                },
              ])
            );
          }}
        >
          새 특징
        </button>
      </p>

      <p className="w-full flex flex-col gap-2">
        <label htmlFor="expectations">기대사항</label>
        {expectations.map((expectation, index) => (
          <FormInput
            key={expectation.id}
            type="text"
            id="expectations"
            name="expectations"
            value={expectation.value}
            onChange={(event) => {
              const newExpectations = expectations.with(index, {
                id: expectation.id,
                value: event.currentTarget.value,
              });
              setExpectations(newExpectations);
            }}
          />
        ))}
        <button
          type="button"
          className="w-full p-4 bg-primary hover:bg-hovering text-white rounded disabled:bg-gray-300"
          onClick={() => {
            setExpectations(
              expectations.concat([
                {
                  id: (expectations[expectations.length - 1]?.id ?? 0) + 1,
                  value: '',
                },
              ])
            );
          }}
        >
          새 기대사항
        </button>
      </p>

      <p className="w-full flex flex-col gap-2">
        <label htmlFor="firstImpressions">첫인상</label>
        {firstImpressions.map((firstImpression, index) => (
          <FormInput
            key={firstImpression.id}
            type="text"
            id="firstImpressions"
            name="firstImpressions"
            value={firstImpression.value}
            onChange={(event) => {
              const newFirstImpressions = firstImpressions.with(index, {
                id: firstImpression.id,
                value: event.currentTarget.value,
              });
              setFirstImpressions(newFirstImpressions);
            }}
          />
        ))}
        <button
          type="button"
          className="w-full p-4 bg-primary hover:bg-hovering text-white rounded disabled:bg-gray-300"
          onClick={() => {
            setFirstImpressions(
              firstImpressions.concat([
                {
                  id:
                    (firstImpressions[firstImpressions.length - 1]?.id ?? 0) +
                    1,
                  value: '',
                },
              ])
            );
          }}
        >
          새 첫인상
        </button>
      </p>

      <p className="w-full flex flex-col gap-2">
        <label htmlFor="positives">장점</label>
        {positives.map((positive, index) => (
          <FormInput
            key={positive.id}
            type="text"
            id="positives"
            name="positives"
            value={positive.value}
            onChange={(event) => {
              const newPositives = positives.with(index, {
                id: positive.id,
                value: event.currentTarget.value,
              });
              setPositives(newPositives);
            }}
          />
        ))}
        <button
          type="button"
          className="w-full p-4 bg-primary hover:bg-hovering text-white rounded disabled:bg-gray-300"
          onClick={() => {
            setPositives(
              positives.concat([
                {
                  id: (positives[positives.length - 1]?.id ?? 0) + 1,
                  value: '',
                },
              ])
            );
          }}
        >
          새 장점
        </button>
      </p>

      <p className="w-full flex flex-col gap-2">
        <label htmlFor="negatives">단점</label>
        {negatives.map((negative, index) => (
          <FormInput
            key={negative.id}
            type="text"
            id="negatives"
            name="negatives"
            value={negative.value}
            onChange={(event) => {
              const newNegatives = negatives.with(index, {
                id: negative.id,
                value: event.currentTarget.value,
              });
              setNegatives(newNegatives);
            }}
          />
        ))}
        <button
          type="button"
          className="w-full p-4 bg-primary hover:bg-hovering text-white rounded disabled:bg-gray-300"
          onClick={() => {
            setNegatives(
              negatives.concat([
                {
                  id: (negatives[negatives.length - 1]?.id ?? 0) + 1,
                  value: '',
                },
              ])
            );
          }}
        >
          새 단점
        </button>
      </p>

      <p className="w-full flex flex-col gap-2">
        <label htmlFor="conclusions">결론</label>
        {conclusions.map((conclusion, index) => (
          <FormInput
            key={conclusion.id}
            type="text"
            id="conclusion"
            name="conclusion"
            value={conclusion.value}
            onChange={(event) => {
              const newConclusions = conclusions.with(index, {
                id: conclusion.id,
                value: event.currentTarget.value,
              });
              setConclusions(newConclusions);
            }}
          />
        ))}
        <button
          type="button"
          className="w-full p-4 bg-primary hover:bg-hovering text-white rounded disabled:bg-gray-300"
          onClick={() => {
            setConclusions(
              conclusions.concat([
                {
                  id: (conclusions[conclusions.length - 1]?.id ?? 0) + 1,
                  value: '',
                },
              ])
            );
          }}
        >
          새 결론
        </button>
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
            {presentImageUrls.length > 0
              ? presentImageUrls.map((imageUrl, index) => (
                  <div key={imageUrl} className="flex flex-row gap-2">
                    <div className="w-40 h-40 relative">
                      <Image
                        src={imageUrl}
                        alt="유저 선택 이미지"
                        fill
                        sizes="10rem"
                      />
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
        <MultipleImagePicker
          name="originalImages"
          currentFiles={localOriginalImages}
          onSelectFiles={setLocalOriginalImages}
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
