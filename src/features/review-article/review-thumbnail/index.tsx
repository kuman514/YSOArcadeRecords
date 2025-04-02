import Image from 'next/image';

import ReviewThumbnailInteractivity from './interactivity';

interface Props {
  thumbnailUrl: string;
  originalImageUrls: string[];
}

export default function ReviewThumbnail({
  thumbnailUrl,
  originalImageUrls,
}: Props) {
  return (
    <figure className="flex flex-col justify-center items-center gap-2">
      <div className="relative w-full h-80 bg-black">
        <Image
          src={thumbnailUrl}
          alt="리뷰 썸네일"
          className="object-contain"
          fill
          sizes="20rem"
        />
        <ReviewThumbnailInteractivity originalImageUrls={originalImageUrls} />
      </div>
      <figcaption className="text-xs">
        [ 썸네일을 클릭하여 이미지 보기 ]
      </figcaption>
    </figure>
  );
}
