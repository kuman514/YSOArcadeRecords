'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

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
import { issueUuid } from '^/src/shared/route-handler-call/issue-uuid';
import { GalleryFormPages } from '^/src/features/gallery/types';

interface Props {
  post?: GalleryPost;
  galleryThemeList: GalleryTheme[];
}

/**
 * @todo
 * - 가장 첫번째로 썸네일용 이미지를 입력한다.
 * - 썸네일이 입력된 후 커다랗게 썸네일을 보여주며, 아래와 같은 순서로 입력한다.
 *   - 어떤 주제에 관한 갤러리인지
 *   - 이 갤러리 포스트의 제목은 무엇인지
 * - 원본 이미지들을 입력한 뒤 제출 가능
 */

export default function GalleryForm({ post, galleryThemeList }: Props) {
  const route = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<GalleryFormPages>(
    GalleryFormPages.PAGE_THUMBNAIL
  );

  useLoadingBlockModal(isLoading);

  const [title, setTitle] = useState<string>(post?.title ?? '');
  const [galleryThemeId, setGalleryThemeId] = useState<string>(
    post?.theme.galleryThemeId ?? ''
  );

  const [localThumbnail, setLocalThumbnail] = useState<File | null>(null);
  const [images, setImages] = useState<ImageListElementValue[]>(
    (post?.imageUrl
      ? [{ tmpId: '0-legacy-single', sourceUrl: post.imageUrl }]
      : []
    ).concat(
      post?.imageUrls.map((imageUrl, index) => ({
        tmpId: `0-${index}`,
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
    !isLoading;

  async function handleOnSubmit() {
    setIsLoading(true);

    const galleryId = post?.galleryId ?? (await issueUuid());

    if (!galleryId) {
      setIsLoading(false);
      return false;
    }

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
          toast(
            post
              ? '갤러리 사진이 수정되었습니다.'
              : '갤러리 사진이 등록되었습니다.',
            {
              type: 'success',
            }
          );
          route.replace(`/gallery/${galleryId}`);
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

  const renderPickedThumbnail = (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor="thumbnail">{localThumbnail ? '새로운 ' : ''}썸네일</label>
      <SingleImagePicker
        name="thumbnail"
        remoteImageUrl={!localThumbnail ? post?.thumbnailUrl : undefined}
        currentFile={localThumbnail}
        onSelectFile={setLocalThumbnail}
      />
      {!isThumbnailVerified && <span>썸네일을 등록해주세요.</span>}
    </div>
  );

  const renderTheme =
    currentPage === GalleryFormPages.PAGE_THEME ? (
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
    ) : null;

  const renderTitle =
    currentPage === GalleryFormPages.PAGE_TITLE ? (
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
    ) : null;

  const renderOriginalImages =
    currentPage === GalleryFormPages.PAGE_ORIGINAL_IMAGES ? (
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
        disabled={currentPage === GalleryFormPages.PAGE_THUMBNAIL}
        onClick={() => {
          setCurrentPage((state) => state - 1);
        }}
      >
        이전
      </Button>
      <Button
        type="button"
        disabled={(() => {
          switch (currentPage) {
            case GalleryFormPages.PAGE_THUMBNAIL:
              return !isThumbnailVerified;
            case GalleryFormPages.PAGE_THEME:
              return !isGalleryThemeIdVerified;
            case GalleryFormPages.PAGE_TITLE:
              return !isTitleVerified;
            case GalleryFormPages.PAGE_ORIGINAL_IMAGES:
              return !isOriginalImagesVerified || !isSubmittable;
          }
        })()}
        onClick={() => {
          if (currentPage !== GalleryFormPages.PAGE_ORIGINAL_IMAGES) {
            setCurrentPage((state) => state + 1);
            return;
          }
          handleOnSubmit();
        }}
      >
        {currentPage === GalleryFormPages.PAGE_ORIGINAL_IMAGES
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
      onSubmit={(event) => {
        event.preventDefault();
        return false;
      }}
    >
      {renderPickedThumbnail}

      {renderTheme}
      {renderTitle}
      {renderOriginalImages}

      {renderMovePageButton}
    </form>
  );
}
