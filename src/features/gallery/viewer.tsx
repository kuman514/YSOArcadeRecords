'use client';

import Link from 'next/link';
import { useState } from 'react';

import { GalleryPost } from '^/src/entities/types/post';
import ImageZoomController from '^/src/shared/image-zoom-controller';
import { CopyLinkButton } from '^/src/shared/share/copy-link';
import { ShareToTwitterButton } from '^/src/shared/share/share-to-twitter';

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

  const renderModifyButton = isAuthenticated ? (
    <div className="w-full flex flex-row justify-end gap-2 pointer-events-auto">
      <Link
        className="px-4 py-2 bg-primary hover:bg-hovering text-white rounded-sm cursor-pointer"
        href={`/gallery/${galleryPost.galleryId}/modify`}
      >
        수정하기
      </Link>
      <DeleteGalleryForm galleryId={galleryPost.galleryId} />
    </div>
  ) : null;

  const renderGadgets = isShowGadget ? (
    <>
      <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-between items-center pointer-events-none py-6">
        <div className="text-white px-4 py-2 bg-[rgba(32,32,32,0.6)] mt-12 sm:mt-0 rounded-lg">
          주제: {galleryPost.theme.galleryThemeTitle}
        </div>
        <div className="w-full flex px-4 flex-col gap-2 justify-center items-center">
          <div className="text-white px-4 py-2 bg-[rgba(32,32,32,0.6)] rounded-lg">
            {galleryPost.title}
          </div>
          {renderModifyButton}
        </div>
      </div>
      <div className="fixed flex flex-row gap-2 right-0 top-0 p-2 m-2">
        <ShareToTwitterButton
          postTitle={galleryPost.title}
          additionalClassName="fill-white stroke-white border-white"
        />
        <CopyLinkButton additionalClassName="fill-white stroke-white border-white" />
      </div>
    </>
  ) : null;

  return (
    <>
      <ImageZoomController
        imageUrl={galleryPost.imageUrl}
        alt={galleryPost.title}
        onClickImageArea={() => {
          setIsShowGadget(!isShowGadget);
        }}
      />
      {renderGadgets}
    </>
  );
}
