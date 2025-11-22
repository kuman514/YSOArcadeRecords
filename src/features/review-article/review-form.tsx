'use client';

import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import FilledStarSvgRepoComSvg from '^/public/icons/filled-star-svgrepo-com.svg';
import StarSvgRepoComSvg from '^/public/icons/star-svgrepo-com.svg';
import { ReviewPost } from '^/src/entities/types/post';
import MultipleImagePicker from '^/src/shared/image-picker/multiple';
import SingleImagePicker from '^/src/shared/image-picker/single';
import { ImageListElementValue } from '^/src/shared/image-picker/types';
import { useLoadingBlockModal } from '^/src/shared/modal/loading-block';
import {
  FailedRouteHandlerCallResponse,
  RouteHandlerCallResponse,
  RouteHandlerCallResponseStatus,
} from '^/src/shared/route-handler-call/types';
import FormInput from '^/src/shared/ui/form-input';
import MultipleTextFormInput from '^/src/shared/ui/multiple-text-form-input';
import { MultipleFormValue } from '^/src/shared/ui/types';

interface Props {
  post?: ReviewPost;
}

export default function ReviewForm({ post }: Props) {
  const route = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useLoadingBlockModal(isLoading);

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

  const [details, setDetails] = useState<MultipleFormValue<string>>(
    post?.details?.map((detail, index) => ({
      tmpId: `${new Date().getTime()}-${index}`,
      value: detail,
    })) ?? []
  );

  const [reviewScore, setReviewScore] = useState<number>(
    post?.reviewScore ?? 0
  );

  const [youTubeId, setYouTubeId] = useState<string>(post?.youTubeId ?? '');

  const [images, setImages] = useState<ImageListElementValue[]>(
    post?.imageUrls.map((imageUrl, index) => ({
      tmpId: `${new Date().getTime()}-${index}`,
      sourceUrl: imageUrl,
    })) ?? []
  );
  const [localThumbnail, setLocalThumbnail] = useState<File | null>(null);

  const isTitleVerified = title.length > 0;
  const isSubjectNameVerified = subjectName.length > 0;
  const isSubjectTypeVerified = subjectType.length > 0;
  const isCreatedByVerified = createdBy.length > 0;
  const isDetailsVerified = details.length > 0;

  const isReviewScoreVerified = reviewScore > 0 && reviewScore <= 5;

  const isThumbnailVerified = !!post?.thumbnailUrl || !!localThumbnail;
  const isOriginalImagesVerified = images.length > 0;

  const isSubmittable =
    isTitleVerified &&
    isSubjectNameVerified &&
    isSubjectTypeVerified &&
    isCreatedByVerified &&
    isDetailsVerified &&
    isReviewScoreVerified &&
    isThumbnailVerified &&
    isOriginalImagesVerified &&
    !isLoading &&
    !isSuccess;

  useEffect(() => {
    if (isSuccess) {
      toast(post ? '리뷰가 수정되었습니다.' : '리뷰가 등록되었습니다.', {
        type: 'success',
      });
      route.replace(`/reviews/${reviewId}`);
    }
  }, [post, isSuccess, reviewId, route]);

  useEffect(() => {
    if (errorMessage) {
      toast(errorMessage, {
        type: 'error',
      });
    }
  }, [errorMessage]);

  function handleOnInputDetails(index: number, newValue: string) {
    setDetails(
      details.with(index, {
        tmpId: details[index].tmpId,
        value: newValue,
      })
    );
  }

  function handleOnAppendDetail() {
    setDetails(
      details.concat([
        {
          tmpId: `${new Date().getTime()}-0`,
          value: '',
        },
      ])
    );
  }

  function handleOnDeleteDetail(index: number) {
    setDetails(Array.from(details).splice(index, 1));
  }

  function handleOnSwapDetails(index: number, targetIndex: number) {
    const newDetails = Array.from(details);
    const tmp = newDetails[targetIndex];
    newDetails[targetIndex] = newDetails[index];
    newDetails[index] = tmp;
    setDetails(newDetails);
  }

  /**
   * @legacy
   * These functions were designed to produce unified handlers while there is more than one types of multiple text form inputs.
   * Therefore, if the form requires more types of multiple text form inputs again, revive and apply this commentarized functions below.

    function handleOnInputMultipleTextFormInput(
      values: MultipleFormValue<string>,
      setValues: (newValues: MultipleFormValue<string>) => void
    ) {
      return (index: number, newValue: string) => {
        setValues(
          values.with(index, {
            tmpId: values[index].tmpId,
            value: newValue,
          })
        );
      };
    }

    function handleOnAppendMultipleTextFormInput(
      values: MultipleFormValue<string>,
      setValues: (newValues: MultipleFormValue<string>) => void
    ) {
      return () => {
        setValues(
          values.concat([
            {
              tmpId: `${new Date().getTime()}-0`,
              value: '',
            },
          ])
        );
      };
    }

    function handleOnDeleteMultipleTextFormInput(
      values: MultipleFormValue<string>,
      setValues: (newValues: MultipleFormValue<string>) => void
    ) {
      return (index: number) => {
        const newValues = Array.from(values);
        newValues.splice(index, 1);
        setValues(newValues);
      };
    }

    function handleOnSwapMultipleTextFormInput(
      values: MultipleFormValue<string>,
      setValues: (newValues: MultipleFormValue<string>) => void
    ) {
      return (index: number, targetIndex: number) => {
        const newValues = Array.from(values);
        const tmp = newValues[targetIndex];
        newValues[targetIndex] = newValues[index];
        newValues[index] = tmp;
        setValues(newValues);
      };
    }
  */

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

    const reviewFormData = new FormData();
    reviewFormData.append('reviewId', reviewId);
    reviewFormData.append('title', title);
    reviewFormData.append('subjectName', subjectName);
    reviewFormData.append('subjectType', subjectType);
    reviewFormData.append('createdBy', createdBy);
    reviewFormData.append('releaseDate', releaseDate.toISOString());
    details.forEach((detail) => {
      reviewFormData.append('details', detail.value);
    });
    reviewFormData.append('reviewScore', String(reviewScore));
    reviewFormData.append('youTubeId', youTubeId);
    reviewFormData.append('tags', tags);

    if (post?.thumbnailUrl) {
      reviewFormData.append('presentThumbnailUrl', post.thumbnailUrl);
    }
    reviewFormData.append('thumbnailUrl', thumbnailUrl);

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
      className="w-full flex flex-row flex-wrap justify-between items-start gap-y-8"
      onSubmit={handleOnSubmit}
    >
      <p className="w-full flex flex-col gap-2">
        <label htmlFor="title">리뷰 제목</label>
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
        {!isSubjectNameVerified && <span>리뷰 대상을 입력해주세요.</span>}
      </p>

      <p className="w-12/25 flex flex-col gap-2">
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
        {!isSubjectTypeVerified && (
          <span>리뷰 대상의 종류를 입력해주세요.</span>
        )}
      </p>

      <p className="w-12/25 flex flex-col gap-2">
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
        {!isCreatedByVerified && <span>제작사를 입력해주세요.</span>}
      </p>

      <p className="w-12/25 flex flex-col gap-2">
        <label htmlFor="releaseDate">출시일자</label>
        <input
          className="w-full px-4 py-2 border border-primary rounded-sm bg-white text-black"
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
              className="w-1/6 cursor-pointer stroke-black fill-black dark:stroke-white dark:fill-white"
            >
              {reviewScore >= score ? (
                <FilledStarSvgRepoComSvg width="100%" height="100%" />
              ) : (
                <StarSvgRepoComSvg width="100%" height="100%" />
              )}
            </button>
          ))}
        </div>
        {!isReviewScoreVerified && <span>총점을 입력해주세요.</span>}
      </div>

      <MultipleTextFormInput
        name="details"
        values={details}
        mainLabel="상세"
        appendButtonLabel="새 상세"
        onInput={handleOnInputDetails}
        onAppend={handleOnAppendDetail}
        onDelete={handleOnDeleteDetail}
        onSwap={handleOnSwapDetails}
      />

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
        <div className="w-12/25 flex flex-col gap-2">
          <label htmlFor="presentThumbnailUrl">등록된 썸네일</label>
          <div className="w-40 h-40 border border-primary rounded-sm relative flex justify-center items-center overflow-hidden">
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

      <button
        type="submit"
        className="w-full p-4 bg-primary hover:bg-hovering text-white rounded-sm disabled:bg-gray-300 cursor-pointer disabled:cursor-auto"
        disabled={!isSubmittable}
      >
        {post ? '수정하기' : '등록하기'}
      </button>
    </form>
  );
}
