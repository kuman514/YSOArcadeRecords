'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';

import ArrowSquareLeftSvgRepoComSvg from '^/public/icons/arrow-square-left-svgrepo-com.svg';
import ArrowSquareRightSvgRepoComSvg from '^/public/icons/arrow-square-right-svgrepo-com.svg';
import { GalleryPost } from '^/src/entities/types/post';
import ImageZoomController from '^/src/shared/image-zoom-controller';
import { CopyLinkButton } from '^/src/shared/share/copy-link';
import { ShareToTwitterButton } from '^/src/shared/share/share-to-twitter';

import { ShareToBlueskyButton } from '^/src/shared/share/share-to-bluesky';
import DeleteGalleryForm from './delete-form';

interface Props {
  galleryPost: GalleryPost;
  isAuthenticated: boolean;
}

export default function GalleryPostViewer({
  galleryPost,
  isAuthenticated,
}: Props) {
  const [isShowGadget, setIsShowGadget] = useState<boolean>(true);
  const [imageAreaKey, setImageAreaKey] = useState<number>(
    new Date().getTime()
  );
  const [currentImageShowIndex, setCurrentImageShowIndex] = useState<number>(0);

  const imageUrls = useMemo(
    () =>
      (galleryPost.imageUrl ? [galleryPost.imageUrl] : []).concat(
        galleryPost.imageUrls ?? []
      ),
    [galleryPost.imageUrl, galleryPost.imageUrls]
  );

  const goToPrev = useCallback(() => {
    setCurrentImageShowIndex(
      (currentImageShowIndex + imageUrls.length - 1) % imageUrls.length
    );
    setImageAreaKey(new Date().getTime());
  }, [currentImageShowIndex, imageUrls]);

  const goToNext = useCallback(() => {
    setCurrentImageShowIndex((currentImageShowIndex + 1) % imageUrls.length);
    setImageAreaKey(new Date().getTime());
  }, [currentImageShowIndex, imageUrls]);

  useEffect(() => {
    function handleOnKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case 'ArrowLeft':
          goToPrev();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    }

    document.addEventListener('keydown', handleOnKeyDown);

    return () => {
      document.removeEventListener('keydown', handleOnKeyDown);
    };
  }, [goToPrev, goToNext]);

  const renderPageController =
    imageUrls.length > 1 ? (
      <div className="absolute left-0 top-0 w-full h-full flex flex-row justify-between items-center pointer-events-none">
        <button
          type="button"
          className="w-20 h-20 pointer-events-auto text-white drop-shadow-lg cursor-pointer"
          onClick={goToPrev}
        >
          <ArrowSquareLeftSvgRepoComSvg width="100%" height="100%" />
        </button>
        <button
          type="button"
          className="w-20 h-20 pointer-events-auto text-white drop-shadow-lg cursor-pointer"
          onClick={goToNext}
        >
          <ArrowSquareRightSvgRepoComSvg width="100%" height="100%" />
        </button>
      </div>
    ) : null;

  const renderModifyButton = isAuthenticated ? (
    <div className="w-full flex flex-row justify-end gap-2 pointer-events-auto">
      <Link
        className="px-4 py-2 bg-primary hover:bg-hovering text-white cursor-pointer retro-rounded-2-darkonly"
        href={`/gallery/${galleryPost.galleryId}/modify`}
      >
        수정하기
      </Link>
      <DeleteGalleryForm galleryId={galleryPost.galleryId} />
    </div>
  ) : null;

  const renderCurrentPage = (
    <div className="text-white px-4 py-2 bg-[rgba(32,32,32,0.6)] retro-rounded-2-darkonly">
      {currentImageShowIndex + 1} / {imageUrls.length}
    </div>
  );

  const renderGadgets = isShowGadget ? (
    <>
      <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-between items-center pointer-events-none py-6">
        <div className="text-white px-4 py-2 bg-[rgba(32,32,32,0.6)] mt-12 sm:mt-0 retro-rounded-2-darkonly">
          주제: {galleryPost.theme.galleryThemeTitle}
        </div>
        <div className="w-full flex px-4 flex-col gap-2 justify-center items-center">
          <div className="text-white px-4 py-2 bg-[rgba(32,32,32,0.6)] retro-rounded-2-darkonly">
            {galleryPost.title}
          </div>
          {renderCurrentPage}
          {renderModifyButton}
        </div>
      </div>
      <div className="fixed flex flex-row gap-2 right-0 top-0 p-2 m-2">
        <ShareToTwitterButton
          postTitle={galleryPost.title}
          additionalClassName="fill-white stroke-white border-white"
        />
        <ShareToBlueskyButton
          postTitle={galleryPost.title}
          additionalClassName="fill-white stroke-white border-white"
        />
        <CopyLinkButton additionalClassName="fill-white stroke-white border-white" />
      </div>
      {renderPageController}
    </>
  ) : null;

  return (
    <>
      <ImageZoomController
        key={imageAreaKey}
        imageUrl={imageUrls[currentImageShowIndex]}
        alt={galleryPost.title}
        onClickImageArea={() => {
          setIsShowGadget(!isShowGadget);
        }}
      />
      {renderGadgets}
    </>
  );
}
