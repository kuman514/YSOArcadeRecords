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
import { GalleryTheme } from '^/src/entities/types/gallery-theme';
import { GalleryPost } from '^/src/entities/types/post';
import { useLoadingBlockModal } from '^/src/shared/modal/loading-block';
import {
  FailedRouteHandlerCallResponse,
  RouteHandlerCallResponse,
  RouteHandlerCallResponseStatus,
} from '^/src/shared/route-handler-call/types';
import Button from '^/src/shared/ui/button';
import FormDropdown from '^/src/shared/ui/form-dropdown';
import FormTextArea from '^/src/shared/ui/form-textarea';

interface Props {
  post?: GalleryPost;
  galleryThemeList: GalleryTheme[];
}

export default function GalleryForm({ post, galleryThemeList }: Props) {
  const route = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useLoadingBlockModal(isLoading);

  const galleryId = useRef<string>(post?.galleryId ?? uuidv7()).current;

  const [title, setTitle] = useState<string>(post?.title ?? '');
  const [galleryThemeId, setGalleryThemeId] = useState<string>(
    post?.theme.galleryThemeId ?? ''
  );

  const [localThumbnail, setLocalThumbnail] = useState<File | null>(null);
  const [images, setImages] = useState<ImageListElementValue[]>(
    (post?.imageUrl
      ? [{ tmpId: `${new Date().getTime()}-0`, sourceUrl: post.imageUrl }]
      : []
    ).concat(
      post?.imageUrls.map((imageUrl, index) => ({
        tmpId: `${new Date().getTime()}-${index}`,
        sourceUrl: imageUrl,
      })) ?? []
    )
  );

  const isTitleVerified = title.length > 0;
  const isThumbnailVerified = !!post?.thumbnailUrl || !!localThumbnail;
  const isOriginalImagesVerified = images.length > 0;
  const isGalleryThemeIdVerified = galleryThemeId.length > 0;

  const isSubmittable =
    isTitleVerified &&
    isGalleryThemeIdVerified &&
    isThumbnailVerified &&
    isOriginalImagesVerified &&
    !isLoading &&
    !isSuccess;

  useEffect(() => {
    if (isSuccess) {
      toast(
        post
          ? '갤러리 사진이 수정되었습니다.'
          : '갤러리 사진이 등록되었습니다.',
        {
          type: 'success',
        }
      );
      route.replace(`/gallery/${galleryId}`);
    }
  }, [post, isSuccess, galleryId, route]);

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

    const path = `gallery/${galleryId}`;
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

    const galleryFormData = new FormData();
    galleryFormData.append('galleryId', galleryId);
    galleryFormData.append('title', title);
    galleryFormData.append('galleryThemeId', galleryThemeId);

    if (post?.thumbnailUrl) {
      galleryFormData.append('presentThumbnailUrl', post.thumbnailUrl);
    }
    galleryFormData.append('thumbnailUrl', thumbnailUrl);

    filteredOriginalImages.forEach((imageUrl) => {
      galleryFormData.append('originalImageUrls', imageUrl);
    });

    try {
      const response = post
        ? await axios.put<RouteHandlerCallResponse<object>>(
            `/api/gallery/${galleryId}`,
            galleryFormData
          )
        : await axios.post<RouteHandlerCallResponse<object>>(
            '/api/gallery',
            galleryFormData
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

  const renderGalleryThemeOptions = useMemo(
    () =>
      [{ galleryThemeId: '', galleryThemeTitle: '선택하세요' }]
        .concat(galleryThemeList)
        .map(({ galleryThemeId, galleryThemeTitle }) => (
          <option
            key={`gallery-theme-selection-${galleryThemeId}`}
            value={galleryThemeId}
          >
            {galleryThemeTitle}
          </option>
        )),
    [galleryThemeList]
  );

  return (
    <form
      className="w-full flex flex-row flex-wrap justify-between items-start gap-y-8"
      onSubmit={handleOnSubmit}
    >
      <p className="w-full flex flex-col gap-2">
        <label htmlFor="title">사진 제목</label>
        <FormTextArea
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

      <p className="w-full flex flex-col gap-2">
        <label htmlFor="galleryThemeId">주제</label>
        <FormDropdown
          id="galleryThemeId"
          name="galleryThemeId"
          value={galleryThemeId}
          onChange={(event) => {
            setGalleryThemeId(event.currentTarget.value);
          }}
        >
          {renderGalleryThemeOptions}
        </FormDropdown>
        {!isGalleryThemeIdVerified && <span>주제를 선택해주세요.</span>}
      </p>

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
