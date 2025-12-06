import { GALLERY_PHOTOS_PER_PAGE } from '^/src/entities/constants/pagenation';
import { GalleryPost } from '^/src/entities/types/post';

import GalleryElement from './element';
import ExtendedGallery from './extended';

interface Props {
  galleryPosts: GalleryPost[];
}

export default function GalleryPostList({ galleryPosts }: Props) {
  return (
    <section className="w-full h-full flex flex-row flex-wrap items-start">
      {galleryPosts.map((galleryPost) => (
        <GalleryElement key={galleryPost.galleryId} post={galleryPost} />
      ))}
      <ExtendedGallery
        isEnabled={galleryPosts.length === GALLERY_PHOTOS_PER_PAGE}
      />
    </section>
  );
}
