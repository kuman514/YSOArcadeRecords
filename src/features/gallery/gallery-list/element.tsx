import Image from 'next/image';

import Link from 'next/link';

// interface Props {
//   post: GalleryPost;
// }

export default function GalleryListElement(/* { post }: Props */) {
  // return (
  //   <li className="w-1/3 aspect-square p-0.5 overflow-hidden hover:[&_.post-thumbnail]:scale-125 [&_.post-thumbnail]:transition-all hover:[&_.post-thumbnail]:brightness-110">
  //     <Link href={`/gallery/${post.galleryId}`} className="w-full h-full">
  //       <Image
  //         className="w-full h-full post-thumbnail object-cover"
  //         src={post.thumbnailUrl}
  //         alt={post.title}
  //         unoptimized
  //       />
  //     </Link>
  //   </li>
  // );

  return (
    <Link
      href="/gallery"
      className="w-1/3 aspect-square p-0.5 hover:[&_.post-thumbnail]:scale-125 [&_.post-thumbnail]:transition-all hover:[&_.post-thumbnail]:brightness-110 relative"
    >
      <div className="w-full h-full overflow-hidden relative">
        <Image
          fill
          className="w-full h-full post-thumbnail object-cover"
          src="https://pbs.twimg.com/profile_banners/2580505316/1587998528"
          alt="애기코이시"
          unoptimized
        />
      </div>
    </Link>
  );
}
