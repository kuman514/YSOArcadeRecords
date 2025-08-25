import Image from 'next/image';
import Link from 'next/link';

import { GalleryPost } from '^/src/entities/types/post';

interface Props {
  post: GalleryPost;
}

export default function GalleryElement({ post }: Props) {
  return (
    <Link
      href={`/gallery/${post.galleryId}`}
      className="w-1/3 aspect-square p-0.5 hover:[&_.post-thumbnail]:scale-125 [&_.post-thumbnail]:transition-all hover:[&_.post-thumbnail]:brightness-110 relative"
    >
      <div className="w-full h-full overflow-hidden relative">
        <Image
          fill
          className="w-full h-full post-thumbnail object-cover"
          src={post.thumbnailUrl}
          alt={post.title}
          unoptimized
        />
      </div>
    </Link>
  );
}
